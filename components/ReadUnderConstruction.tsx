type ReadUnderConstructionProps = {
  title: string;
};

export default function ReadUnderConstruction({ title }: ReadUnderConstructionProps) {
  return (
    <section className="flex min-h-[calc(100vh-146px)] items-center justify-center bg-arn-canvas px-6 text-center text-arn-text">
      <div>
        <p className="text-ds-body-sm font-semibold uppercase tracking-[0.3em] text-arn-accent-strong">Under construction</p>
        <h1 className="mt-4 text-3xl font-semibold">{title}</h1>
      </div>
    </section>
  );
}
