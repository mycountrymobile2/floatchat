import { InfiniteSlider } from "@/components/ui/infinite-slider"

const brands = [
  "TechFlow",
  "ScaleUp Co",
  "CloudFirst",
  "DataStream",
  "NextGen SaaS",
  "GrowthLab",
  "BuildFast",
  "StackHQ",
  "LaunchPad",
  "PivotPoint",
]

export function Logos() {
  return (
    <section className="relative py-14 lg:py-16 bg-gradient-to-b from-white via-[#F5F7FF] to-[#EEF2FF] overflow-hidden">
      {/* Soft ambient blobs to flow from hero */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 left-1/4 w-[420px] h-[300px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(closest-side, #A8C8FF 0%, transparent 70%)" }}
        />
        <div
          className="absolute -top-32 right-1/4 w-[420px] h-[300px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)" }}
        />
      </div>

      <div className="w-full">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500 px-6">
          Trusted by 12,000+ fast-growing US teams
        </p>

        <h2 className="mt-3 text-center font-medium text-xl tracking-tight text-[#0F2A4A] md:text-3xl whitespace-nowrap px-6">
          <span className="text-slate-500">Trusted by experts.</span>{" "}
          <span className="font-medium bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
            Used by the leaders.
          </span>
        </h2>

        <div className="mx-auto my-8 h-px max-w-md bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <InfiniteSlider gap={80} duration={30} durationOnHover={80}>
            {brands.map((name) => (
              <span
                key={name}
                className="text-lg md:text-xl font-medium tracking-tight text-slate-400 hover:text-[#0F2A4A] transition-colors duration-300 cursor-default select-none shrink-0"
              >
                {name}
              </span>
            ))}
          </InfiniteSlider>
        </div>

        <div className="mx-auto mt-8 h-px max-w-md bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </div>
    </section>
  )
}
