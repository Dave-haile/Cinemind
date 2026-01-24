import React, { useState } from "react";
import { Star, MessageSquare, User, Send } from "lucide-react";
import { MOCK_REVIEWS } from "../constants";

const Reviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"browse" | "write">("browse");

  return (
    <section id="reviews" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-2 text-white">
              Community Chatter
            </h2>
            <p className="text-gray-400">
              Hear from our community of millions of movie lovers.
            </p>
          </div>
          <div className="flex bg-neutral-900 p-1 rounded-xl self-start">
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "browse" ? "bg-red-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
            >
              Recent Reviews
            </button>
            <button
              onClick={() => setActiveTab("write")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "write" ? "bg-red-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
            >
              Write Review
            </button>
          </div>
        </div>

        {activeTab === "browse" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {MOCK_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-neutral-900 border border-neutral-800 p-8 rounded-4xl hover:border-red-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">
                        {review.userName}
                      </h4>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < review.rating ? "text-yellow-500 fill-current" : "text-neutral-700"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500 block mb-1">
                    Reviewed: {review.movieTitle}
                  </span>
                  <p className="text-gray-300 italic text-sm leading-relaxed">
                    &quot;{review.comment}&quot;
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-neutral-600">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-medium">12 Replies</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-8 md:p-12 animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Share Your Cinematic Experience
            </h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500">
                    Movie Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Neon Knights"
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star className="w-6 h-6 text-neutral-700 hover:text-yellow-500" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  placeholder="What did you think of the plot, the visuals, the score?"
                  className="w-full bg-black border border-neutral-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-500 transition-colors text-sm resize-none"
                />
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center space-x-2 shadow-xl shadow-red-600/20">
                <Send className="w-4 h-4" />
                <span>Publish Review</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
