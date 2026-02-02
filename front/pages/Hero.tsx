// 'use client';

// import { Play, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// const Hero = () => {
//   const user = null

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       <Image
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         src={'/hero-bg.jpg'}
//         fill
//         alt="Cinema Background"
//       />

//       <div className="absolute inset-0 bg-linear-to-r from-[hsl(240_10%_4%)] via-[hsl(240_10%_4%/0.8)] to-transparent" />
//       <div className="absolute inset-0 bg-linear-to-t from-[hsl(240_10%_4%)] via-transparent to-[hsl(240_10%_4%/0.5)]" />

//       <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[hsl(0_72%_51%/0.2)] rounded-full blur-[120px] -translate-y-1/2" />

//       <div className="relative z-10 container mx-auto px-6 py-20">
//         <div className="max-w-3xl animate-slide-up">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8">
//             <span className="w-2 h-2 bg-[hsl(0_72%_51%)] rounded-full animate-pulse" />
//             <span className="text-sm text-[hsl(240_5%_65%)]">Over 10,000+ Movies to Explore</span>
//           </div>

//           <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
//             Discover Your Next{" "}
//             <span className="text-gradient">Favorite Movie</span>
//           </h1>

//           <p className="text-xl md:text-2xl text-[hsl(240_5%_65%)] mb-10 max-w-2xl leading-relaxed">
//             Watch, Rate, and Get Personalized Recommendations tailored to your unique taste in cinema.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4">
//             {user ? (
//               <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-semibold ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[hsl(0_72%_51%)] text-[hsl(0_0%_100%)] hover:bg-[hsl(0_72%_51%/0.9)] group px-8 py-6 animate-pulse-glow">
//                 <Play className="w-5 h-5 mr-2 fill-current" />
//                 Start Watching
//                 <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
//               </button>
//             ) : (
//               <Link href="/signup">
//                 <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-semibold ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[hsl(0_72%_51%)] text-[hsl(0_0%_100%)] hover:bg-[hsl(0_72%_51%/0.9)] group px-8 py-6 animate-pulse-glow">
//                   <Play className="w-5 h-5 mr-2 fill-current" />
//                   Sign Up Free
//                   <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
//                 </button>
//               </Link>
//             )}

//             <Link href="/movies" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-semibold ring-offset-[hsl(240_10%_4%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0_72%_51%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[hsl(240_5%_18%/0.5)] bg-[hsl(240_10%_4%)] hover:bg-[hsl(240_5%_16%)] hover:text-[hsl(240_10%_4%)] hover:border-[hsl(0_72%_51%/0.5)] px-8 py-6">
//               Browse Movies
//             </Link>
//           </div>
//         </div>
//       </div>

//     </section>
//   );
// };

// export default Hero;


// // import React from 'react';
// // import { Play, ChevronRight } from 'lucide-react';
// // import Image from 'next/image';

// // const Hero: React.FC = () => {
// //   return (
// //     <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
// //       {/* Background Image with Overlays */}
// //       <div className="absolute inset-0 z-0">
// //         <Image
// //           src="/hero-bg.jpg"
// //           alt="Cinema Background"
// //           fill
// //           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
// //         />
// //         <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
// //         <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
// //       </div>

// //       <div className="relative z-10 max-w-6xl px-6 text-center">
// //         <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
// //           <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
// //           <span className="text-xs font-bold tracking-widest uppercase text-gray-200">New AI Model Available</span>
// //         </div>

// //         <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight mb-6">
// //           Discover Your Next <br />
// //           <span className="text-gradient">Favorite Movie</span>
// //         </h1>

// //         <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
// //           Watch, rate, and get hyper-personalized recommendations powered by our
// //           advanced cinematic machine learning engine.
// //         </p>

// //         <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
// //           <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all active:scale-95">
// //             <Play className="w-5 h-5 fill-current" />
// //             <span>Browse Movies</span>
// //           </button>
// //           <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all group">
// //             <span>Sign Up Free</span>
// //             <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Bottom fade */}
import { Play, ChevronRight, TrendingUp, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GetUser } from "@/lib/getUser";

const Hero = () => {
  const user = GetUser();
  
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-start overflow-hidden">
      <Image
        src="/hero-bg.jpg"
        alt="Hero Background"
        fill
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
      />

      {/* Dynamic Gradients for readability */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 animate-slide-up space-y-6 md:space-y-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-effect">
            <TrendingUp className="w-4 h-4 text-rose-500" />
            <span className="text-xs md:text-sm font-medium text-gray-200">
              Over 10,000+ Movies to Explore
            </span>
          </div>

          {/* Headline - Downsized for better spacing */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white">
              Discover Your Next<br />
              <span className="text-gradient">Favorite Story</span>
            </h1>
          </div>

          {/* Description - Optimized for readability */}
          <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed">
            Immerse yourself in thousands of award-winning titles. Get intelligent recommendations based on your viewing habits and cinematic preferences.
          </p>

          {/* Primary Actions - Downsized buttons to fit more content */}
          <div className="flex flex-wrap gap-4">
            {user ? (
              <Link
                href={'/movies'}
                className="inline-flex items-center justify-center hover:cursor-pointer gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-rose-600/20 group"
              >
                <Play className="w-5 h-5 fill-current" />
                Resume Watching
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link href="/signup">
                <button
                  className="inline-flex items-center justify-center hover:cursor-pointer gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-rose-600/20 group"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Sign Up Free
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            )}
            <Link href="/movies">
            <button className="inline-flex items-center hover:cursor-pointer justify-center gap-2 px-6 py-3 glass-effect hover:bg-white/10 text-white rounded-lg font-semibold transition-all">
              <Search className="w-4 h-4" />
              Browse Catalog
            </button>
            </Link>
          </div>
        </div>

        {/* <div className="hidden lg:block flex-1 animate-slide-up [animation-delay:200ms]">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-rose-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative glass-effect rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Trending Recommendations</h3>
                <span className="text-xs text-rose-500 font-bold uppercase">Live</span>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Dune: Part Two", genre: "Sci-Fi", rating: "9.2" },
                  { title: "Oppenheimer", genre: "History", rating: "8.9" },
                  { title: "The Bear", genre: "Drama", rating: "9.5" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group/item">
                    <div className="w-12 h-16 bg-gray-800 rounded overflow-hidden">
                      <img src={`https://picsum.photos/seed/${idx + 10}/100/150`} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold group-hover/item:text-rose-400 transition-colors">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.genre}</div>
                    </div>
                    <div className="text-xs font-bold text-yellow-500 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> {item.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};
export default Hero;