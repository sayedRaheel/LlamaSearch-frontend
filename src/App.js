import React, { useState } from "react";
import {
  Search,
  Loader2,
  ArrowRight,
  BookOpen,
  List,
  Home,
  Star,
  TrendingUp,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

export default function App() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_API_URL;

  const suggestedQueries = [
    {
      icon: "🔬",
      title: "Latest AI Research",
      query: "What are the latest developments in AI?",
    },
    {
      icon: "🌍",
      title: "Climate Change",
      query: "Latest solutions for climate change",
    },
    {
      icon: "🧬",
      title: "Biotechnology",
      query: "Recent breakthroughs in biotech",
    },
    {
      icon: "🚀",
      title: "Space Exploration",
      query: "Current space missions",
    },
  ];

  const resetApp = () => {
    setQuery("");
    setResponse(null);
    setError(null);
    setIsMenuOpen(false);
  };

  const createLinkifiedContent = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline break-words"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const handleSearch = async (e, suggestedQuery = null) => {
    e?.preventDefault();
    const searchText = suggestedQuery || query;
    if (!searchText.trim()) return;

    setIsLoading(true);
    setError(null);
    setIsMenuOpen(false);

    try {
        const response = await fetch(`${BACKEND_URL}/api/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ query: searchText }),
            credentials:'omit'
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data.");
        }

        const data = await response.json();
        console.log("Debug - API Response:", data); // Debug log

        // Handle the response based on its format
        let formattedContent;
        if (typeof data.content === 'string') {
            // Split the content into paragraphs
            const paragraphs = data.content.split('\n').filter(p => p.trim());
            formattedContent = {
                summary: paragraphs[0] || 'No summary available',
                points: paragraphs.slice(1)
            };
        } else if (data.content && typeof data.content === 'object') {
            // Handle structured content
            formattedContent = {
                summary: data.content.summary || 'No summary available',
                points: data.content.points || []
            };
        } else {
            throw new Error("Invalid response format");
        }

        setResponse({
            ...data,
            currentQuery: searchText,
            formattedContent
        });
        setQuery("");
    } catch (err) {
        console.error("Search error:", err); // Debug log
        setError(err.message || "An unexpected error occurred.");
    } finally {
        setIsLoading(false);
    }
};

  const handleTrendingClick = () => {
    handleSearch(null, "What is trending?");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-md shadow-lg z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={resetApp}
            className="text-xl font-bold text-white hover:text-blue-400 transition-colors flex items-center space-x-2"
          >
            <Sparkles className="w-6 h-6" />
            <span>LlamaSearch</span>
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-700/50 text-white transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg">
            <div className="flex flex-col p-4 space-y-4">
              <button
                onClick={resetApp}
                className="flex items-center space-x-2 p-3 hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <Home size={20} />
                <span>Home</span>
              </button>
              <button className="flex items-center space-x-2 p-3 hover:bg-gray-700/50 rounded-lg transition-all duration-300">
                <Star size={20} />
                <span>Favorites</span>
              </button>
              <button
                onClick={handleTrendingClick}
                className="flex items-center space-x-2 p-3 hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <TrendingUp size={20} />
                <span>Trending</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-16 px-4 pb-4">
        <main className="max-w-4xl mx-auto">
          {/* Logo and Hero Section - Only show when no response */}
          {!response && (
            <div className="text-center py-12 space-y-8">
              {/* Animated Logo */}
              <div className="w-32 h-32 mx-auto mb-8 relative group">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-400/30 transition-colors" />
                <div className="relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#blue-gradient)"
                      strokeWidth="2"
                      className="animate-[spin_3s_linear_infinite]"
                    />
                    <path
                      d="M35 70 Q35 45 50 40 Q65 35 65 60 L65 70 L60 70 L60 60 Q60 45 50 45 Q40 45 40 60 L40 70 Z"
                      fill="url(#blue-gradient)"
                      className="animate-[pulse_2s_ease-in-out_infinite]"
                    />
                    <defs>
                      <linearGradient
                        id="blue-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                LlamaSearch
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ask Anything: From Web Searches to Research Analysis
              </p>
            </div>
          )}

          {/* Search Section - Always visible */}
          <div className="mb-8 sticky top-16 pt-4 bg-gradient-to-b from-gray-900 to-transparent z-40">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur group-hover:blur-xl transition-all" />
              <div className="relative flex items-center">
                <div className="absolute left-3">
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  ) : (
                    <Search className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Search the Web, Dive into Research..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                />
              </div>
            </form>

            {/* Suggested Queries - Show when no response */}
            {!response && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Popular Searches
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestedQueries.map((item, index) => (
                    <button
                      key={index}
                      onClick={(e) => handleSearch(e, item.query)}
                      className="flex items-center p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
                    >
                      <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-white">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.query}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-900/50 text-red-200 rounded-lg mb-8 border border-red-700">
              {error}
            </div>
          )}

          {/* Enhanced Response Section */}
          {response && (
            <div className="space-y-6">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <span className="text-sm text-gray-400">You asked:</span>
                <p className="font-medium text-white mt-1">
                  {response.currentQuery}
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg shadow-lg border border-gray-700 p-6">
                {/* Summary Section */}
                <div className="mb-8">
                  <div className="flex items-center mb-4 border-b border-gray-700 pb-2">
                    <BookOpen className="w-6 h-6 mr-2 text-blue-400" />
                    <h2 className="text-xl font-semibold text-blue-400">
                      Summary
                    </h2>
                  </div>
                  <div className="text-gray-300 text-lg leading-relaxed">
                    {createLinkifiedContent(response.formattedContent.summary)}
                  </div>
                </div>

                {/* Key Points Section */}
                {response.formattedContent.points.length > 0 && (
                  <div>
                    <div className="flex items-center mb-4 border-b border-gray-700 pb-2">
                      <List className="w-6 h-6 mr-2 text-blue-400" />
                      <h2 className="text-xl font-semibold text-blue-400">
                        Key Points
                      </h2>
                    </div>
                    <div className="space-y-6">
                      {response.formattedContent.points.map((point, index) => {
                        // Check if the point is a heading (starts with '**' or '#')
                        const isHeading =
                          point.startsWith("**") || point.startsWith("#");
                        // Check if the point is a reference
                        const isReference = point
                          .toLowerCase()
                          .includes("references:");
                        // Check if the point is a note
                        const isNote = point.toLowerCase().startsWith("note:");

                        if (isHeading) {
                          return (
                            <h3
                              key={index}
                              className="text-lg font-semibold text-blue-300 mt-6"
                            >
                              {createLinkifiedContent(
                                point.replace(/\*\*/g, "").replace(/#+\s/, "")
                              )}
                            </h3>
                          );
                        } else if (isReference) {
                          return (
                            <div
                              key={index}
                              className="mt-8 pt-4 border-t border-gray-700"
                            >
                              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                                References
                              </h3>
                              <div className="text-gray-300 space-y-2">
                                {createLinkifiedContent(
                                  point.replace("References:", "")
                                )}
                              </div>
                            </div>
                          );
                        } else if (isNote) {
                          return (
                            <div
                              key={index}
                              className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600"
                            >
                              <p className="text-gray-300 italic">
                                {createLinkifiedContent(point)}
                              </p>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={index}
                              className="flex space-x-4 text-gray-300"
                            >
                              <div className="flex-shrink-0 w-1 bg-blue-500 rounded-full"></div>
                              <div className="flex-1 leading-relaxed">
                                {createLinkifiedContent(point)}
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Features Section - Only show when no response */}
          {!response && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                {[
                  {
                    icon: <Sparkles className="w-6 h-6 text-blue-400" />,
                    title: "AI-Powered",
                    description:
                      "Advanced algorithms to understand your queries",
                  },
                  {
                    icon: <BookOpen className="w-6 h-6 text-purple-400" />,
                    title: "Deep Research",
                    description: "Comprehensive research and analysis",
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6 text-pink-400" />,
                    title: "Real-time Updates",
                    description: "Stay current with latest developments",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="rounded-full w-12 h-12 bg-gray-700/50 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Floating Disclaimer */}
              <div className="fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-sm border-t border-gray-700 p-2 text-center z-50">
                <p className="text-sm text-gray-300">
                  <span className="text-yellow-500">⚠️</span> LlamaSearch can
                  make mistakes.
                  <button
                    className="ml-2 text-blue-400 hover:text-blue-300 transition-colors underline"
                    onClick={() => {
                      // Add your info modal logic here
                    }}
                  >
                    Learn more
                  </button>
                </p>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}