import TopMenu from "@/components/TopMenu";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#0D0F0E]">
      <TopMenu />
      <section className="mx-auto flex min-h-[calc(100vh-82px)] max-w-[1400px] items-center justify-center bg-[#f6f7f4] px-8 py-20">
        <div className="text-center">
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.35em] text-[#0aa965]">ARN SPACE</p>
          <h1 className="text-5xl font-bold tracking-tight text-[#172019]">ชุมชน</h1>
          <p className="mt-4 text-base text-[#172019]/55">พื้นที่แบ่งปันบทสนทนาและแรงบันดาลใจ</p>
        </div>
      </section>
    </main>
  );
}
