import type { APIRoute } from 'astro';
import { appendFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: { name?: string; email?: string; product?: string };

  try {
    body = await request.json();
  } catch {
    return json({ error: 'Solicitud inválida' }, 400);
  }

  const { name, email, product } = body;

  if (!name?.trim() || !email?.trim()) {
    return json({ error: 'El nombre y el correo son requeridos' }, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return json({ error: 'Correo electrónico inválido' }, 400);
  }

  const timestamp = new Date().toISOString();
  const line = `${timestamp} | ${(product ?? 'general').trim()} | ${name.trim()} | ${email.trim()}\n`;

  const filePath = join(process.cwd(), 'data', 'subscribers.txt');
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  appendFileSync(filePath, line, 'utf8');

  return json({ success: true });
};

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
