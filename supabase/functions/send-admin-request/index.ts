import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Initialize Supabase client with service role for rate limiting
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const AdminRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  surname: z.string().trim().min(1, "Surname is required").max(100, "Surname must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters")
});

// HTML escaping function to prevent injection
const escapeHtml = (str: string): string => {
  return str.replace(/[&<>"']/g, (match) => {
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return escapeMap[match] || match;
  });
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting: Get client IP address
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limit: max 5 requests per hour per IP
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
    const { count, error: countError } = await supabaseAdmin
      .from('admin_requests_log')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .gte('created_at', oneHourAgo);

    if (countError) {
      console.error("Rate limit check error:", countError);
    }

    if (count && count >= 5) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: "Too many requests. Please try again later.",
          retryAfter: "1 hour"
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const body = await req.json();
    
    // Validate input with Zod schema
    const validationResult = AdminRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);
      return new Response(
        JSON.stringify({ 
          error: "Invalid input", 
          details: validationResult.error.errors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, surname, email, message } = validationResult.data;

    // Escape all user input to prevent HTML/XSS injection
    const safeName = escapeHtml(name);
    const safeSurname = escapeHtml(surname);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const emailResponse = await resend.emails.send({
      from: "Testy Admin Request <onboarding@resend.dev>",
      to: ["ahmetyadgarovjust@gmail.com"],
      subject: `Admin Access Request from ${safeName} ${safeSurname}`,
      html: `
        <h2>New Admin Access Request</h2>
        <p><strong>Name:</strong> ${safeName} ${safeSurname}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
        <hr>
        <p><em>This request was sent through the Testy platform admin access form.</em></p>
      `,
    });

    console.log("Admin request email sent successfully:", emailResponse);

    // Log the request for rate limiting
    const { error: logError } = await supabaseAdmin
      .from('admin_requests_log')
      .insert({ ip_address: clientIP });

    if (logError) {
      console.error("Failed to log admin request:", logError);
      // Don't fail the request if logging fails
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-admin-request function:", error);
    
    // Handle Zod validation errors separately
    if (error.name === 'ZodError') {
      return new Response(
        JSON.stringify({ 
          error: "Validation failed", 
          details: error.errors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
