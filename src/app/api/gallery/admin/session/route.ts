import { NextResponse } from "next/server";

import { galleryAdminCookie, getAdminSessionToken, verifyAdminPassword } from "@/lib/gallery/admin-auth";
import { consumeRateLimit, getClientAddress } from "@/lib/gallery/rate-limit";

export const runtime = "nodejs";

function isSecureRequest(request: Request) {
  return request.headers.get("x-forwarded-proto") === "https" || new URL(request.url).protocol === "https:";
}

export async function POST(request: Request) {
  const rateLimit = consumeRateLimit(`admin-login:${getClientAddress(request)}`, 5, 15 * 60 * 1000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde alguns minutos." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } },
    );
  }

  let password = "";
  try {
    const body = await request.json() as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Solicitação inválida." }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(galleryAdminCookie, getAdminSessionToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: isSecureRequest(request),
    path: "/",
    maxAge: 8 * 60 * 60,
  });
  return response;
}

export function DELETE(request: Request) {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(galleryAdminCookie, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: isSecureRequest(request),
    path: "/",
    maxAge: 0,
  });
  return response;
}
