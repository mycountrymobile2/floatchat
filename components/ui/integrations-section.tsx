import { Button } from "@/components/ui/button"

const integrations = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://cdn-icons-png.flaticon.com/512/174/174857.png",
  "https://cdn-icons-png.flaticon.com/512/2111/2111615.png",
  "https://cdn-icons-png.flaticon.com/512/174/174872.png",
  "https://cdn-icons-png.flaticon.com/512/733/733547.png",
  "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
  "https://cdn-icons-png.flaticon.com/512/174/174855.png",
  "https://cdn-icons-png.flaticon.com/512/888/888853.png",
  "https://cdn-icons-png.flaticon.com/512/906/906324.png",
  "https://ruixen.com/ruixen_dark.png",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
  "https://cdn-icons-png.flaticon.com/512/732/732218.png",
  "https://cdn-icons-png.flaticon.com/512/5968/5968755.png",
  "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
  "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
  "https://cdn-icons-png.flaticon.com/512/5968/5968885.png",
  "https://cdn-icons-png.flaticon.com/512/2111/2111370.png",
]

export default function IntegrationsSection() {
  return (
    <section className="max-w-7xl mx-auto my-20 px-6 grid md:grid-cols-2 gap-10 items-center border border-gray-200 p-6 rounded-3xl">
      {/* Left */}
      <div>
        <p className="uppercase text-sm font-semibold text-gray-500">
          Components
        </p>
        <h2 className="text-5xl lg:text-7xl font-bold mt-2 mb-4">
          Supercharge your workflow
        </h2>
        <p className="text-gray-600 mb-6">
          Build sleek, responsive interfaces in record time with our carefully crafted React and Tailwind CSS components.
        </p>
        <div className="flex gap-4">
          <Button asChild className="bg-black text-white">
            <a href="https://ruixen.com/components" target="_blank" rel="noreferrer">
              Browse Components
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://ruixen.com" target="_blank" rel="noreferrer">
              View Documentation →
            </a>
          </Button>
        </div>
      </div>

      {/* Right */}
      <div className="grid grid-cols-6 gap-4">
        {integrations.map((url, idx) => (
          <div
            key={idx}
            className="relative w-16 h-16 p-2 bg-white shadow-sm border-2 border-gray-200 flex items-center justify-center overflow-hidden"
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
            }}
          >
            <img
              src={url}
              alt={`integration-${idx}`}
              className="w-full h-full object-contain p-1"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
