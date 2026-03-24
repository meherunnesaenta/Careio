import Image from "next/image";
import Banner from "./components/home/Banner";
import About from "./components/home/About";
import Service from "./components/Service/Service";
import Heading from "./components/Heading/Heading";


export default function Home() {
  return (
    <div  className="grid grid-cols-1 gap-15">
      <Banner></Banner>
       <Heading>Our Best Service</Heading>
      <Service></Service>
      <About></About>
    </div>
  );
}
