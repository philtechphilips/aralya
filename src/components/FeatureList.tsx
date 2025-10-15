interface FeatureItem {
  icon: string;
  text: string;
}

interface FeatureListProps {
  title: string;
  features: FeatureItem[];
}

const FeatureList = ({ title, features }: FeatureListProps) => {
  return (
    <div className="w-full md:w-[55%]">
      <h4 className="text-[#0E1C29] font-semibold md:text-2xl text-lg mb-2">{title}</h4>
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3 mt-6">
          <i className={`${feature.icon} text-2xl text-[#774BE5]`}></i>
          <p className="text-[#0E1C29] font-semibold md:text-lg text-base">{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
