import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Booking from "./components/Booking";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Reviews />
      <Booking />
      <Location />
      <Footer />
    </main>
  );
}
