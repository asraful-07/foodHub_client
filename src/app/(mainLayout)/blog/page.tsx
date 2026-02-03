import React from "react";
import {
  FaCalendar,
  FaUser,
  FaArrowRight,
  FaTag,
  FaShareAlt,
  FaHeart,
  FaComment,
  FaBookmark,
  FaSearch,
  FaFire,
  FaStar,
} from "react-icons/fa";
import Image from "next/image";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Secret to Perfect Biryani Every Time",
      excerpt:
        "Discover the traditional techniques and modern twists that make our biryani legendary.",
      category: "Recipes",
      author: "Chef Rahman",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80",
      likes: 245,
      comments: 42,
      featured: true,
    },
    {
      id: 2,
      title: "Top 10 Street Foods You Must Try in Dhaka",
      excerpt:
        "A culinary journey through Dhaka's most iconic street food spots.",
      category: "Food Guide",
      author: "Food Explorer",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w-800&auto=format&fit=crop&q=80",
      likes: 189,
      comments: 31,
    },
    {
      id: 3,
      title: "Organic Farming: The Future of Sustainable Food",
      excerpt: "How our commitment to organic ingredients makes a difference.",
      category: "Sustainability",
      author: "Green Chef",
      date: "Dec 5, 2024",
      readTime: "10 min read",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
      likes: 156,
      comments: 28,
    },
    {
      id: 4,
      title: "The Art of Perfect Spice Blending",
      excerpt: "Learn how we create our signature spice mixes from scratch.",
      category: "Cooking Tips",
      author: "Spice Master",
      date: "Nov 28, 2024",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1532465614-6c0a5a2dce6a?w=800&auto=format&fit=crop&q=80",
      likes: 203,
      comments: 35,
    },
    {
      id: 5,
      title: "Traditional vs Modern Bangladeshi Cuisine",
      excerpt: "How we preserve tradition while embracing innovation.",
      category: "Culture",
      author: "Cultural Chef",
      date: "Nov 20, 2024",
      readTime: "9 min read",
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d9d6?w=800&auto=format&fit=crop&q=80",
      likes: 178,
      comments: 29,
    },
    {
      id: 6,
      title: "Behind the Scenes: Our Kitchen Secrets",
      excerpt:
        "Take a peek into what makes our kitchen operations so efficient.",
      category: "Behind Scenes",
      author: "Kitchen Manager",
      date: "Nov 15, 2024",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80",
      likes: 134,
      comments: 22,
    },
    {
      id: 7,
      title: "Health Benefits of Traditional Spices",
      excerpt: "Discover how traditional spices boost immunity and health.",
      category: "Health",
      author: "Nutrition Expert",
      date: "Nov 10, 2024",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1596040033221-a382d7066c82?w=800&auto=format&fit=crop&q=80",
      likes: 198,
      comments: 33,
    },
    {
      id: 8,
      title: "Mastering the Art of Perfect Rice",
      excerpt:
        "Learn the techniques for cooking fluffy, aromatic rice every time.",
      category: "Cooking Tips",
      author: "Rice Master",
      date: "Nov 5, 2024",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop&q=80",
      likes: 167,
      comments: 26,
    },
  ];

  const categories = [
    "All Posts",
    "Recipes",
    "Food Guide",
    "Sustainability",
    "Cooking Tips",
    "Culture",
    "Behind Scenes",
    "Health",
  ];

  const popularTags = [
    "Biryani",
    "Street Food",
    "Organic",
    "Spices",
    "Traditional",
    "Modern",
    "Healthy",
    "Quick Recipes",
    "Vegetarian",
    "Desserts",
  ];

  const featuredAuthors = [
    {
      name: "Chef Rahman",
      posts: 24,
      image:
        "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&auto=format&fit=crop&q=80",
      bio: "Master Chef with 15+ years experience",
    },
    {
      name: "Food Explorer",
      posts: 18,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      bio: "Travel & Food Blogger",
    },
    {
      name: "Spice Master",
      posts: 15,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
      bio: "Herb & Spice Specialist",
    },
  ];

  const trendingPosts = [
    {
      title: "5 Essential Kitchen Tools for Beginners",
      date: "Dec 12, 2024",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop&q=80",
    },
    {
      title: "Winter Special: Hot Soup Recipes",
      date: "Dec 8, 2024",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&auto=format&fit=crop&q=80",
    },
    {
      title: "How to Reduce Food Waste at Home",
      date: "Dec 3, 2024",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=400&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-20 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-3 mb-6">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <FaFire className="w-7 h-7" />
            </div>
            <span className="text-xl font-semibold tracking-wider">
              FOODIE BLOG
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Savor Every <span className="text-orange-200">Word</span>
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-12 leading-relaxed">
            Where flavors meet stories, and every recipe has a tale to tell
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search recipes, articles, cooking tips..."
                className="w-full px-8 py-5 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-2xl text-lg placeholder-gray-500"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl transition-all duration-300 hover:scale-110">
                <FaSearch className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Categories */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-3 mb-8">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      index === 0
                        ? "bg-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105"
                        : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 hover:text-orange-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Post */}
            <div className="mb-16">
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <div className="relative h-[500px]">
                  {/* Featured Badge */}
                  <div className="absolute top-8 left-8 z-10">
                    <span className="px-5 py-2.5 bg-orange-500 text-white rounded-full text-sm font-semibold flex items-center shadow-lg">
                      <FaFire className="w-4 h-4 mr-2" />
                      FEATURED
                    </span>
                  </div>

                  {/* Featured Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-10 text-white z-10">
                      <span className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 inline-block">
                        {blogPosts[0].category}
                      </span>
                      <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        {blogPosts[0].title}
                      </h2>
                      <div className="flex items-center space-x-8 text-orange-100 text-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <FaUser className="w-5 h-5" />
                          </div>
                          <span className="font-medium">
                            {blogPosts[0].author}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <FaCalendar className="w-5 h-5" />
                          </div>
                          <span>{blogPosts[0].date}</span>
                        </div>
                        <span className="bg-white/20 px-4 py-1.5 rounded-full">
                          {blogPosts[0].readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-10">
                  <p className="text-gray-600 text-xl mb-8 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-8">
                    <div className="flex items-center space-x-8">
                      <button className="flex items-center space-x-3 text-gray-600 hover:text-orange-500 transition-colors group">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                          <FaHeart className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">
                            {blogPosts[0].likes}
                          </div>
                          <div className="text-sm text-gray-500">Likes</div>
                        </div>
                      </button>
                      <button className="flex items-center space-x-3 text-gray-600 hover:text-blue-500 transition-colors group">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <FaComment className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">
                            {blogPosts[0].comments}
                          </div>
                          <div className="text-sm text-gray-500">Comments</div>
                        </div>
                      </button>
                      <button className="flex items-center space-x-3 text-gray-600 hover:text-purple-500 transition-colors group">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                          <FaBookmark className="w-5 h-5" />
                        </div>
                        <div className="text-sm">Save</div>
                      </button>
                    </div>
                    <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 flex items-center space-x-3 hover:scale-105 group">
                      <span className="text-lg font-semibold">
                        Read Full Story
                      </span>
                      <FaArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Articles Heading */}
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-gray-800">
                Latest Articles
              </h2>
              <button className="text-orange-500 hover:text-orange-600 font-semibold flex items-center space-x-2">
                <span>View All</span>
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.slice(1).map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-100 group"
                >
                  {/* Post Image */}
                  <div className="relative h-64">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold shadow-lg">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <FaBookmark className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <FaUser className="w-3 h-3 text-orange-500" />
                          </div>
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaCalendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors cursor-pointer line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-5 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                          <FaHeart className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {post.likes}
                          </span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <FaComment className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {post.comments}
                          </span>
                        </button>
                      </div>
                      <button className="text-orange-500 hover:text-orange-600 font-medium flex items-center space-x-2 group">
                        <span>Read More</span>
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-16">
              <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl shadow-lg">
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                  ←
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg">
                  1
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors border border-gray-200">
                  2
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors border border-gray-200">
                  3
                </button>
                <span className="px-3 text-gray-500">...</span>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors border border-gray-200">
                  8
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Popular Tags */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaTag className="w-6 h-6 mr-3 text-orange-500" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-3">
                {popularTags.map((tag, index) => (
                  <button
                    key={index}
                    className="px-4 py-2.5 bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-700 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Authors */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">
                Featured Authors
              </h3>
              <div className="space-y-6">
                {featuredAuthors.map((author, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 hover:bg-orange-50 rounded-xl transition-all duration-300 group"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={author.image}
                        alt={author.name}
                        fill
                        className="object-cover rounded-full border-2 border-white shadow-md group-hover:border-orange-200 transition-colors"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors truncate">
                        {author.name}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {author.bio}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">
                          {author.posts} articles
                        </span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className="w-3 h-3 text-orange-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors whitespace-nowrap">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-20 -translate-x-20"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <FaFire className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-orange-100 mb-8 leading-relaxed">
                  Get weekly recipes, cooking tips, and exclusive food stories
                  delivered to your inbox
                </p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-5 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-gray-500"
                  />
                  <button className="w-full px-6 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors shadow-lg hover:shadow-xl">
                    Subscribe Now
                  </button>
                </div>
                <p className="text-sm text-orange-200 mt-6 text-center">
                  Join 10,000+ food lovers
                </p>
              </div>
            </div>

            {/* Trending Posts */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">
                Trending Now 🔥
              </h3>
              <div className="space-y-6">
                {trendingPosts.map((post, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 group cursor-pointer"
                  >
                    <div className="w-20 h-20 flex-shrink-0 relative rounded-xl overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="80px"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-orange-600 font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center space-x-3 text-sm text-gray-500 mt-2">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 py-20 px-4 mt-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-white rounded-full"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-white rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Want to Share Your Culinary Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our community of passionate food writers, chefs, and culinary
            enthusiasts
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center justify-center space-x-3">
              <span className="text-lg">Become a Contributor</span>
              <FaArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              View Writing Guidelines
            </button>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-orange-200">Articles Published</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-orange-200">Expert Writers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">100K+</div>
              <div className="text-orange-200">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.9</div>
              <div className="text-orange-200">Community Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
