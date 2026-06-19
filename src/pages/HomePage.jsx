import Categories from "../Components/Categories";
import Features from "../Components/Features";
import Hero from "../Components/Hero";
import ProductCards from "../Components/ProductCards";

const HomePage = () => {
  return (
    <>
      <Hero />
      <ProductCards isHome={true} />
      <Categories />
      <Features />
    </>
  );
};

export default HomePage;
