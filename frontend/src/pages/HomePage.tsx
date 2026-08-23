import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Manifesto from '../components/Manifesto';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-dark-base text-muted-light font-body">
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Portfolio />
        <Process />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
