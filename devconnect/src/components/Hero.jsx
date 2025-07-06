import { useState } from 'react';
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

  return (
    <section className="bg-white py-20 lg:py-32 font-sans">
      <style>{floatKeyframes}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-0">
          {/* Left Column */}
          <div className="w-full lg:w-3/5 flex flex-col justify-center">
            <h1 className="font-display font-bold text-black text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] mb-8">
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
            <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-xl">
              Showcase your work, share ideas, and connect with developers like you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="flex items-center gap-2 bg-black text-white font-semibold py-3 px-6 rounded-full shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black/50 transition-all duration-200"
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
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end mt-12 lg:mt-0 relative items-center">
            {/* Device mockup */}
            <div className="relative z-10 flex items-center">
              {/* Device frame */}
              <div className="w-[480px] h-[360px] rounded-[2.5rem] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-400 border border-gray-300 shadow-xl flex items-center justify-center">
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
    </section>
  );
};

const AboutSection = () => {
  const navigate = useNavigate();
  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-700 py-16">
      {/* Animated background gradient */}
      <div className="absolute inset-0 z-0 animate-gradient-move bg-gradient-to-tr from-black via-gray-800 to-gray-700 opacity-70" style={{filter: 'blur(40px)'}} />
      <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-stretch gap-0 md:gap-0">
        <div className="w-full md:w-[340px] flex-shrink-0 flex items-center justify-start">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
            alt="Developers collaborating"
            className="rounded-2xl shadow-2xl border-4 border-white transition-transform duration-300 hover:scale-105 cursor-pointer w-full h-[320px] object-cover md:object-cover md:h-full md:w-[320px]"
            style={{ boxShadow: '0 8px 40px 0 rgba(80,80,180,0.18), 0 1.5px 8px 0 rgba(80,80,180,0.10)' }}
            onClick={() => navigate('/')} // Go home on click
          />
        </div>
        <div className="flex-1 flex flex-col justify-center pl-0 md:pl-12 py-8 md:py-0">
          <h2
            className="text-3xl font-bold mb-4 text-white cursor-pointer hover:text-blue-400 transition-colors duration-200"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            About DevConnect
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-4" />
          <p className="text-xl text-gray-200 mb-4 leading-relaxed max-w-2xl">
            DevConnect is a modern platform for developers to showcase their work, share ideas, and connect with like-minded creators. Whether you're building your first project or launching your next big thing, DevConnect is your space to inspire and be inspired.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl">
            Join a vibrant community, discover new opportunities, and let your code speak for itself. We believe every developer has a story worth sharing—let's build the future together.
          </p>
        </div>
      </div>
      {/* Animated gradient keyframes */}
      <style>{`
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 8s ease-in-out infinite;
        }
      `}</style>
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