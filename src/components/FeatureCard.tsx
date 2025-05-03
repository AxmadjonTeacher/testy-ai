
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, action }) => {
  return (
    <Card className="hover-scale border border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <div className="mb-2 text-primary">{icon}</div>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-neutral-dark">{description}</CardDescription>
      </CardContent>
      {action && (
        <CardFooter className="pt-0">
          {action}
        </CardFooter>
      )}
    </Card>
  );
};

export default FeatureCard;
