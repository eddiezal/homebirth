import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();

    // PKCE token hash (magic links) vs authorization code (OAuth/password reset)
    const { error } = code.startsWith("pkce_")
      ? await supabase.auth.verifyOtp({ token_hash: code, type: (type || "magiclink") as "magiclink" | "email" })
      : await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check user role to redirect appropriately
      const { data: { user } } = await supabase.auth.getUser();
      const role = user?.user_metadata?.role;

      if (role === "provider") {
        return NextResponse.redirect(`${origin}/provider-dashboard`);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth code error — redirect to sign-in with expired link
  return NextResponse.redirect(`${origin}/sign-in`);
}
