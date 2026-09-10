/**
 * ------------------------------------------------------------------
 *  COORDONNÉES DE CONTACT — À REMPLACER PAR LES VRAIES COORDONNÉES
 *  DU CHAUFFEUR DÈS QU'ELLES SONT DISPONIBLES.
 * ------------------------------------------------------------------
 *  Format attendu pour WHATSAPP_NUMBER / PHONE_NUMBER_E164 :
 *  indicatif pays + numéro, sans espaces ni "+" (ex. "41791234567").
 * ------------------------------------------------------------------
 */
export const PHONE_NUMBER_DISPLAY = "+41 79 000 00 00";
export const PHONE_NUMBER_E164 = "41790000000";
export const WHATSAPP_NUMBER = "41790000000";

// Email de contact affiché dans le footer — à remplacer par la vraie adresse.
export const CONTACT_EMAIL = "contact@blackexcellencetransport.ch";

// Réseaux sociaux — à compléter avec les vrais liens dès qu'ils existent.
export const INSTAGRAM_URL = "#";
export const TIKTOK_URL = "#";

export function telHref() {
  return `tel:+${PHONE_NUMBER_E164}`;
}

export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}
