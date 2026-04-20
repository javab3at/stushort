import BookingForm from "./BookingForm";

export const metadata = {
  title: "Enquiries — Stu Short Photography",
  description:
    "Submit an enquiry regarding fine art prints, landscape commissions, editorial licensing or storm-chase media production."
};

export default function BookPage() {
  return (
    <section className="section">
      <div style={{ textAlign: "center" }}>
        <h2>Submit an enquiry</h2>
        <p style={{ color: "var(--muted)", maxWidth: 560, margin: "0 auto" }}>
          Please provide the details of your request below. Supporting
          material — written briefs, reference imagery, or mood boards — may
          be attached (up to 20MB in total). All enquiries are answered within
          two working days.
        </p>
        <p style={{ color: "var(--muted)", maxWidth: 560, margin: "0.75rem auto 0", fontSize: "0.9rem" }}>
          Direct enquiries: <a href="mailto:sales@stushort.com">sales@stushort.com</a>
        </p>
      </div>
      <BookingForm />
    </section>
  );
}
