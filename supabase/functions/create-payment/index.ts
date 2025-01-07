import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PAYFAST_SANDBOX_URL = "https://sandbox.payfast.co.za/eng/process"
const PAYFAST_LIVE_URL = "https://www.payfast.co.za/eng/process"
const MERCHANT_ID = Deno.env.get('PAYFAST_MERCHANT_ID')
const MERCHANT_KEY = Deno.env.get('PAYFAST_MERCHANT_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { amount, returnUrl, cancelUrl } = await req.json()
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(req.headers.get('Authorization')?.split(' ')[1] ?? '')

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create payment record in database
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        amount: amount,
        status: 'pending'
      })
      .select()
      .single()

    if (paymentError) {
      console.error('Payment creation error:', paymentError)
      return new Response(
        JSON.stringify({ error: 'Failed to create payment' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
      custom_str1: payment.id,
    }

    return new Response(
      JSON.stringify({
        paymentUrl: PAYFAST_SANDBOX_URL,
        paymentData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})