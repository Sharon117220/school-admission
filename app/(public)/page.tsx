import Hero from "./components/Hero";
import AdmissionsFaq from "./components/AdmissionsFaq";
import Stats from "./components/Stats";
import About from "./components/About";
import Programs from "./components/Programs";
import AdmissionForm from "./components/AdmissionForm";
import Contact from "./components/Contact";
import SwiperSlider from "./components/SwiperSlider";

export default function Home() {
  return (
    <>
      <Hero />
      <SwiperSlider />
      <Stats />

      <About header="About Our School" />
      <Programs />
      <AdmissionsFaq />
      <AdmissionForm />
      <Contact />
    </>
  );
}
