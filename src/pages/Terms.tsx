import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg">
          <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using ProposalPro AI, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p>We grant you a limited, non-exclusive, non-transferable license to use ProposalPro AI for your business purposes, subject to these terms.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Service Description</h2>
            <p>ProposalPro AI provides AI-powered proposal generation services. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Obligations</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate information</li>
              <li>Maintain the security of your account</li>
              <li>Use the service in compliance with all applicable laws</li>
              <li>Not misuse or attempt to manipulate the service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
            <p>Premium features require payment. All payments are processed securely through our payment provider. Refunds are handled on a case-by-case basis.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
            <p>For any questions regarding these terms, please contact us at:</p>
            <p>Email: support@proposalpro.ai</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;