import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * POST /api/checklist/migrate
 * Moves localStorage checklist to the database on account creation.
 * Body: { parentId: string, questionIds: string[] }
 */
export async function POST(req: NextRequest) {
  try {
    const { parentId, questionIds } = await req.json();

    if (!parentId || !Array.isArray(questionIds) || questionIds.length === 0) {
      return NextResponse.json(
        { error: "parentId and questionIds[] required" },
        { status: 400 },
      );
    }

    const admin = createAdminClient();

    // Upsert: merge with any existing saved questions
    const { data: existing } = await admin
      .from("parent_checklists")
      .select("question_ids")
      .eq("parent_id", parentId)
      .single();

    const merged = Array.from(
      new Set([...(existing?.question_ids ?? []), ...questionIds]),
    );

    const { error } = await admin.from("parent_checklists").upsert(
      {
        parent_id: parentId,
        question_ids: merged,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "parent_id" },
    );

    if (error) {
      console.error("Checklist migration failed:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, count: merged.length });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
