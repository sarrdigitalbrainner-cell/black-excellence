import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Échappement minimal pour éviter toute injection HTML dans l'e-mail. */
function esc(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const FIELDS: { key: string; label: string }[] = [
  { key: "tripType", label: "Type de trajet" },
  { key: "pickup", label: "Départ" },
  { key: "dropoff", label: "Destination" },
  { key: "date", label: "Date" },
  { key: "time", label: "Heure" },
  { key: "returnDate", label: "Date de retour" },
  { key: "returnTime", label: "Heure de retour" },
  { key: "passengers", label: "Passagers" },
  { key: "luggage", label: "Bagages" },
  { key: "vehicle", label: "Véhicule" },
  { key: "name", label: "Nom" },
  { key: "email", label: "E-mail" },
  { key: "phone", label: "Téléphone" },
  { key: "notes", label: "Demandes particulières" },
];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  // Champs strictement nécessaires pour pouvoir rappeler le client.
  if (!body || !body.name || !body.phone) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESERVATION_EMAIL_FROM;
  const to = process.env.RESERVATION_EMAIL_TO;

  if (!apiKey || !from || !to) {
    console.error(
      "Demande non envoyée : variables d'environnement manquantes (RESEND_API_KEY / RESERVATION_EMAIL_FROM / RESERVATION_EMAIL_TO)."
    );
    return NextResponse.json(
      { ok: false, error: "email_not_configured" },
      { status: 500 }
    );
  }

  const rows = FIELDS.filter((f) => {
    const v = body[f.key];
    return v !== undefined && v !== null && String(v).trim() !== "";
  })
    .map(
      (f) =>
        `<tr>
           <td style="padding:6px 14px 6px 0;color:#8a8a8a;font-size:13px;white-space:nowrap;">${esc(
             f.label
           )}</td>
           <td style="padding:6px 0;color:#111;font-size:14px;">${esc(
             body[f.key]
           )}</td>
         </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;max-width:620px;">
      <h2 style="margin:0 0 4px;font-size:19px;">Nouvelle demande de devis</h2>
      <p style="margin:0 0 20px;color:#777;font-size:13px;">
        Black Elite Transfers — formulaire du site
      </p>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
    </div>
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
        // Permet de répondre directement au client depuis la boîte mail.
        ...(body.email ? { reply_to: String(body.email) } : {}),
        subject: `Devis — ${esc(body.pickup) || "?"} → ${
          esc(body.dropoff) || "?"
        } (${esc(body.date) || "date à définir"})`,
        html,
      }),
    });

    if (!response.ok) {
      console.error("Échec de l'envoi Resend :", await response.text());
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur réseau lors de l'envoi :", error);
    return NextResponse.json(
      { ok: false, error: "network_error" },
      { status: 502 }
    );
  }
}
