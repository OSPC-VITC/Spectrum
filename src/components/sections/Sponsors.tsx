"use client";
import Image from "next/image";


type Sponsor = {
  src: any;
  alt: string;
};

const goldSponsors: Sponsor[] = [
  { src: '/img/Logo/Devfolio_Logo-White.png', alt: "DEVFOLIO LOGO" },
  { src: '/img/Logo/devdock.png', alt: "DEVDOCK LOGO" },
  { src: '/img/Logo/llmware.png', alt: "LLMWARE AI LOGO" },
];

const silverSponsors: Sponsor[] = [
  { src: '/img/Logo/polygonlogo', alt: "POLYGON LOGO" },
  { src: '/img/Logo/aptos', alt: "APTOS LOGO" },
  { src: '/img/Logo/ethindialogo', alt: "ETHINDIA LOGO" },
];

const bronzeSponsors: Sponsor[] = [
  { src: '/img/Logo/appwritelogo', alt: "AppWrite" },
  { src: '/img/Logo/interviewbuddy', alt: "INTERVIEW BUDDY LOGO" },
  { src: '/img/Logo/xyz.png', alt: "XYZ LOGO" },
];

const SponsorSection = ({ title, sponsors, textColor }: { title: string; sponsors: Sponsor[]; textColor: string }) => {
  return (
    <div className="text-center mt-8">
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="p-4 bg-[#1a1a1a] rounded-lg flex justify-center items-center transition-transform transform hover:-translate-y-2 shadow-md shadow-white/20 hover:shadow-lg hover:shadow-white/50"
          >
            <Image
              src={sponsor.src}
              alt={sponsor.alt}
              width={150}
              height={150}
              className="drop-shadow-lg min-w-[100px] max-w-[150px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Sponsors() {
  return (
    <div className="bg-inherit text-white py-7">
      <SponsorSection title="Gold Sponsors" sponsors={goldSponsors} textColor="text-yellow-400" />
      <SponsorSection title="Silver Sponsors" sponsors={silverSponsors} textColor="text-gray-300" />
      <SponsorSection  title="Bronze Sponsors" sponsors={bronzeSponsors} textColor="text-orange-600" />
    </div>
  );
}
