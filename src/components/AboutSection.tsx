import Image from "next/image";
import FeatureList from "./FeatureList";

interface FeatureItem {
  icon: string;
  text: string;
}

interface AboutSectionProps {
  title: string;
  description: string;
  featureTitle: string;
  features: FeatureItem[];
  imageSrc: string;
  imageAlt: string;
}

const AboutSection = ({
  title,
  description,
  featureTitle,
  features,
  imageSrc,
  imageAlt,
}: AboutSectionProps) => {
  return (
    <section className="w-full flex flex-col items-center md:px-10 px-5 py-25 bg-white">
      <h2 className="text-[#0E1C29] md:text-[56px] text-4xl font-normal text-center">
        {title}
      </h2>
      <div className="w-full md:w-[800px]">
        <p className="mt-4 text-[#0E1C29] text-sm text-center font-normal">
          {description}
        </p>
      </div>
      <div className="w-full flex md:flex-row flex-col items-center gap-5 mt-12">
        <FeatureList title={featureTitle} features={features} />
        <div className="w-full md:w-[45%] h-100 rounded-[20px] overflow-hidden">
          <Image
            src={imageSrc}
            width={400}
            height={360}
            alt={imageAlt}
            className="w-full h-full rounded-[20px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
