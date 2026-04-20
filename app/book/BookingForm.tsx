"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const shootTypes = [
  "Fine art print enquiry",
  "Landscape commission",
  "Licensing / editorial use",
  "Storm-chase media",
  "Workshop / collaboration",
  "Other"
];

const budgetOptions = [
  { value: "Under £500", label: "Under £500", emoji: "🌱" },
  { value: "£500–£1,500", label: "£500–£1.5k", emoji: "☕️" },
  { value: "£1,500–£3,000", label: "£1.5k–£3k", emoji: "📸" },
  { value: "£3,000–£6,000", label: "£3k–£6k", emoji: "✨" },
  { value: "£6,000+", label: "£6k+", emoji: "🚀" },
  { value: "Let's chat", label: "Let's chat", emoji: "💬" }
];

export default function BookingForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [files, setFiles] = useState<File[]>([]);
  const [budget, setBudget] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const totalBytes = files.reduce((n, f) => n + f.size, 0);
    if (totalBytes > 20 * 1024 * 1024) {
      setStatus({
        kind: "error",
        message: "Attachments exceed the 20MB limit."
      });
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/book", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setFiles([]);
      setBudget("");
      setStatus({
        kind: "success",
        message:
          "Thank you. Your enquiry has been received and will be answered within two working days."
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setStatus({ kind: "error", message });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} encType="multipart/form-data">
      <div className="form-row">
        <label>
          Name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>

      <div className="form-row">
        <label>
          Phone (optional)
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          Enquiry type
          <select name="shootType" required defaultValue="">
            <option value="" disabled>Select…</option>
            {shootTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          Preferred date
          <input name="preferredDate" type="date" />
        </label>
        <label>
          Location
          <input name="location" placeholder="City or venue" />
        </label>
      </div>

      <div className="budget-field">
        <span className="budget-label">Budget (optional)</span>
        <div className="chips" role="radiogroup" aria-label="Budget">
          {budgetOptions.map((opt, i) => {
            const active = budget === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                className={`chip chip-${i % 5}${active ? " active" : ""}`}
                onClick={() => setBudget(active ? "" : opt.value)}
              >
                <span className="chip-emoji" aria-hidden>{opt.emoji}</span>
                {opt.label}
              </button>
            );
          })}
        </div>
        <input type="hidden" name="budget" value={budget} />
      </div>

      <label>
        Project details
        <textarea
          name="message"
          rows={6}
          required
          placeholder="Please describe the project, intended use, timescales, and any relevant context."
        />
      </label>

      <label>
        Supporting material (optional)
        <div className="dropzone">
          Drop files here, or select from your device
          <input
            type="file"
            name="attachments"
            multiple
            accept=".pdf,.doc,.docx,.txt,.md,image/*"
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          />
          {files.length > 0 && (
            <div className="file-list">
              {files.map((f) => (
                <div key={f.name}>
                  {f.name} — {(f.size / 1024).toFixed(0)} KB
                </div>
              ))}
            </div>
          )}
        </div>
      </label>

      <label style={{ flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
        <input type="checkbox" name="requestMeeting" value="yes" defaultChecked />
        <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--fg)" }}>
          Please arrange an introductory call prior to confirmation.
        </span>
      </label>

      <button
        className="btn"
        type="submit"
        disabled={status.kind === "submitting"}
      >
        {status.kind === "submitting" ? "Submitting…" : "Submit enquiry"}
      </button>

      {status.kind === "success" && (
        <div className="form-status success">{status.message}</div>
      )}
      {status.kind === "error" && (
        <div className="form-status error">{status.message}</div>
      )}
    </form>
  );
}
