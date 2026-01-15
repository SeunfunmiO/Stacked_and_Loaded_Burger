import { Suspense } from "react";
import Deliveryorder from "./components/delivery-order";
import Featuredsection from "./components/featured-section";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { NavigationMenuDemo } from "./components/Navbar";
import Loading from "./loading";



export default function Home() {
  return (
    <div
      className=" bg-white font-sans dark:bg-black h-screen"
    >
      <div
        className="pt-5"
      >
        <Suspense fallback={<Loading />}>
          <NavigationMenuDemo />
          <Hero />
          <Featuredsection />
          <Deliveryorder />
          <Footer />
        </Suspense>
      </div>

    </div>
  );
}
