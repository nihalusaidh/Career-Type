import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { seoPages } from "./seo-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = seoPages.find((p) => p.slug === slug);
  if (!page) return { title: "Page Not Found" };

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: `${page.title} | CareerType`,
      description: page.description,
      url: `https://careertype.app/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
    alternates: {
      canonical: `https://careertype.app/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export default async function SEOPage({ params }: Props) {
  const { slug } = await params;
  const page = seoPages.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[var(--ct-text-secondary)] mb-8">
        <Link href="/" className="hover:text-[var(--ct-text)]">Home</Link>
        <span>/</span>
        <span className="text-[var(--ct-text)] capitalize">{page.title}</span>
      </nav>

      <article>
        <h1 className="text-3xl font-bold text-[var(--ct-text)] mb-4">
          {page.h1}
        </h1>
        <div className="prose prose-invert max-w-none">
          {page.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-[var(--ct-text-secondary)] leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-[var(--ct-card)] border border-[var(--ct-border)]">
          <h2 className="font-semibold text-[var(--ct-text)] mb-3">
            Start Practicing {page.careerName} Typing
          </h2>
          <p className="text-sm text-[var(--ct-text-secondary)] mb-4">
            {page.description}
          </p>
          <Link
            href={page.ctaLink}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--ct-accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start {page.careerName} Practice
          </Link>
        </div>

        {/* Internal links */}
        <div className="mt-8">
          <h2 className="font-semibold text-[var(--ct-text)] mb-3">
            Related Practice Modes
          </h2>
          <div className="flex flex-wrap gap-2">
            {page.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--ct-card)] border border-[var(--ct-border)] text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: page.h1,
              description: page.description,
              url: `https://careertype.app/${slug}`,
            }),
          }}
        />
      </article>
    </div>
  );
}
