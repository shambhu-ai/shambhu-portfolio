import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const CORS = {
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    const body   = await req.json()
    const record = body.record ?? body
    const { from_name, from_email, subject, message } = record

    if (!from_name || !from_email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...CORS, 'Content-Type': 'application/json' } },
      )
    }

    const RESEND_KEY  = Deno.env.get('RESEND_API_KEY')  ?? ''
    const NOTIFY_TO   = Deno.env.get('NOTIFY_TO')       ?? ''
    const NOTIFY_FROM = Deno.env.get('NOTIFY_FROM')     ?? 'portfolio@resend.dev'

    if (!RESEND_KEY || !NOTIFY_TO) {
      return new Response(
        JSON.stringify({ success: true, note: 'Email skipped — secrets not configured.' }),
        { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } },
      )
    }

    const emailHtml = `
      <div style="font-family: 'JetBrains Mono', monospace; background: #0B0F19; color: #e2e8f0; padding: 32px; border-radius: 8px; border: 1px solid #1f2d45; max-width: 600px;">
        <div style="color: #10B981; font-size: 12px; margin-bottom: 16px;">PORTFOLIO CONTACT SYSTEM · NEW MESSAGE RECEIVED</div>
        <h2 style="color: #D97706; margin: 0 0 16px 0;">New Contact: ${subject ?? '(no subject)'}</h2>
        <div style="margin-bottom: 8px;"><span style="color: #64748b;">FROM: </span><span>${from_name} &lt;${from_email}&gt;</span></div>
        <hr style="border-color: #1f2d45; margin: 16px 0;" />
        <div style="white-space: pre-wrap; line-height: 1.8; color: #94a3b8;">${message}</div>
        <hr style="border-color: #1f2d45; margin: 16px 0;" />
        <div style="color: #4b5563; font-size: 11px;">Shambhu Patil · Portfolio Contact System</div>
      </div>
    `

    const emailRes = await fetch('https://api.resend.com/emails', {
      method : 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body   : JSON.stringify({
        from   : NOTIFY_FROM,
        to     : [NOTIFY_TO],
        subject: `[Portfolio] ${subject ?? '(no subject)'} — from ${from_name}`,
        html   : emailHtml,
      }),
    })

    if (!emailRes.ok) throw new Error(`Resend ${emailRes.status}: ${await emailRes.text()}`)

    return new Response(JSON.stringify({ success: true }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } })

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } },
    )
  }
})
