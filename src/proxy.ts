import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pages FR qui possèdent une version arabe (/ar/...)
const AR_ENABLED = new Set([
  "/",
  "/produits",
  "/produits/nappe-pvc-sur-mesure",
  "/produits/protege-matelas-impermeable",
  "/produits/oreiller-cervical-medical",
  "/produits/oreiller-memoire-forme",
  "/a-propos",
  "/contact",
]);

// L'arabe est la langue par défaut : tout nouveau visiteur est redirigé vers /ar.
// Le visiteur qui choisit « FR » pose un cookie lang=fr et n'est plus redirigé.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!AR_ENABLED.has(pathname)) return NextResponse.next();

  // Choix explicite du français : on respecte
  if (request.cookies.get("lang")?.value === "fr") return NextResponse.next();

  // Par défaut → version arabe
  const url = request.nextUrl.clone();
  url.pathname = `/ar${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/", "/produits", "/produits/:path*", "/a-propos", "/contact"],
};
