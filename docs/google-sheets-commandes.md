# Réception des commandes dans Google Sheets

Chaque commande passée sur le site est envoyée vers un fichier Google Sheets,
avec **une feuille par produit** :

| Produit | Feuille |
|---------|---------|
| Nappes en PVC | `Nappes PVC` |
| Protège-matelas | `Protège-matelas` |
| Oreiller cervical | `Oreiller cervical` |
| Oreiller mousse | `Oreiller mousse` |

Colonnes de chaque feuille : Date · Nom complet · Téléphone · Ville · Adresse ·
Détails de la commande · Total (MAD) · Langue.

## Installation (une seule fois, ~10 minutes)

### 1. Créer le fichier Google Sheets
1. Allez sur [sheets.new](https://sheets.new) et créez un fichier, par exemple
   nommé **« Commandes Eco Plastique »**.
2. Pas besoin de créer les feuilles à la main : le script les crée
   automatiquement avec leurs en-têtes à la première commande.

### 2. Ajouter le script
1. Dans le fichier : menu **Extensions → Apps Script**.
2. Effacez le contenu de `Code.gs` et collez le script ci-dessous.
3. Enregistrez (icône disquette).

```javascript
/** Réception des commandes Eco Plastique — une feuille par produit. */

const SHEET_BY_PRODUCT = {
  "nappe-pvc": "Nappes PVC",
  "protege-matelas": "Protège-matelas",
  "oreiller-cervical": "Oreiller cervical",
  "oreiller-memoire": "Oreiller mousse",
};

const HEADERS = [
  "Date",
  "Nom complet",
  "Téléphone",
  "Ville",
  "Adresse",
  "Détails de la commande",
  "Total (MAD)",
  "Langue",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetName = SHEET_BY_PRODUCT[data.product];
    if (!sheetName) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "unknown product" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.fullName || "",
      "'" + (data.phone || ""), // apostrophe pour garder le 0 initial
      data.city || "",
      data.address || "",
      data.details || "",
      data.total || 0,
      data.lang === "ar" ? "Arabe" : "Français",
    ]);

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

### 3. Déployer le script en Web App
1. En haut à droite : **Déployer → Nouveau déploiement**.
2. Cliquez sur l'engrenage ⚙️ → **Application Web**.
3. Réglages :
   - **Exécuter en tant que** : *Moi* (votre compte)
   - **Qui a accès** : ***Tout le monde*** (obligatoire pour que le site
     puisse envoyer les commandes — l'URL est secrète et non devinable)
4. Cliquez **Déployer**, autorisez l'accès quand Google le demande.
5. **Copiez l'URL du déploiement** (elle se termine par `/exec`).

### 4. Configurer le site
Ajoutez la variable d'environnement sur l'hébergeur (Vercel →
Settings → Environment Variables) :

```
GOOGLE_SHEETS_WEBHOOK_URL = https://script.google.com/macros/s/XXXXX/exec
```

Puis redéployez le site. C'est tout : chaque commande arrive dans la bonne
feuille en temps réel.

### Tester
Passez une commande test sur n'importe quelle page produit — la ligne doit
apparaître dans la feuille correspondante en quelques secondes.

## Notes
- Si la variable n'est pas configurée, le site fonctionne normalement (les
  commandes suivent le parcours habituel) mais rien n'est envoyé au Sheet.
- Pour modifier le script plus tard : refaites **Déployer → Gérer les
  déploiements → ✏️ → Nouvelle version**, l'URL ne change pas.
