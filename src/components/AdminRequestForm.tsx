
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { motion } from 'framer-motion';
import { ShieldCheck, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminRequestForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const trimmedData = {
      name: formData.name.trim(),
      surname: formData.surname.trim(),
      email: formData.email.trim(),
      message: formData.message.trim()
    };

    if (!trimmedData.name || !trimmedData.surname || !trimmedData.email || !trimmedData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    if (trimmedData.name.length > 100) {
      toast.error('Name must be less than 100 characters');
      return;
    }

    if (trimmedData.surname.length > 100) {
      toast.error('Surname must be less than 100 characters');
      return;
    }

    if (trimmedData.email.length > 255) {
      toast.error('Email must be less than 255 characters');
      return;
    }

    if (trimmedData.message.length < 10) {
      toast.error('Message must be at least 10 characters');
      return;
    }

    if (trimmedData.message.length > 2000) {
      toast.error('Message must be less than 2000 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-admin-request', {
        body: trimmedData
      });

      if (error) {
        throw error;
      }

      toast.success(t('adminRequest.form.success'));
      setFormData({ name: '', surname: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error sending admin request:', error);
      
      // Display server validation errors if available
      if (error.message && error.message.includes('Invalid input')) {
        toast.error('Please check your input and try again');
      } else {
        toast.error(t('adminRequest.form.error'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="admin-request" className="py-16 px-4 bg-neutral-light">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-neutral-dark">
                {t('adminRequest.title')}
              </CardTitle>
              <CardDescription className="text-lg text-neutral-dark/70">
                {t('adminRequest.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('adminRequest.form.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.name}
                      onChange={handleChange}
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">{t('adminRequest.form.surname')}</Label>
                    <Input
                      id="surname"
                      name="surname"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.surname}
                      onChange={handleChange}
                      maxLength={100}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('adminRequest.form.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={255}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">{t('adminRequest.form.message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Please explain why you need administrative access to the platform. Include details about your role, organization, or specific requirements."
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[120px]"
                    maxLength={2000}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.message.length}/2000 characters
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    t('adminRequest.form.submitting')
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={20} />
                      {t('adminRequest.form.submit')}
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AdminRequestForm;
