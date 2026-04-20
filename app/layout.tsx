import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./Logo";

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(!t||!['fun','dark','metallic'].includes(t))t='dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export const metadata: Metadata = {
  title: "Stu Short Photography — Landscape & severe-weather photography",
  description:
    "Fine art prints, landscape commissions and editorial licensing by Stu Short: a Northumberland-based landscape photographer and professional storm chaser."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <header className="site-header">
          <Link href="/" className="brand" aria-label="Stu Short Photography — home">
            <Logo />
          </Link>
          <nav className="nav">
            <Link href="/#work">Work</Link>
            <Link href="/#about">About</Link>
            <Link href="/book">Book</Link>
            <ThemeSwitcher />
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Stu Short Photography · Northumberland, UK</span>
          <span className="footer-links">
            <a href="mailto:sales@stushort.com">sales@stushort.com</a>
            <a href="https://www.instagram.com/stushortphotography" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/stushortphotography" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.youtube.com/channel/UCbqvSjdnrbWcQwPNdSGeN0g" target="_blank" rel="noopener noreferrer">YouTube</a>
          </span>
        </footer>
      </body>
    </html>
  );
}
