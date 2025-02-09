
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PAYFAST_URL = "https://www.payfast.co.za/eng/process"
const MERCHANT_ID = Deno.env.get('PAYFAST_MERCHANT_ID')
const MERCHANT_KEY = Deno.env.get('PAYFAST_MERCHANT_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { amount, returnUrl, cancelUrl, paymentId } = await req.json()

    // Debug log for troubleshooting
    console.log('Payment request received:', { amount, returnUrl, cancelUrl, paymentId })
    console.log('Using merchant credentials:', { 
      merchantId: MERCHANT_ID ? 'Present' : 'Missing',
      merchantKey: MERCHANT_KEY ? 'Present' : 'Missing'
    })

    // Validate required environment variables
    if (!MERCHANT_ID || !MERCHANT_KEY) {
      console.error('Missing PayFast credentials')
      return new Response(
        JSON.stringify({ error: 'Payment service configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate required parameters
    if (!amount || !returnUrl || !cancelUrl || !paymentId) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get user from auth header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      console.error('Auth error:', userError)
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate PayFast payment data
    const paymentData = {
      merchant_id: MERCHANT_ID,
      merchant_key: MERCHANT_KEY,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      notify_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-webhook`,
      amount: amount.toFixed(2),
      item_name: 'ProposalPro AI Pro Subscription',
      custom_str1: paymentId,
      email_address: user.email
    }

    console.log('PayFast request data:', {
      url: PAYFAST_URL,
      paymentData: { ...paymentData, merchant_id: 'HIDDEN', merchant_key: 'HIDDEN' }
    })

    // Return success response with payment URL and data
    return new Response(
      JSON.stringify({
        paymentUrl: PAYFAST_URL,
        paymentData
      }),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error processing payment:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
