import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content (60% width on large screens) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight">
                Show your code today and{' '}
                <span className="italic">inspire others</span>{' '}
                every single day
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
                Showcase your work, share ideas, and connect with developers like you.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-medium hover:shadow-large">
                <span>Get Started Free</span>
                <ArrowRight size={20} />
              </button>
              <button className="border-2 border-secondary-300 hover:border-primary-400 text-secondary-700 hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 bg-white hover:bg-primary-50">
                <Play size={20} className="text-primary-500" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-8 border-t border-secondary-200">
              <p className="text-secondary-500 text-sm mb-4">Trusted by developers from</p>
              <div className="flex items-center space-x-6 opacity-60">
                <div className="text-2xl font-bold text-primary-600">500+</div>
                <div className="text-secondary-400">|</div>
                <div className="text-sm text-secondary-600">Companies</div>
                <div className="text-secondary-400">|</div>
                <div className="text-2xl font-bold text-primary-600">50K+</div>
                <div className="text-secondary-400">|</div>
                <div className="text-sm text-secondary-600">Developers</div>
              </div>
            </div>
          </div>

          {/* Right Column - Device Mockup (40% width on large screens) */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Device Frame */}
              <div className="relative bg-gradient-to-br from-secondary-800 to-secondary-900 rounded-3xl p-3 shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden w-80 h-96">
                  {/* Device Screen Content */}
                  <div className="h-full bg-gradient-to-br from-primary-50 to-secondary-100 p-6">
                    {/* Mockup Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">DC</span>
                        </div>
                        <div>
                          <div className="font-semibold text-secondary-800">DevConnect</div>
                          <div className="text-xs text-secondary-500">Online now</div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-error-500 rounded-full"></div>
                      </div>
                    </div>

                    {/* Mockup Content */}
                    <div className="space-y-4">
                      {/* Message Bubbles */}
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-secondary-300 rounded-full flex-shrink-0"></div>
                        <div className="bg-white rounded-2xl rounded-tl-md px-4 py-2 max-w-48">
                          <p className="text-sm text-secondary-700">Hey! How's the React project going?</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 justify-end">
                        <div className="bg-primary-500 rounded-2xl rounded-tr-md px-4 py-2 max-w-48">
                          <p className="text-sm text-white">Great! Just finished the component structure</p>
                        </div>
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex-shrink-0"></div>
                      </div>

                      <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-secondary-300 rounded-full flex-shrink-0"></div>
                        <div className="bg-white rounded-2xl rounded-tl-md px-4 py-2 max-w-40">
                          <p className="text-sm text-secondary-700">Awesome! Can't wait to see it</p>
                        </div>
                      </div>

                      {/* Typing Indicator */}
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-secondary-300 rounded-full flex-shrink-0"></div>
                        <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent-400 rounded-full opacity-80 animate-bounce-gentle"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary-300 rounded-full opacity-60 animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 