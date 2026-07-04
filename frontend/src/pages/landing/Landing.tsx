import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Statistics from "../../components/landing/Statistics";
import Features from "../../components/landing/Features";
import Workflow from "../../components/landing/Workflow";
import WhyTeamFlow from "../../components/landing/WhyTeamFlow";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Statistics />
      <Features />
      <Workflow />
      <WhyTeamFlow />
      <CTA />
      <Footer />
    </>
  );
};

export default Landing;