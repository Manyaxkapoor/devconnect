import { createElement, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Code2, Compass, MessageCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero-mockup.jpg';

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
  useEffect(() => {
    if (window.location.hash === '#about') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        setTimeout(() => {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }, 100); // slight delay to ensure DOM is ready
      }
    }
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
                onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))}
              >
                Get Started <ArrowUpRight size={18} />
              </button>
              <button onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 bg-white text-black font-semibold py-3 px-6 rounded-full shadow-sm border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/30 transition-all duration-200" tabIndex={0} aria-label="Learn More">
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

const discoveryCards = [
  {
    number: '01',
    icon: Code2,
    title: 'Show the work',
    description: 'Turn side projects, experiments, and shipped products into a portfolio that feels unmistakably yours.',
    link: '/projects',
    action: 'Explore projects',
  },
  {
    number: '02',
    icon: Compass,
    title: 'Share the process',
    description: 'Post the useful lesson, the stubborn bug, or the tiny breakthrough that moved your build forward.',
    link: '/feed',
    action: 'Visit the feed',
  },
  {
    number: '03',
    icon: Users,
    title: 'Find your people',
    description: 'Let your ideas start conversations with developers who care about the same tools and problems.',
    link: '/profile',
    action: 'Build your profile',
  },
];

const DiscoverySection = () => (
  <section id="discover" className="bg-gray-950 py-20 text-white sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-14 flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-gray-500">
            <span className="h-2 w-2 rounded-full bg-blue-500" /> Built for builders
          </div>
          <h2 className="font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            More than a portfolio.<br />A place to <span className="font-normal italic text-gray-500">keep moving.</span>
          </h2>
        </div>
        <p className="max-w-sm text-base leading-7 text-gray-400">
          DevConnect gives the work behind your work somewhere to live—and someone new a reason to discover it.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {discoveryCards.map((card) => (
          <Link key={card.title} to={card.link} className="group flex min-h-[310px] flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] sm:p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-gray-600">{card.number}</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition group-hover:bg-white group-hover:text-black">
                {createElement(card.icon, { size: 19 })}
              </span>
            </div>
            <div className="mt-auto pt-12">
              <h3 className="font-display text-2xl font-bold tracking-tight">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-400">{card.description}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white">
                {card.action} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4">
        {[
          ['Build', 'in public'],
          ['Share', 'what you learn'],
          ['Connect', 'through craft'],
          ['Grow', 'one project at a time'],
        ].map(([verb, detail]) => (
          <div key={verb}>
            <div className="font-display text-xl font-bold">{verb}</div>
            <div className="mt-1 text-sm text-gray-500">{detail}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutSection = () => {
  // Scroll to top handler
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  // Open login modal handler (reuse from Hero)
  const openAuth = () => document.getElementById('get-started-btn')?.click();
  return (
    <section id="about" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <div className="group relative overflow-hidden rounded-[2rem] bg-gray-100 min-h-[440px]">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
            alt="Developers collaborating"
            className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
            onClick={scrollToTop}
          />
          <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-700 backdrop-blur">Made to be shared</div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-gray-500"><span className="h-2 w-2 rounded-full bg-blue-600" /> About DevConnect</div>
          <h2 className="font-display text-4xl font-bold tracking-[-0.04em] text-black sm:text-5xl">Good work gets better when it is <span className="font-normal italic text-gray-500">seen.</span></h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            DevConnect is a home for the full developer story—not only the polished launch, but the questions, decisions, and people that shaped it.
          </p>
          <div className="my-8 divide-y divide-gray-200 border-y border-gray-200">
            {[
              ['01', 'Create a profile with personality, not another résumé.'],
              ['02', 'Collect your projects in one focused, visual space.'],
              ['03', 'Share progress and meet people through the work itself.'],
            ].map(([number, text]) => (
              <div key={number} className="flex gap-5 py-4 text-sm leading-6 text-gray-600 transition hover:pl-2 hover:text-black">
                <span className="font-mono text-xs text-gray-400">{number}</span><span>{text}</span>
              </div>
            ))}
          </div>
          <button
            className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800"
            onClick={openAuth}
          >
            Join DevConnect <ArrowUpRight size={18} />
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
      <DiscoverySection />
      <AboutSection />
    </>
  );
}
