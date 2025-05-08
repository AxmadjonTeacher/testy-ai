
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-neutral-dark mb-4">
            You don't have permission to access this page. This area is restricted to administrators only.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccessDenied;
