/* Envoi des messages de contact et inscriptions newsletter vers Google
   Sheets (via /api/lead → Apps Script). Ne bloque jamais l'utilisateur. */

export interface ContactLead {
  type: "contact";
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface NewsletterLead {
  type: "newsletter";
  email: string;
}

async function post(body: ContactLead | NewsletterLead): Promise<boolean> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function submitContact(lead: Omit<ContactLead, "type">) {
  return post({ type: "contact", ...lead });
}

export function submitNewsletter(email: string) {
  return post({ type: "newsletter", email });
}
