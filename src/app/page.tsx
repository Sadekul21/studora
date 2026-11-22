import HeroSlider from "@/components/home/HeroSlider";
import SearchDock from "@/components/home/SearchDock";
import Intro from "@/components/home/Intro";
import Categories from "@/components/home/Categories";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <SearchDock />
      <Intro />
      <Categories />
    </main>
  );
}
