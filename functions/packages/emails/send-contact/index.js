'use strict';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

function ok(data) {
  return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(data) };
}

function fail(status, message) {
  return { statusCode: status, headers: CORS_HEADERS, body: JSON.stringify({ error: message }) };
}

async function main(args) {
  // Preflight CORS
  if (args.__ow_method === 'options') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  // DO Functions envía el body como base64 cuando Content-Type es application/json
  let payload;
  try {
    const raw = args.__ow_body
      ? Buffer.from(args.__ow_body, 'base64').toString('utf-8')
      : JSON.stringify(args);
    payload = JSON.parse(raw);
  } catch {
    return fail(400, 'Cuerpo de la petición inválido.');
  }

  const { servicio, metros, nombre, empresa, email, telefono } = payload;

  if (!servicio || !nombre || !empresa || !email || !telefono) {
    return fail(422, 'Todos los campos marcados con * son obligatorios.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail(422, 'El correo electrónico no es válido.');
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || 'noreply@loginco.com.mx';
  const recipientList = (process.env.RECIPIENT_LIST || 'info@loginco.com.mx')
    .split(',')
    .map(e => e.trim())
    .filter(Boolean);

  if (!apiKey) {
    return fail(500, 'Configuración del servidor incompleta.');
  }

  const htmlBody = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1f2937">
      <div style="background:#0d9488;padding:24px 32px;border-radius:8px 8px 0 0">
        <h1 style="color:#fff;margin:0;font-size:20px">Nueva solicitud de cotización</h1>
        <p style="color:#ccfbf1;margin:4px 0 0;font-size:13px">Loginco — Patio y Bodega</p>
      </div>
      <div style="background:#f9fafb;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280;width:40%"><strong>Servicio</strong></td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px">${servicio}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280"><strong>Espacio requerido</strong></td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px">${metros || '—'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280"><strong>Nombre</strong></td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px">${nombre}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280"><strong>Empresa</strong></td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px">${empresa}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280"><strong>Email</strong></td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px"><a href="mailto:${email}" style="color:#0d9488">${email}</a></td></tr>
          <tr><td style="padding:10px 0;font-size:13px;color:#6b7280"><strong>Teléfono</strong></td><td style="padding:10px 0;font-size:14px">${telefono}</td></tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:#ccfbf1;border-radius:6px;font-size:13px;color:#0f766e">
          Responde directamente a este correo para contactar al prospecto.
        </div>
      </div>
    </div>
  `;

  const sgPayload = {
    personalizations: [{ to: recipientList.map(e => ({ email: e })) }],
    from: { email: fromEmail, name: 'Loginco Web' },
    reply_to: { email, name: nombre },
    subject: `Cotización: ${servicio} — ${empresa}`,
    content: [{ type: 'text/html', value: htmlBody }],
  };

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sgPayload),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('SendGrid error:', response.status, detail);
    return fail(502, 'No se pudo enviar el correo. Intenta de nuevo o contáctanos directamente.');
  }

  return ok({ sent: true });
}

module.exports = { main };
