import { NavbarComponent, Footer, Carousel, SearchForm, Airline } from "../components";

export default function Home() {
  return (
    <div>
      <NavbarComponent />
      <div className="mx-auto mt-6" id="promo-carousel-home">
        <Carousel />
      </div>
      <SearchForm />
      {/* <WhyUs /> */}
      {/* <Banner />   */}
      <Airline />
      <Footer />
    </div>
  );
}
