import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg">
          <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p>When you use ProposalPro AI, we collect:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Information you provide when creating proposals</li>
              <li>Usage data to improve our services</li>
              <li>Payment information when subscribing to premium features</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Generate and improve proposals</li>
              <li>Process payments and maintain your account</li>
              <li>Improve our services and user experience</li>
              <li>Communicate important updates</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
            <p>We implement appropriate security measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <p>Email: support@proposalpro.ai</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;