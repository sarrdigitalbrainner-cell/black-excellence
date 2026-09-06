import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ReservationPayload = {
  vehicle: string;
  date: string;
  time: string;
  name: string;
  phone: string;
};

function isValidPayload(data: unknown): data is ReservationPayload {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.vehicle === "string" &&
    typeof d.date === "string" &&
    typeof d.time === "string" &&
    typeof d.name === "string" &&
    typeof d.phone === "string"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESERVATION_EMAIL_FROM;
  const to = process.env.RESERVATION_EMAIL_TO;

  if (!apiKey || !from || !to) {
    // Configuration manquante côté serveur (variables d'environnement
    // non définies) : on prévient le front pour qu'il propose le
    // repli WhatsApp/téléphone plutôt que de faire échouer en silence.
    console.error(
      "Reservation email non envoyé : variables d'environnement manquantes (RESEND_API_KEY / RESERVATION_EMAIL_FROM / RESERVATION_EMAIL_TO)."
    );
    return NextResponse.json(
      { ok: false, error: "email_not_configured" },
      { status: 500 }
    );
  }

  const { vehicle, date, time, name, phone } = body;

  const html = `
    <h2>Nouvelle demande de réservation — Black Excellence</h2>
    <p><strong>Véhicule :</strong> ${vehicle}</p>
    <p><strong>Date :</strong> ${date}</p>
    <p><strong>Heure :</strong> ${time}</p>
    <p><strong>Nom du client :</strong> ${name}</p>
    <p><strong>Téléphone :</strong> ${phone}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `Nouvelle réservation — ${vehicle} (${date})`,
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Échec de l'envoi Resend :", errorText);
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur réseau lors de l'envoi de l'e-mail :", error);
    return NextResponse.json(
      { ok: false, error: "network_error" },
      { status: 502 }
    );
  }
}
