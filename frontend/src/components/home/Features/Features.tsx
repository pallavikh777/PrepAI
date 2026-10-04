import FeatureCard from "./FeatureCard";
import { features } from "./featuresData";

function Features() {
  return (
    <section className="py-24 bg-slate-950">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-center text-5xl font-bold text-white">
          Powerful Features
        </h2>

        <p className="text-center text-slate-400 mt-6 max-w-2xl mx-auto">
          Everything you need to prepare for interviews using Artificial Intelligence.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;