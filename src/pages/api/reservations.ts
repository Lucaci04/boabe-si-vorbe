import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { guestOptions, validateReservation, type ReservationInput } from '../../lib/reservation';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

// Format din PLAN §3.4: BV-XXXX (4 cifre, generate criptografic).
const generateCode = () => `BV-${1000 + (crypto.getRandomValues(new Uint32Array(1))[0] % 9000)}`;

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ error: 'Format invalid.' }, 415);
  }
  // Limită de mărime: formularul are sub 2 KB.
  const raw = await request.text();
  if (raw.length > 8_000) return json({ error: 'Cerere prea mare.' }, 413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'Format invalid.' }, 400);
  }

  // Honeypot anti-spam: câmpul e invizibil pentru oameni.
  if (typeof body.website === 'string' && body.website.length > 0) {
    return json({ code: generateCode(), demo: true });
  }

  const str = (v: unknown) => (typeof v === 'string' ? v : '');
  const input: ReservationInput = {
    zone: str(body.zone),
    guests: str(body.guests),
    date: str(body.date),
    time: str(body.time),
    name: str(body.name).trim(),
    phone: str(body.phone).trim(),
    email: str(body.email).trim().toLowerCase(),
    notes: str(body.notes).trim(),
  };

  const errors = validateReservation(input);
  if (Object.keys(errors).length > 0) return json({ error: 'Verifică datele rezervării.', errors }, 422);

  const guests = guestOptions.find((g) => g.id === input.guests)!;
  const notes = [guests.id === '7+' ? 'Grup 7+ (de confirmat telefonic)' : '', input.notes].filter(Boolean).join(' · ');

  if (!supabase) {
    // Fără chei Supabase: în dev răspundem cu un cod demo, în producție refuzăm explicit.
    if (import.meta.env.DEV) {
      console.warn('[reservations] SUPABASE_URL / SUPABASE_ANON_KEY lipsesc — rezervare demo, nesalvată.');
      return json({ code: generateCode(), demo: true });
    }
    return json({ error: 'Rezervările online sunt momentan indisponibile. Te rugăm să ne suni.' }, 503);
  }

  // Codul e UNIQUE în DB; la coliziune (23505) generăm altul.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode();
    const { error } = await supabase.from('reservations').insert({
      reservation_code: code,
      customer_name: input.name,
      customer_phone: input.phone,
      customer_email: input.email,
      reservation_date: input.date,
      reservation_time: input.time,
      guests_count: guests.count,
      seating_zone: input.zone,
      special_notes: notes || null,
    });
    if (!error) return json({ code });
    if (error.code !== '23505') {
      console.error('[reservations] insert failed', error.code, error.message);
      return json({ error: 'Nu am putut salva rezervarea. Încearcă din nou sau sună-ne.' }, 500);
    }
  }
  return json({ error: 'Nu am putut genera un cod unic. Încearcă din nou.' }, 500);
};
