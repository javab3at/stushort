import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const runtime = "nodejs";

const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  const submission = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    name,
    email,
    phone: String(form.get("phone") ?? "") || null,
    shootType: String(form.get("shootType") ?? "") || null,
    preferredDate: String(form.get("preferredDate") ?? "") || null,
    location: String(form.get("location") ?? "") || null,
    budget: String(form.get("budget") ?? "") || null,
    requestMeeting: form.get("requestMeeting") === "yes",
    message,
    attachments: [] as { name: string; size: number; storedAs: string }[]
  };

  const attachments = form.getAll("attachments").filter((v): v is File => v instanceof File && v.size > 0);
  const totalBytes = attachments.reduce((n, f) => n + f.size, 0);
  if (totalBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { error: "Attachments exceed the 20MB limit." },
      { status: 413 }
    );
  }

  const uploadDir = path.join(process.cwd(), "uploads", submission.id);
  if (attachments.length > 0) {
    await mkdir(uploadDir, { recursive: true });
    for (const file of attachments) {
      const safeName = file.name.replace(/[^\w.\-]+/g, "_");
      const storedAs = path.join(uploadDir, safeName);
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(storedAs, buffer);
      submission.attachments.push({ name: file.name, size: file.size, storedAs });
    }
  }

  const logDir = path.join(process.cwd(), "uploads");
  await mkdir(logDir, { recursive: true });
  await writeFile(
    path.join(logDir, `${submission.id}.json`),
    JSON.stringify(submission, null, 2),
    "utf8"
  );

  console.log(
    `[booking] ${submission.id} from ${email} — ${submission.shootType ?? "n/a"}` +
      (attachments.length ? ` + ${attachments.length} file(s)` : "")
  );

  return NextResponse.json({ ok: true, id: submission.id });
}
