import Header from "./components/Header";
import Hero from "./components/Hero";
import Carousel from "./components/Carousel";
import AiOverviews from "./components/AiOverviews";
import Entities from "./components/Entities";
import Industry from "./components/Industry";
import MarkupAudit from "./components/Markup";
import Lvmh from "./components/Lvmh";
import Scale from "./components/Scale";
import Method from "./components/Method";
import Next from "./components/Next";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Carousel />
      <AiOverviews />
      <MarkupAudit />
      <Industry />
      <Entities />
      <Lvmh />
      <Scale />
      <Method />
      <Next />
      <Footer />
    </div>
  );
}
