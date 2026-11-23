import HeroSlider from "@/components/home/HeroSlider";
import SearchDock from "@/components/home/SearchDock";
import Intro from "@/components/home/Intro";
import Categories from "@/components/home/Categories";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import HowBooking from "@/components/home/HowBooking";
import HostGuarantee from "@/components/home/HostGuarantee";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <SearchDock />
      <Intro />
      <Categories />
      <FeaturedStudios />
      <HowBooking />
      <HostGuarantee />
    </main>
  );
}
