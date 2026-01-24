
import React from 'react';
import { Tv, Sparkles, TrendingUp, Play, Flame, Trophy, Ghost, Heart, Rocket, User } from 'lucide-react';
import { Movie, Feature } from './types';

const LOREM_SYNOPSIS = "In a world where destiny is forged in the shadows, one hero must rise above the chaos. This cinematic masterpiece explores the boundaries of human emotion, blending high-stakes action with a deeply personal journey of discovery and redemption.";

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: "Interstellar Voyage",
    rating: 9.2,
    genre: "Sci-Fi",
    year: 2024,
    imageUrl: "https://picsum.photos/seed/movie1/400/600",
    backdropUrl: "https://picsum.photos/seed/movie1-back/1920/1080",
    synopsis: "A team of explorers travel beyond this galaxy to discover whether mankind has a future among the stars.",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    duration: "2h 49min"
  },
  {
    id: 2,
    title: "The Silent Forest",
    rating: 8.5,
    genre: "Thriller",
    year: 2023,
    imageUrl: "https://picsum.photos/seed/movie2/400/600",
    backdropUrl: "https://picsum.photos/seed/movie2-back/1920/1080",
    synopsis: "In a quiet town, a local mystery unravels as residents discover the forest holds secrets that have been buried for centuries.",
    cast: ["Emily Blunt", "John Krasinski", "Millicent Simmonds"],
    duration: "1h 30min"
  },
  {
    id: 3,
    title: "Midnight in Tokyo",
    rating: 8.9,
    genre: "Drama",
    year: 2024,
    imageUrl: "https://picsum.photos/seed/movie3/400/600",
    backdropUrl: "https://picsum.photos/seed/movie3-back/1920/1080",
    synopsis: "Two strangers find themselves crossing paths in the neon-lit streets of Tokyo, leading to a night of unexpected connection.",
    cast: ["Scarlett Johansson", "Bill Murray", "Giovanni Ribisi"],
    duration: "1h 42min"
  },
  {
    id: 4,
    title: "Neon Knights",
    rating: 7.8,
    genre: "Action",
    year: 2024,
    imageUrl: "https://picsum.photos/seed/movie4/400/600",
    backdropUrl: "https://picsum.photos/seed/movie4-back/1920/1080",
    synopsis: "In a dystopian future, a mercenary takes on a job that threatens to bring down the corporate overlords of Neo-San Francisco.",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    duration: "2h 10min"
  },
  {
    id: 5,
    title: "Echoes of the Past",
    rating: 9.0,
    genre: "Mystery",
    year: 2023,
    imageUrl: "https://picsum.photos/seed/movie5/400/600",
    backdropUrl: "https://picsum.photos/seed/movie5-back/1920/1080",
    synopsis: "A historian uncovers a collection of letters that point to a grand conspiracy that changed the course of the 20th century.",
    cast: ["Tom Hanks", "Meryl Streep", "Sarah Paulson"],
    duration: "1h 56min"
  },
  {
    id: 6,
    title: "Lost Horizon",
    rating: 8.2,
    genre: "Adventure",
    year: 2024,
    imageUrl: "https://picsum.photos/seed/movie6/400/600",
    backdropUrl: "https://picsum.photos/seed/movie6-back/1920/1080",
    synopsis: "A group of mountaineers embark on an expedition to find a legendary city hidden deep within the Himalayas.",
    cast: ["Jake Gyllenhaal", "Jason Clarke", "Josh Brolin"],
    duration: "2h 15min"
  }
];

export const NOW_PLAYING_MOVIES: Movie[] = [
  {
    id: 10,
    title: "The Last Frontier",
    rating: 8.7,
    genre: "Western",
    year: 2025,
    imageUrl: "https://picsum.photos/seed/np1/800/450",
    backdropUrl: "https://picsum.photos/seed/np1-back/1920/1080",
    synopsis: "A lawman in the untamed West must protect a small town from a ruthless gang of outlaws.",
    cast: ["Kevin Costner", "Sam Elliott", "Tim McGraw"],
    duration: "2h 20min"
  },
  {
    id: 11,
    title: "Deep Blue Resonance",
    rating: 9.1,
    genre: "Documentary",
    year: 2025,
    imageUrl: "https://picsum.photos/seed/np2/800/450",
    backdropUrl: "https://picsum.photos/seed/np2-back/1920/1080",
    synopsis: "An immersive journey into the deepest parts of the ocean, exploring creatures never before seen by human eyes.",
    cast: ["David Attenborough"],
    duration: "1h 28min"
  },
  {
    id: 12,
    title: "Velocity Shift",
    rating: 8.4,
    genre: "Action",
    year: 2025,
    imageUrl: "https://picsum.photos/seed/np3/800/450",
    backdropUrl: "https://picsum.photos/seed/np3-back/1920/1080",
    synopsis: "A getaway driver finds himself at the center of a high-speed heist that goes horribly wrong.",
    cast: ["Vin Diesel", "Paul Walker", "Michelle Rodriguez"],
    duration: "2h 05min"
  },
  {
    id: 13,
    title: "Shadow Protocol",
    rating: 8.8,
    genre: "Spy Thriller",
    year: 2025,
    imageUrl: "https://picsum.photos/seed/np4/800/450",
    backdropUrl: "https://picsum.photos/seed/np4-back/1920/1080",
    synopsis: "An elite spy must go rogue to clear his name after being framed for a cyberattack on global infrastructure.",
    cast: ["Tom Cruise", "Rebecca Ferguson", "Simon Pegg"],
    duration: "2h 30min"
  }
];

export const ALL_MOVIES = [...MOVIES, ...NOW_PLAYING_MOVIES];

export const UPCOMING_MOVIES = [
  {
    id: 7,
    title: "Cyberspace: Resurgence",
    releaseDate: "June 12, 2025",
    imageUrl: "https://picsum.photos/seed/up1/400/600"
  },
  {
    id: 8,
    title: "The Last Alchemist",
    releaseDate: "July 05, 2025",
    imageUrl: "https://picsum.photos/seed/up2/400/600"
  },
  {
    id: 9,
    title: "Mars Colony X",
    releaseDate: "August 18, 2025",
    imageUrl: "https://picsum.photos/seed/up3/400/600"
  }
];

export const GENRES = [
  { name: "Action", icon: <Flame className="w-5 h-5" />, color: "from-orange-500 to-red-600" },
  { name: "Sci-Fi", icon: <Rocket className="w-5 h-5" />, color: "from-blue-500 to-purple-600" },
  { name: "Award Winners", icon: <Trophy className="w-5 h-5" />, color: "from-yellow-400 to-orange-500" },
  { name: "Horror", icon: <Ghost className="w-5 h-5" />, color: "from-neutral-700 to-neutral-900" },
  { name: "Romance", icon: <Heart className="w-5 h-5" />, color: "from-pink-500 to-rose-600" },
];

export const PLANS = [
  {
    name: "Basic",
    price: "0",
    features: ["Standard Recommendations", "Watch on 1 Device", "720p Resolution", "Ad-Supported"],
    recommended: false
  },
  {
    name: "Pro",
    price: "9.99",
    features: ["Advanced AI Matching", "Watch on 3 Devices", "1080p Resolution", "No Ads", "Download Offline"],
    recommended: true
  },
  {
    name: "Ultimate",
    price: "19.99",
    features: ["Hyper-Personalized AI", "Watch on 5 Devices", "4K + HDR", "Early Access to Originals", "Family Sharing"],
    recommended: false
  }
];

export const FEATURES: Feature[] = [
  {
    title: "Personalized Recommendations",
    description: "Our AI-powered engine learns your taste to suggest movies you'll actually love.",
    icon: <Sparkles className="w-8 h-8 text-red-500" />
  },
  {
    title: "Watch Anywhere",
    description: "Access your watchlist and recommendations on any device, anywhere in the world.",
    icon: <Tv className="w-8 h-8 text-red-500" />
  },
  {
    title: "Track Your Progress",
    description: "Keep a detailed history of what you've seen and what you plan to watch next.",
    icon: <TrendingUp className="w-8 h-8 text-red-500" />
  }
];

export const MOCK_REVIEWS = [
  {
    id: 1,
    userName: "Alex Rivera",
    movieTitle: "Interstellar Voyage",
    rating: 5,
    comment: "Absolutely breathtaking. The cinematography paired with the AI-driven score was something I've never experienced before.",
    date: "2 days ago"
  },
  {
    id: 2,
    userName: "Sarah Chen",
    movieTitle: "The Silent Forest",
    rating: 4,
    comment: "A hauntingly beautiful thriller. It kept me guessing until the very last frame. Highly recommend for any mystery lover.",
    date: "1 week ago"
  },
  {
    id: 3,
    userName: "Marcus Thorne",
    movieTitle: "Neon Knights",
    rating: 5,
    comment: "The visuals in Neon Knights are out of this world. CineMatch recommended this based on my love for Cyberpunk and it was spot on!",
    date: "3 days ago"
  }
];
