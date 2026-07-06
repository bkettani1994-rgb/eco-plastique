# Configuration des commandes (Google Sheets + Meta)

## Variables d'environnement Vercel

| Variable | Rôle |
|----------|------|
| `GOOGLE_SHEETS_WEBHOOK_URL` | URL `/exec` du script Apps Script (réception des commandes dans Sheets) |
| `META_CAPI_ACCESS_TOKEN` | Jeton de la Conversions API Meta (envoi serveur de l'événement Purchase) |

Après toute modification d'une variable, **redéployer** le site (les variables
ne sont prises en compte qu'au build suivant).

### Conversions API Meta (CAPI)
- Jeton : Gestionnaire d'événements → pixel → Paramètres → API de conversions
  → « Générer un jeton d'accès ».
- Le serveur envoie `Purchase` (valeur + MAD) avec le téléphone/prénom/ville
  hachés (SHA-256) et l'`event_id` = numéro de commande, qui **déduplique**
  avec l'événement du pixel navigateur (même `eventID`). Meta ne compte donc
  jamais la vente deux fois.
- Si la variable n'est pas définie, le serveur n'envoie rien (aucune erreur).

---

# Réception des commandes dans Google Sheets

Chaque commande passée sur le site est envoyée vers un fichier Google Sheets,
avec **une feuille par produit** et des **colonnes structurées**.

## Colonnes par feuille

**Protège-matelas**
`Date · N° commande · Nom complet · Téléphone · Ville · Adresse · Offre · Tailles · Total (MAD) · Langue`

**Oreiller cervical**
`Date · N° commande · Nom complet · Téléphone · Ville · Adresse · Offre · Modèle · Total (MAD) · Langue`

**Oreiller mousse**
`Date · N° commande · Nom complet · Téléphone · Ville · Adresse · Offre · Épaisseurs · Total (MAD) · Langue`

**Nappes PVC** *(une seule ligne par commande ; toutes les nappes regroupées dans une cellule)*
`Date · N° commande · Nom complet · Téléphone · Ville · Adresse · Détail des nappes · Nombre de nappes · Total (MAD) · Langue`

**Messages contact** *(formulaire de la page Contact)*
`Date · Nom · Email · Téléphone · Message`

**Newsletter** *(case d'inscription du footer)*
`Date · Email`

## Le script (Extensions → Apps Script)

Remplacez tout le contenu de `Code.gs` par ceci, puis **Déployer → Gérer les
déploiements → ✏️ → Nouvelle version** (l'URL `/exec` ne change pas) :

```javascript
/** Réception des commandes Eco Plastique — colonnes par produit. */

const CONFIG = {
  "protege-matelas": { sheet: "Protège-matelas", variantLabel: "Tailles" },
  "oreiller-cervical": { sheet: "Oreiller cervical", variantLabel: "Modèle" },
  "oreiller-memoire": { sheet: "Oreiller mousse", variantLabel: "Épaisseurs" },
};

const NAPPE_SHEET = "Nappes PVC";

// Une seule ligne par commande ; toutes les nappes regroupées dans « Détail des nappes »
const NAPPE_HEADERS = [
  "Date", "N° commande", "Nom complet", "Téléphone", "Ville", "Adresse",
  "Détail des nappes", "Nombre de nappes", "Total (MAD)", "Langue",
];

function getSheet(name, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

const CONTACT_SHEET = "Messages contact";
const CONTACT_HEADERS = ["Date", "Nom", "Email", "Téléphone", "Message"];

const NEWSLETTER_SHEET = "Newsletter";
const NEWSLETTER_HEADERS = ["Date", "Email"];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const lang = data.lang === "ar" ? "Arabe" : "Français";
    const phone = "'" + (data.phone || ""); // garde le 0 initial

    // ── Messages de contact ──
    if (data.type === "contact") {
      const sheet = getSheet(CONTACT_SHEET, CONTACT_HEADERS);
      sheet.appendRow([
        new Date(), data.name || "", data.email || "", phone, data.message || "",
      ]);
      return ContentService.createTextOutput(
        JSON.stringify({ ok: true })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // ── Inscriptions newsletter ──
    if (data.type === "newsletter") {
      const sheet = getSheet(NEWSLETTER_SHEET, NEWSLETTER_HEADERS);
      sheet.appendRow([new Date(), data.email || ""]);
      return ContentService.createTextOutput(
        JSON.stringify({ ok: true })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    if (data.product === "nappe-pvc") {
      const sheet = getSheet(NAPPE_SHEET, NAPPE_HEADERS);
      const rows = data.rows && data.rows.length ? data.rows : [];
      // Regroupe toutes les nappes de la commande dans une seule cellule
      const detail = rows.map(function (r, i) {
        return (i + 1) + ") " + [r.type, r.shape, r.thickness, r.dimensions,
          "×" + (r.qty || 1), (r.price || 0) + " MAD"].join(" | ");
      }).join("\n");
      const nbNappes = rows.reduce(function (sum, r) {
        return sum + (Number(r.qty) || 1);
      }, 0);
      sheet.appendRow([
        new Date(), data.orderId || "", data.fullName || "", phone,
        data.city || "", data.address || "",
        detail, nbNappes, data.total || 0, lang,
      ]);
    } else {
      const cfg = CONFIG[data.product];
      if (!cfg) {
        return ContentService.createTextOutput(
          JSON.stringify({ ok: false, error: "unknown product" })
        ).setMimeType(ContentService.MimeType.JSON);
      }
      const headers = [
        "Date", "N° commande", "Nom complet", "Téléphone", "Ville", "Adresse",
        "Offre", cfg.variantLabel, "Total (MAD)", "Langue",
      ];
      const sheet = getSheet(cfg.sheet, headers);
      sheet.appendRow([
        new Date(), data.orderId || "", data.fullName || "", phone,
        data.city || "", data.address || "",
        data.offer || "", data.variant || "", data.total || 0, lang,
      ]);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Mise à jour depuis l'ancienne version

Les feuilles existantes gardent leurs anciens en-têtes (« Détails de la
commande »). Pour repartir proprement :
1. **Supprimez** (ou renommez en `Archive …`) les 4 feuilles existantes.
2. Le script recrée automatiquement chaque feuille avec les **nouvelles
   colonnes** à la première commande du produit.

## Installation initiale (rappel)

1. [sheets.new](https://sheets.new) → Extensions → Apps Script → coller le script.
2. Déployer → Nouveau déploiement → **Application Web** → Exécuter en tant
   que : *Moi* · Qui a accès : *Tout le monde* → copier l'URL `/exec`.
3. Vercel → Settings → Environment Variables :
   `GOOGLE_SHEETS_WEBHOOK_URL = https://script.google.com/macros/s/XXXXX/exec`
4. Redéployer le site, puis passer une commande test.
