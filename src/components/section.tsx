import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-5 ${className}`}>{children}</div>;
}

export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker?: string;
  title: string;
  lede?: ReactNode;
}) {
  return (
    <section className="border-b hairline">
      <Container className="py-14 md:py-20">
        {kicker && <div className="kicker mb-4">{kicker}</div>}
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight max-w-3xl">{title}</h1>
        {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
      </Container>
    </section>
  );
}

export function Section({
  title,
  kicker,
  children,
  className = "",
  id,
}: {
  title?: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-12 md:py-16 ${className}`}>
      <Container>
        {kicker && <div className="kicker mb-3">{kicker}</div>}
        {title && <h2 className="text-2xl md:text-3xl font-medium mb-6">{title}</h2>}
        {children}
      </Container>
    </section>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`panel p-6 md:p-7 ${className}`}>{children}</div>;
}
