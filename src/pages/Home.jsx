import { AboutUs } from "../components/AboutUs"
import { Gallery } from "../components/Gallery"
import { HeroSection } from "../components/HeroSection"
import { HomeFooter } from "../components/HomeFooter"
import NavbarHome from "../components/NavbarHome"
import { Services } from "../components/Services"
import { TestiMain } from "../components/TestiMain"

export const Home = () => {
  return(
    <>
      <NavbarHome/>
      <section id="home">
        <HeroSection/>
      </section>
      <section id="about">
        <AboutUs/>
      </section>
      <section id="service">
        <Services/>
      </section>
      <section id="gallery" >
        <Gallery/>
      </section>
      <section id="testi">
        <TestiMain />
      </section>
      <HomeFooter/>
    </>
  )
}