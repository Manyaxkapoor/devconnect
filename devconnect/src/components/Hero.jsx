import { useState, useEffect } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import heroImg from '../assets/hero-mockup.jpg';
import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';

const floatKeyframes = `
@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes floatX {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}
`;

const Hero = () => {
  const [authOpen, setAuthOpen] = useState(false);

  // Listen for open-auth-modal event
  useEffect(() => {
    const handler = () => setAuthOpen(true);
    window.addEventListener('open-auth-modal', handler);
    return () => window.removeEventListener('open-auth-modal', handler);
  }, []);

  return (
    <section className="bg-white py-20 lg:py-32 font-sans">
      <style>{floatKeyframes}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-0">
          {/* Left Column */}
          <div className="w-full lg:w-3/5 flex flex-col justify-center animate-fade-in-up">
            <h1 className="font-display font-bold text-black text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] mb-8 transition-all duration-700 animate-slide-in-left">
              <span className="block bg-gradient-to-b from-gray-200 via-gray-500 to-black bg-clip-text text-transparent">
                Show your code
              </span>
              <span className="block">
                today and <span className="italic font-normal">inspire</span>
              </span>
              <span className="block">
                <span className="italic font-normal">others</span> every
              </span>
              <span className="block">single day</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-xl animate-fade-in-up delay-200">
              Showcase your work, share ideas, and connect with developers like you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <button
                id="get-started-btn"
                className="flex items-center gap-2 bg-black text-white font-semibold py-3 px-6 rounded-full shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black/50 transition-all duration-200 text-lg"
                tabIndex={0}
                aria-label="Get Started"
                onClick={() => setAuthOpen(true)}
              >
                Get Started <ArrowUpRight size={18} />
              </button>
              <button className="flex items-center gap-2 bg-white text-black font-semibold py-3 px-6 rounded-full shadow-sm border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/30 transition-all duration-200" tabIndex={0} aria-label="Learn More">
                Learn More
              </button>
            </div>
          </div>
          {/* Right Column - Modern Tablet Mockup */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end mt-12 lg:mt-0 relative items-center animate-slide-in-right">
            {/* Device mockup */}
            <div className="relative z-10 flex items-center group">
              {/* Device frame */}
              <div className="w-[480px] h-[360px] rounded-[2.5rem] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-400 border border-gray-300 shadow-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:-rotate-2">
                {/* Screen area */}
                <div className="w-[430px] h-[312px] rounded-[2rem] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-inner overflow-hidden flex items-center justify-center">
                  {/* Screen content (hero image) */}
                  <img
                    src={heroImg}
                    alt="Tablet device showing code preview"
                    className="object-cover w-full h-full rounded-[1.7rem] opacity-90"
                  />
                </div>
              </div>
              {/* Subtle shadow below device */}
              <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 w-96 h-10 bg-black/20 rounded-full blur-md z-0" aria-hidden="true" />
            </div>
            {/* Floating message bubbles */}
            <div className="hidden lg:block">
              {/* Top left message */}
              <div className="absolute -top-8 left-8 bg-white shadow-lg rounded-xl px-4 py-2 flex items-center gap-2 animate-fade-in z-20 border border-gray-200" style={{animation: 'floatY 3.5s ease-in-out infinite'}}>
                <MessageCircle size={18} className="text-primary-500" />
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Nice work!</span>
              </div>
              {/* Bottom right message */}
              <div className="absolute bottom-6 -right-24 bg-primary-600 text-white shadow-lg rounded-xl px-4 py-2 flex items-center gap-2 animate-slide-up z-20 border border-primary-700" style={{animation: 'floatX 4s 1s ease-in-out infinite'}}>
                <span className="text-sm font-medium whitespace-nowrap">Let's connect!</span>
                <MessageCircle size={18} className="text-white" />
              </div>
              {/* Top right message - moved down to overlap image, floating */}
              <div className="absolute top-14 right-13 bg-white shadow-md rounded-xl px-4 py-2 flex items-center gap-2 animate-fade-in z-20 border border-gray-200" style={{animation: 'floatY 4.2s 0.5s ease-in-out infinite'}}>
                <MessageCircle size={18} className="text-accent-500" />
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Crazzyy!</span>
              </div>
              {/* Left center message - touching the image, floating */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-2 bg-secondary-100 shadow rounded-xl px-4 py-2 flex items-center gap-2 animate-slide-up z-20 border border-secondary-200" style={{animation: 'floatX 3.8s 0.7s ease-in-out infinite'}}>
                <MessageCircle size={18} className="text-secondary-600" />
                <span className="text-sm font-medium text-secondary-700 whitespace-nowrap">Great project!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(.4,2,.6,1) both;
        }
        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s cubic-bezier(.4,2,.6,1) both;
        }
        @keyframes slide-in-right {
          0% { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s cubic-bezier(.4,2,.6,1) both;
        }
      `}</style>
    </section>
  );
};

const AboutSection = () => {
  const navigate = useNavigate();
  // Scroll to top handler
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  // Open login modal handler (reuse from Hero)
  const openAuth = () => document.getElementById('get-started-btn')?.click();
  return (
    <section id="about" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-stretch gap-0 md:gap-12">
        <div className="w-full md:w-[420px] flex-shrink-0 flex items-center justify-center md:justify-start mb-8 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
            alt="Developers collaborating"
            className="rounded-2xl shadow-lg border border-gray-200 w-full h-[400px] object-cover md:w-[380px] md:h-[400px] transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            style={{ maxWidth: 420, background: '#f8f8f8', fontFamily: 'Inter, sans-serif' }}
            onClick={scrollToTop}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center pl-0 md:pl-16">
          <h2
            className="text-4xl font-extrabold text-black tracking-tight mb-6 transition-all duration-300 cursor-pointer hover:text-blue-700 hover:-translate-y-1"
            style={{ letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}
            onClick={scrollToTop}
          >
            ABOUT DEVCONNECT
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed max-w-2xl font-normal">
            DevConnect is a modern platform for developers to showcase their work, share ideas, and connect with like-minded creators. Whether you're building your first project or launching your next big thing, DevConnect is your space to inspire and be inspired.
          </p>
          <p className="text-base text-gray-500 max-w-2xl font-normal mb-8">
            Join a vibrant community, discover new opportunities, and let your code speak for itself. We believe every developer has a story worth sharing—let's build the future together.
          </p>
          <button
            className="inline-block bg-black text-white font-semibold py-3 px-8 rounded-full shadow hover:bg-gray-900 transition-all duration-200 text-lg"
            onClick={openAuth}
          >
            Get Started
          </button>
        
        </div>
      </div>
    </section>
  );
};

export default function HeroWithAbout() {
  return (
    <>
      <Hero />
      <AboutSection />
    </>
  );
} 