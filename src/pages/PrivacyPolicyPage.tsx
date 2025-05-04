
import React, { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type SectionId = 'data-retention' | 'contact' | 'user-rights';

const PrivacyPolicyPage = () => {
  const sectionRefs = {
    'data-retention': useRef<HTMLDivElement>(null),
    'contact': useRef<HTMLDivElement>(null),
    'user-rights': useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && sectionRefs[hash as SectionId]?.current) {
      sectionRefs[hash as SectionId].current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-accent mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Welcome to the Test Generator App (TestGen), developed to assist educators in generating 
              customized English language tests. We value your privacy and are committed to protecting 
              your personal data. This Privacy Policy explains what information we collect, how we use it, 
              and your rights regarding that information.
            </p>
            
            <hr className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">1. 🔍 Information We Collect</h2>
              <p className="mb-4">We may collect and store the following types of information:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>User Information: Name, email address, role (e.g., teacher/admin).</li>
                <li>Test Data: Uploaded test materials, topics, answer sheets, and AI-generated tests.</li>
                <li>Usage Data: Interactions with the app (e.g., tests created, saved, exported).</li>
              </ul>
              <p>We do not collect sensitive personal information such as location, payment info, or government-issued IDs.</p>
            </section>
            
            <hr className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">2. 🛠️ How We Use Your Information</h2>
              <p className="mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Allow you to create, save, and manage tests.</li>
                <li>Personalize your experience in the app.</li>
                <li>Improve our platform and add new features.</li>
                <li>Provide support and respond to inquiries.</li>
              </ul>
            </section>
            
            <hr className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">3. 🔐 Data Storage and Security</h2>
              <p className="mb-4">
                Your data is stored securely using industry-standard practices. 
                We use Supabase (or similar secure backend services) to manage database storage and authentication.
              </p>
              <p>
                We take reasonable measures to protect your information from unauthorized access, alteration, 
                disclosure, or destruction.
              </p>
            </section>
            
            <hr className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">4. 🤝 Sharing of Information</h2>
              <p>
                We do not sell, rent, or share your personal data with third parties. 
                Your test content and personal information are only accessible to you 
                (and approved collaborators if enabled).
              </p>
            </section>
            
            <hr className="my-8" />
            
            <section className="mb-8" ref={sectionRefs['data-retention']}>
              <h2 className="text-2xl font-semibold text-accent mb-4" id="data-retention">5. 🧼 Data Retention</h2>
              <p className="mb-4">
                We retain your data as long as your account is active. 
                You can request data deletion by contacting us directly at:
              </p>
              <p className="mb-2">📧 <a href="mailto:ahmetyadgarovjust@gmail.com" className="text-primary hover:underline">ahmetyadgarovjust@gmail.com</a></p>
              <p>📱 Telegram: <a href="https://t.me/ahmet_just" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://t.me/ahmet_just</a></p>
            </section>
            
            <hr className="my-8" />
            
            <section className="mb-8" ref={sectionRefs['user-rights']}>
              <h2 className="text-2xl font-semibold text-accent mb-4" id="user-rights">6. 🔄 Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access the data we store about you.</li>
                <li>Request corrections or deletion.</li>
                <li>Withdraw consent at any time (where applicable).</li>
              </ul>
              <p>To exercise any of these rights, please contact us.</p>
            </section>
            
            <hr className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">7. 📍 Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The most current version will 
                always be available at the bottom of our website. We encourage you to review it periodically.
              </p>
            </section>
            
            <hr className="my-8" />
            
            <section className="mb-8" ref={sectionRefs['contact']}>
              <h2 className="text-2xl font-semibold text-accent mb-4" id="contact">8. 📬 Contact</h2>
              <p className="mb-4">If you have any questions or concerns, feel free to reach out:</p>
              <p className="mb-2">Developer: Axmadjon Yodgorov</p>
              <p className="mb-2">Email: <a href="mailto:ahmetyadgarovjust@gmail.com" className="text-primary hover:underline">ahmetyadgarovjust@gmail.com</a></p>
              <p>Telegram: <a href="https://t.me/ahmet_just" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://t.me/ahmet_just</a></p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
