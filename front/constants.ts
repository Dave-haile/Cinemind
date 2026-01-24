// Mock data for movies and reviews
export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  imageUrl: string;
  backdropUrl?: string;
  synopsis?: string;
  cast?: string[];
  duration?: string;
}

export interface Review {
  id: number;
  userName: string;
  date: string;
  rating: number;
  comment: string;
  movieTitle?: string;
}

export const ALL_MOVIES: Movie[] = [
  {
    id: 1,
    title: "The Midnight Chronicles",
    year: 2024,
    genre: "Action",
    rating: 8.7,
    imageUrl: "https://picsum.photos/seed/movie1/400/600",
    backdropUrl: "https://picsum.photos/seed/movie1bg/1920/1080",
    synopsis: "In a world where destiny is forged in the shadows, one hero must rise above the chaos. This cinematic masterpiece explores the boundaries of human emotion, blending high-stakes action with a deeply personal journey of discovery and redemption.",
    cast: ["John Doe", "Jane Smith", "Robert Brown"],
    duration: "2h 15min"
  },
  {
    id: 2,
    title: "Echoes of Tomorrow",
    year: 2023,
    genre: "Sci-Fi",
    rating: 9.2,
    imageUrl: "https://picsum.photos/seed/movie2/400/600",
    backdropUrl: "https://picsum.photos/seed/movie2bg/1920/1080",
    synopsis: "A mind-bending journey through time and space that challenges our understanding of reality itself.",
    cast: ["Alice Johnson", "Mike Davis", "Sarah Wilson"],
    duration: "2h 45min"
  },
  {
    id: 3,
    title: "Lost in the Stars",
    year: 2024,
    genre: "Drama",
    rating: 8.9,
    imageUrl: "https://picsum.photos/seed/movie3/400/600",
    backdropUrl: "https://picsum.photos/seed/movie3bg/1920/1080",
    synopsis: "An emotional tale of love, loss, and the human spirit's resilience against all odds.",
    cast: ["Emma Thompson", "Tom Hanks", "Olivia Wilde"],
    duration: "1h 58min"
  },
  {
    id: 4,
    title: "Thunder Valley",
    year: 2023,
    genre: "Action",
    rating: 8.5,
    imageUrl: "https://picsum.photos/seed/movie4/400/600",
    backdropUrl: "https://picsum.photos/seed/movie4bg/1920/1080",
    synopsis: "When nature strikes back, one man must face the storm that threatens everything he holds dear.",
    cast: ["Chris Evans", "Scarlett Johansson", "Mark Ruffalo"],
    duration: "2h 32min"
  },
  {
    id: 5,
    title: "Quantum Dreams",
    year: 2024,
    genre: "Sci-Fi",
    rating: 9.0,
    imageUrl: "https://picsum.photos/seed/movie5/400/600",
    backdropUrl: "https://picsum.photos/seed/movie5bg/1920/1080",
    synopsis: "In a world where dreams become reality, one scientist discovers the ultimate truth about consciousness.",
    cast: ["Natalie Portman", "Oscar Isaac", "Jessica Chastain"],
    duration: "2h 28min"
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    userName: "MovieBuff92",
    date: "2 days ago",
    rating: 5,
    comment: "Absolutely phenomenal! The cinematography is breathtaking and the story kept me on the edge of my seat. Can't recommend this enough!",
    movieTitle: "The Midnight Chronicles"
  },
  {
    id: 2,
    userName: "CinemaLover",
    date: "1 week ago",
    rating: 4,
    comment: "Great action sequences and solid performances. The plot twists were unexpected and kept me engaged throughout.",
    movieTitle: "Echoes of Tomorrow"
  },
  {
    id: 3,
    userName: "FilmCritic2024",
    date: "3 days ago",
    rating: 5,
    comment: "A masterpiece of modern cinema. The emotional depth and visual storytelling are unparalleled. This will be remembered as a classic.",
    movieTitle: "Lost in the Stars"
  },
  {
    id: 4,
    userName: "ActionFan",
    date: "5 days ago",
    rating: 4,
    comment: "Non-stop action from start to finish! The special effects are top-notch and the hero's journey is incredibly compelling.",
    movieTitle: "Thunder Valley"
  },
  {
    id: 5,
    userName: "SciFiEnthusiast",
    date: "1 day ago",
    rating: 5,
    comment: "Mind-blowing concepts executed flawlessly. The philosophical undertones make this more than just entertainment - it's thought-provoking art.",
    movieTitle: "Quantum Dreams"
  }
];

// Additional movie data for different sections
export const NOW_PLAYING_MOVIES: Movie[] = [
  {
    id: 6,
    title: "Neon Nights",
    year: 2024,
    genre: "Action",
    rating: 8.8,
    imageUrl: "https://picsum.photos/seed/nowplaying1/400/600",
    duration: "2h 22min"
  },
  {
    id: 7,
    title: "Midnight Express",
    year: 2024,
    genre: "Thriller",
    rating: 9.1,
    imageUrl: "https://picsum.photos/seed/nowplaying2/400/600",
    duration: "1h 58min"
  },
  {
    id: 8,
    title: "Urban Legends",
    year: 2024,
    genre: "Horror",
    rating: 7.9,
    imageUrl: "https://picsum.photos/seed/nowplaying3/400/600",
    duration: "1h 45min"
  }
];

export const MOVIES: Movie[] = [
  ...ALL_MOVIES.slice(0, 6), // First 6 movies from ALL_MOVIES
  ...NOW_PLAYING_MOVIES.slice(0, 6) // Add some now playing movies
];

export const UPCOMING_MOVIES: Movie[] = [
  {
    id: 9,
    title: "The Last Frontier",
    year: 2025,
    genre: "Adventure",
    rating: 0,
    imageUrl: "https://picsum.photos/seed/upcoming1/400/600"
  },
  {
    id: 10,
    title: "Digital Dreams",
    year: 2025,
    genre: "Sci-Fi",
    rating: 0,
    imageUrl: "https://picsum.photos/seed/upcoming2/400/600"
  },
  {
    id: 11,
    title: "Heart of Stone",
    year: 2025,
    genre: "Romance",
    rating: 0,
    imageUrl: "https://picsum.photos/seed/upcoming3/400/600"
  }
];

export const PLANS = [
  {
    name: "Free",
    price: 0,
    recommended: false,
    features: [
      "Stream in HD",
      "Limited movie library",
      "5 movies per month",
      "Watch on 1 device",
      "Community reviews"
    ]
  },
  {
    name: "Premium",
    price: 9.99,
    recommended: true,
    features: [
      "Stream in 4K Ultra HD",
      "Unlimited movies",
      "Offline downloads",
      "Watch on 3 devices",
      "AI recommendations",
      "Exclusive premieres",
      "Priority support"
    ]
  },
  {
    name: "Family",
    price: 14.99,
    recommended: false,
    features: [
      "Everything in Premium",
      "Watch on 5 devices",
      "Family profiles",
      "Parental controls",
      "Kids content library",
      "Group watch feature"
    ]
  }
];

export const GENRES = [
  { name: "Action", color: "from-red-500 to-orange-500", icon: "💥" },
  { name: "Drama", color: "from-blue-500 to-purple-500", icon: "🎭" },
  { name: "Comedy", color: "from-yellow-400 to-orange-400", icon: "😂" },
  { name: "Sci-Fi", color: "from-cyan-400 to-blue-500", icon: "🚀" },
  { name: "Horror", color: "from-gray-700 to-black", icon: "👻" },
  { name: "Romance", color: "from-pink-400 to-red-400", icon: "💕" },
  { name: "Thriller", color: "from-purple-600 to-pink-600", icon: "🔍" },
  { name: "Documentary", color: "from-green-400 to-blue-400", icon: "📹" },
  { name: "Animation", color: "from-indigo-400 to-purple-400", icon: "🎨" },
  { name: "Fantasy", color: "from-violet-500 to-purple-600", icon: "🧙‍♂️" }
];

export const FEATURES = [
  {
    title: "AI-Powered Recommendations",
    description: "Our Gemini-powered engine analyzes your viewing habits to suggest movies you'll absolutely love.",
    icon: "🤖"
  },
  {
    title: "4K Ultra HD Streaming",
    description: "Experience cinema-quality visuals with crystal-clear 4K resolution and HDR support.",
    icon: "🎬"
  },
  {
    title: "Offline Downloads",
    description: "Download your favorite movies and watch them anywhere, even without an internet connection.",
    icon: "📱"
  },
  {
    title: "Community Reviews",
    description: "Read authentic reviews from our community of millions of movie enthusiasts.",
    icon: "👥"
  },
  {
    title: "Multi-Device Sync",
    description: "Start watching on your phone, continue on your TV. Your progress syncs automatically.",
    icon: "🔄"
  },
  {
    title: "Exclusive Content",
    description: "Access movies and series available only on Cinematch, before they're released anywhere else.",
    icon: "⭐"
  }
];
