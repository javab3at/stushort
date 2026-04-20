import Link from "next/link";
import { portfolio } from "@/lib/portfolio";
import Carousel from "./Carousel";
import LatestVideo from "./LatestVideo";

const featured = portfolio.slice(0, 4);
const archive = portfolio.slice(4);

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>
          Landscape &amp; severe-weather <br />
          <span className="accent">photography</span>.
        </h1>
        <p>
          Fine art prints, commissioned landscape work, and editorial licensing
          by Stu Short — a Northumberland-based landscape photographer and
          professional storm chaser.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link className="btn" href="/book">Enquire about a commission</Link>
          <Link className="btn btn-ghost" href="#work">View portfolio</Link>
        </div>
      </section>

      <section id="work" className="section">
        <h2>Featured</h2>
        <Carousel photos={featured} />
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <h2>Selected Work</h2>
        <div className="gallery">
          {archive.map((photo, i) => (
            <figure key={photo.src} className={i % 5 === 0 ? "wide" : undefined}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <figcaption>{photo.category}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <LatestVideo />

      <section id="about" className="section">
        <div className="about">
          <div>
            <h2>About</h2>
            <p>
              Stu Short is a landscape photographer and professional storm
              chaser based in Northumberland, United Kingdom. He graduated with
              a distinction in photography from the University of Sunderland
              and spent two decades working in animation and 3D modelling
              before returning to the medium full-time.
            </p>
            <p>
              Since 2018 he has chased severe weather across the United States
              with See Nature&apos;s Fury, documenting the 2017–18, 2019, 2022,
              2024 and 2025 seasons as driver and media producer. His UK work
              concentrates on the coastal, moorland and woodland landscapes of
              the North East, with a particular interest in the interplay
              between a landscape and the weather that defines it.
            </p>
            <p>
              His influences are drawn from the Romantic tradition — John
              Martin, Caspar David Friedrich and Albert Bierstadt — and his
              approach favours storms photographed in isolation, allowing the
              structure and scale of the subject to speak for itself.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://stushort.com/wp-content/uploads/2024/07/PXL_20240529_014030414.png"
            alt="Supercell photographed by Stu Short"
            style={{ width: "100%", borderRadius: "var(--radius)" }}
          />
        </div>
      </section>

      <section className="section">
        <h2>Services</h2>
        <div className="services">
          <div className="card">
            <h3>Fine Art Prints</h3>
            <p>
              Archival pigment prints produced in-studio on a Canon
              imagePrograf Pro 1000, drawn from the landscape, coastal and
              severe-weather portfolios. Editions available on request.
            </p>
          </div>
          <div className="card">
            <h3>Landscape Commissions</h3>
            <p>
              Private and corporate commissions across Northumberland, the
              Cheviot Hills, Kielder and further afield. Each commission is
              scoped to location, conditions and delivery format.
            </p>
          </div>
          <div className="card">
            <h3>Editorial &amp; Commercial Licensing</h3>
            <p>
              Storm, lightning and severe-weather imagery licensed for print,
              broadcast and digital use. UK and US archives available; rights
              packages tailored to usage and territory.
            </p>
          </div>
          <div className="card">
            <h3>Storm-chase Media Production</h3>
            <p>
              Stills, video and production services from active US chase
              seasons, delivered as driver and media producer for See
              Nature&apos;s Fury.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <h2>Enquiries.</h2>
        <p style={{ color: "var(--muted)", maxWidth: 560, margin: "0 auto 2rem" }}>
          For prints, commissions, licensing or collaboration enquiries, please
          submit a brief using the form below. All enquiries receive a
          response within two working days.
        </p>
        <Link className="btn" href="/book">Submit an enquiry</Link>
      </section>
    </>
  );
}
