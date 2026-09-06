type ReadUnderConstructionProps = {
  title: string;
};

export default function ReadUnderConstruction({ title }: ReadUnderConstructionProps) {
  return (
    <section className="flex min-h-[calc(100vh-146px)] items-center justify-center bg-[#0D0F0E] px-6 text-center text-white">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0ed77e]">Under construction</p>
        <h1 className="mt-4 text-3xl font-semibold">{title}</h1>
      </div>
    </section>
  );
}
