
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailPayload {
  email: string;
  firstName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log the received request
    console.log("Received request:", {
      method: req.method,
      headers: Object.fromEntries(req.headers.entries()),
    });

    const { email, firstName }: EmailPayload = await req.json();
    
    // Validate email
    if (!email) {
      throw new Error("Email is required");
    }

    console.log("Attempting to send welcome email to:", email);
    console.log("Using Resend API key:", Deno.env.get("RESEND_API_KEY") ? "Present" : "Missing");

    const emailResponse = await resend.emails.send({
      from: "ProposalPro AI <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to ProposalPro AI!",
      html: `
        <h1>Welcome to ProposalPro AI${firstName ? `, ${firstName}` : ''}!</h1>
        <p>Thank you for signing up. Please verify your email to get started.</p>
        <p>Best regards,<br>The ProposalPro AI Team</p>
      `,
    });

    console.log("Welcome email response:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.response?.data || error.response || "No additional details available"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
