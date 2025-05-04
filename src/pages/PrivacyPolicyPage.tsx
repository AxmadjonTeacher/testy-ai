
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicyPage = () => {
  const location = useLocation();
  const hash = location.hash;
  
  const dataRetentionRef = useRef<HTMLDivElement>(null);
  const userRightsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to section based on hash in URL
    if (hash === '#data-retention' && dataRetentionRef.current) {
      dataRetentionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === '#user-rights' && userRightsRef.current) {
      userRightsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === '#contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-primary mb-8">Privacy Policy</h1>
          
          <p className="mb-6">
            Welcome to the Test Generator App (TestGen), developed to assist educators in generating customized English language tests. 
            We value your privacy and are committed to protecting your personal data. This Privacy Policy explains what information we collect, 
            how we use it, and your rights regarding that information.
          </p>
          
          <div className="border-b border-gray-200 mb-6"></div>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. 🔍 Information We Collect</h2>
            <p className="mb-4">We may collect and store the following types of information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>User Information: Name, email address, role (e.g., teacher/admin).</li>
              <li>Test Data: Uploaded test materials, topics, answer sheets, and AI-generated tests.</li>
              <li>Usage Data: Interactions with the app (e.g., tests created, saved, exported).</li>
            </ul>
            <p>We do not collect sensitive personal information such as location, payment info, or government-issued IDs.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. 🛠️ How We Use Your Information</h2>
            <p className="mb-4">We use the collected information to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Allow you to create, save, and manage tests.</li>
              <li>Personalize your experience in the app.</li>
              <li>Improve our platform and add new features.</li>
              <li>Provide support and respond to inquiries.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. 🔐 Data Storage and Security</h2>
            <p className="mb-4">
              Your data is stored securely using industry-standard practices. 
              We use Supabase (or similar secure backend services) to manage database storage and authentication.
            </p>
            <p>
              We take reasonable measures to protect your information from unauthorized access, alteration, 
              disclosure, or destruction.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. 🤝 Sharing of Information</h2>
            <p>
              We do not sell, rent, or share your personal data with third parties. 
              Your test content and personal information are only accessible to you 
              (and approved collaborators if enabled).
            </p>
          </section>
          
          <section ref={dataRetentionRef} className="mb-8 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">5. 🧼 Data Retention</h2>
            <p className="mb-4">
              We retain your data as long as your account is active. 
              You can request data deletion by contacting us directly at:
            </p>
            <p className="mb-2">📧 <a href="mailto:ahmetyadgarovjust@gmail.com" className="text-primary hover:underline">ahmetyadgarovjust@gmail.com</a></p>
            <p>📱 Telegram: <a href="https://t.me/ahmet_just" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://t.me/ahmet_just</a></p>
          </section>
          
          <section ref={userRightsRef} className="mb-8 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">6. 🔄 Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Access the data we store about you.</li>
              <li>Request corrections or deletion.</li>
              <li>Withdraw consent at any time (where applicable).</li>
            </ul>
            <p>To exercise any of these rights, please contact us.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. 📍 Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. 
              The most current version will always be available at the bottom of our website. 
              We encourage you to review it periodically.
            </p>
          </section>
          
          <section ref={contactRef} className="mb-8 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">8. 📬 Contact</h2>
            <p className="mb-4">If you have any questions or concerns, feel free to reach out:</p>
            <p className="mb-2">Developer: Axmadjon Yodgorov</p>
            <p className="mb-2">Email: <a href="mailto:ahmetyadgarovjust@gmail.com" className="text-primary hover:underline">ahmetyadgarovjust@gmail.com</a></p>
            <p>Telegram: <a href="https://t.me/ahmet_just" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://t.me/ahmet_just</a></p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
