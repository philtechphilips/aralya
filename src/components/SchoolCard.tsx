import Image from "next/image";
import Link from "next/link";

interface SchoolCardProps {
  imageSrc: string;
  imageAlt: string;
  schoolName: string;
  location: string;
  tags: string[];
  priceRange: string;
}

const SchoolCard = ({
  imageSrc,
  imageAlt,
  schoolName,
  location,
  tags,
  priceRange,
}: SchoolCardProps) => {
  return (
    <div className="bg-[#F9FAFB] rounded-[16px] p-5">
      <div className="w-full h-[184px] rounded-[10px] overflow-hidden mb-3">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={100}
          height={100}
          className="w-full h-full rounded-[10px] object-cover"
        />
      </div>
      <h4 className="text-black text-lg font-medium">{schoolName}</h4>
      <div className="flex items-center gap-2 mt-5">
        <i className="ri-map-pin-line text-[#374151] text-lg"></i>
        <p className="text-base font-medium text-[#374151]">{location}</p>
      </div>
      <div className="flex mt-2.5 gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="border border-[#E5E7EB] rounded-full py-1 px-3 font-medium flex items-center justify-center"
          >
            <p className="text-sm text-[#374151]">{tag}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="bg-white rounded-full py-1 px-3 font-medium flex items-center justify-center w-fit">
          <p className="text-base text-[#774BE5]">{priceRange}</p>
        </div>
        <Link
          href="/directory/angioletto-preschool"
          className="bg-[#774BE5] w-fit text-white p-4 rounded-[10px] text-sm font-semibold flex items-center h-11.5"
        >
          View Info
        </Link>
      </div>
    </div>
  );
};

export default SchoolCard;
