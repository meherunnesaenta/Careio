import Image from "next/image";
import Banner from "./components/home/Banner";
import About from "./components/home/About";
import Service from "./components/Service/Service";
import Heading from "./components/Heading/Heading";
import Coverage from "./components/home/Coverage";
export const metadata = {
  title: "Care - Home Care Services in Bangladesh",
  description: "Trusted home care, elderly care, and nursing services. Book professional caregivers easily in Dhaka, Narsingdi and all over Bangladesh.",
  openGraph: {
    title: "Care - Compassionate Care at Your Doorstep",
    description: "Expert caregivers for elderly, patients, and daily support.",
    images: [{ url: "https://i.ibb.co/4R7ypc78/image.png" }],
  },
};
export default function Home() {
  return (
    <div  className="grid grid-cols-1 gap-15">
      <Banner></Banner>
       <Heading>Our Best Service</Heading>
      <Service></Service>
      {/* <Coverage></Coverage> */}
      <About></About>
    </div>
  );
}
