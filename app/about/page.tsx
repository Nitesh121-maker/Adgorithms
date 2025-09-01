export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-balance text-3xl font-bold tracking-tight">About Our AdTech Platform</h1>
        <p className="text-muted-foreground">
          We help brands deliver high-performing ads with transparent analytics and a delightful viewer experience.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">What we do</h2>
          <p className="text-muted-foreground">
            Our platform powers ad delivery, targeting, and measurement. Creatives render fast, look great, and respect
            user experience across devices.
          </p>
        </article>

        <article className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Why it matters</h2>
          <p className="text-muted-foreground">
            Advertisers gain clarity on performance while audiences see relevant, non-intrusive ads. Everyone wins.
          </p>
        </article>

        <article className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Core features</h2>
          <ul className="list-inside list-disc text-muted-foreground">
            <li>Attractive Ad Viewer with category filtering</li>
            <li>Insightful Analytics dashboard and charts</li>
            <li>Clean UI with accessible design tokens</li>
          </ul>
        </article>

        <article className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Our approach</h2>
          <p className="text-muted-foreground">
            We focus on performance, accessibility, and clear UX. Simple, fast, and trustworthy—both for teams and
            users.
          </p>
        </article>
      </div>

      <aside className="rounded-lg border bg-muted/30 p-6">
        <h3 className="mb-2 text-lg font-medium">Get in touch</h3>
        <p className="text-muted-foreground">
          Have feedback or ideas? We’d love to hear from you. Reach out and help us make ad experiences better.
        </p>
      </aside>
    </section>
  )
}
