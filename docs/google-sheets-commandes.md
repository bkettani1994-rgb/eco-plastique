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

**Nappes PVC** *(une ligne par nappe ; le N° commande regroupe les nappes d'une même commande)*
`Date · N° commande · Nom complet · Téléphone · Ville · Adresse · Type de nappe · Forme · Épaisseur · Dimensions · Quantité · Prix ligne (MAD) · Total commande (MAD) · Langue`

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

const NAPPE_HEADERS = [
  "Date", "N° commande", "Nom complet", "Téléphone", "Ville", "Adresse",
  "Type de nappe", "Forme", "Épaisseur", "Dimensions", "Quantité",
  "Prix ligne (MAD)", "Total commande (MAD)", "Langue",
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

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const lang = data.lang === "ar" ? "Arabe" : "Français";
    const phone = "'" + (data.phone || ""); // garde le 0 initial

    if (data.product === "nappe-pvc") {
      const sheet = getSheet(NAPPE_SHEET, NAPPE_HEADERS);
      const rows = data.rows && data.rows.length ? data.rows : [{}];
      rows.forEach(function (r) {
        sheet.appendRow([
          new Date(), data.orderId || "", data.fullName || "", phone,
          data.city || "", data.address || "",
          r.type || "", r.shape || "", r.thickness || "", r.dimensions || "",
          r.qty || "", r.price || "", data.total || 0, lang,
        ]);
      });
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
