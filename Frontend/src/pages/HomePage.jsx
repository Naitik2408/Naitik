import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import HeroSection from "../components/Home/HeroSection";
import AboutSection from "../components/Home/AboutSection";
import SkillsSection from "../components/Home/SkillsSection";
import ProjectsSection from "../components/Home/ProjectsSection";
import ResumeSection from "../components/Home/ResumeSection";
import ContactSection from "../components/Home/ContactSection";
import ActivitySection from "../components/Home/ActivitySection";

function HomePage() {
  console.log("HomePage component rendered");
  console.log("api url: ", import.meta.env.VITE_API_URL);

  return (
    <div className="min-h-screen relative">
      {/* Main background elements that span the entire page */}
      <div className="hidden md:block fixed inset-0 homepage-background"></div>
      <div className="hidden md:block fixed inset-0 homepage-grid-overlay"></div>
      <div className="hidden md:block fixed homepage-glow glow-cyan top-1/4 left-1/4"></div>
      <div className="hidden md:block fixed homepage-glow glow-fuchsia bottom-1/3 right-1/4"></div>
      <div className="hidden md:block fixed homepage-glow glow-blue top-2/3 left-1/3"></div>
      
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <ActivitySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;