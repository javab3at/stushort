# Lens & Light — Photographer Portfolio

A Next.js 14 (App Router) site to showcase photography and capture booking
requests, including brief uploads.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's included

- `app/page.tsx` — landing page with hero, gallery, about, services, CTA
- `app/book/` — booking page with a client form (meeting request + file upload)
- `app/api/book/route.ts` — server handler: validates submissions, writes
  attachments and a JSON record to `./uploads/<id>/`
- `lib/portfolio.ts` — gallery data; swap the `src` URLs for your own images
  (put files in `public/` and reference as `/your-image.jpg`)

## Going to production

The API handler currently stores submissions on local disk. For deployment
you'll want to replace that with one or more of:

- An email service (Resend, Postmark, SendGrid) to notify you of new briefs
- Object storage (S3, R2, Vercel Blob, UploadThing) for attachments
- A scheduling tool link (Cal.com, Calendly) if you want direct booking

Drop credentials into `.env.local` and wire them into `app/api/book/route.ts`.
