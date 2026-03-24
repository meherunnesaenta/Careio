import Image from "next/image";
import Banner from "./components/home/Banner";
import About from "./components/home/About";


export default function Home() {
  return (
    <div  className="grid grid-cols-1 gap-15">
      <Banner></Banner>
      <About></About>
    </div>
  );
}
