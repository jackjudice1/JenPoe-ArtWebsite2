import Hero from "@/components/Hero";
import CollectionsGrid from "@/components/CollectionsGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import InstagramGallery from "@/components/InstagramGallery";
import Newsletter from "@/components/Newsletter";
import { getBestSellers, getNewArrivals } from "@/lib/utils";

export default function HomePage() {
  const bestSellers = getBestSellers(4);
  const newArrivals = getNewArrivals(4);

  return (
    <>
      <Hero />
      <CollectionsGrid />
      <WhyChooseUs />
      <FeaturedProducts
        eyebrow="Fan favorites"
        title="Best sellers"
        products={bestSellers}
        viewAllHref="/shop?sort=popularity"
      />
      <FeaturedProducts
        eyebrow="Just landed"
        title="New arrivals"
        products={newArrivals}
        viewAllHref="/shop?sort=newest"
      />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
