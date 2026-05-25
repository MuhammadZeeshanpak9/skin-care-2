import Hero from '@/sections/home/Hero';
import TrustBar from '@/sections/home/TrustBar';
import HowItWorks from '@/sections/home/HowItWorks';
import Ingredients from '@/sections/home/Ingredients';
import FeaturedProducts from '@/sections/home/FeaturedProducts';
import MissionStatement from '@/sections/home/MissionStatement';
import WellnessEdit from '@/sections/home/WellnessEdit';
import BrandStory from '@/sections/home/BrandStory';
import Journal from '@/sections/home/Journal';
import FinalCTA from '@/sections/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Ingredients />
      <FeaturedProducts />
      <MissionStatement />
      <WellnessEdit />
      <BrandStory />
      <Journal />
      <FinalCTA />
    </>
  );
}
