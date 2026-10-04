import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

function Hero() {
  return (
    <section className="min-h-screen bg-slate-950 flex items-center pt-24">

      <div className="max-w-7xl mx-auto px-8 py-12 grid lg:grid-cols-2 gap-20 items-center w-full">

        <HeroLeft />

        <HeroRight />

      </div>

    </section>
  );
}

export default Hero;