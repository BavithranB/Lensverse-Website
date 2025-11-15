// app/contact/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getContent } from "@/lib/content";

export const metadata = {
  title: "Contact | Lensverse",
  description: "Connect with Lensverse founders for bookings, collaborations, and creative projects."
};

export default function ContactPage() {
  const content = getContent();
  const founders = content.about.team || [];
  const c = content.contact || {};

  return (
    <main className="min-h-screen pt-28 pb-16 bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-neutral-300 mt-3">
            Connect with our founders or reach the Lensverse studio directly.
          </p>
        </header>

        {/* Founders */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {founders.map((f: any) => (
            <div
              key={f.name}
              className="rounded-2xl border border-white/10 bg-black/40 p-6 flex flex-col items-center text-center hover:border-red-600 transition"
            >
              <div className="relative h-28 w-28 rounded-full overflow-hidden border border-white/10 mb-4">
                <Image src={f.photo} alt={f.name} fill className="object-cover" />
              </div>

              <h2 className="text-xl font-semibold">{f.name}</h2>
              <p className="text-red-500 mb-4">{f.title}</p>

              <p className="text-sm text-neutral-300 mb-2">{f.email}</p>
              <p className="text-sm text-neutral-300 mb-2">{f.phone}</p>

              <div className="flex gap-4 mt-3">
                <Link href={f.linkedin} target="_blank" className="hover:text-red-500">
                  LinkedIn →
                </Link>
                <Link href={f.instagram} target="_blank" className="hover:text-red-500">
                  Instagram →
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Company Info */}
        <section className="rounded-2xl border border-white/10 bg-black/40 p-8 text-center">
          <h3 className="text-2xl font-semibold mb-6">Lensverse Studio</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg border border-white/10 bg-neutral-800/40 p-4">
              <div className="text-sm text-neutral-400">Email</div>
              <a href={`mailto:${c.companyEmail}`} className="font-medium hover:text-red-500">
                {c.companyEmail}
              </a>
            </div>

            <div className="rounded-lg border border-white/10 bg-neutral-800/40 p-4">
              <div className="text-sm text-neutral-400">Phone</div>
              <p className="font-medium">{c.phone}</p>
            </div>

            <div className="rounded-lg border border-white/10 bg-neutral-800/40 p-4">
              <div className="text-sm text-neutral-400">Address</div>
              <p className="font-medium">{c.address}</p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            >
              Book a Shoot
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
