
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Community Tree Plantation Drive: 500+ Trees Planted in One Day",
      excerpt: "Our recent community initiative brought together over 200 volunteers to plant native trees across three neighborhoods, contributing to urban forest restoration.",
      date: "March 15, 2024",
      category: "Tree Plantation",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Children's Fitness Workshop: Building Healthy Habits Early",
      excerpt: "Our recent fitness workshop engaged 150 children in fun physical activities, teaching them the importance of regular exercise and healthy living.",
      date: "March 10, 2024",
      category: "Children's Health",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Plastic-Free Campaign: Introducing Compostable Alternatives",
      excerpt: "Learn about our latest initiative to replace single-use plastics with eco-friendly compostable alternatives in local businesses and households.",
      date: "March 5, 2024",
      category: "Environmental",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Partnership with Local Schools: Environmental Education Program",
      excerpt: "We've partnered with 10 local schools to integrate environmental education into their curriculum, reaching over 2,000 students this semester.",
      date: "February 28, 2024",
      category: "Education",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Wildlife Conservation Success: Protecting Local Habitats",
      excerpt: "Our habitat restoration project has successfully created safe spaces for local wildlife, with documented increases in bird and small mammal populations.",
      date: "February 20, 2024",
      category: "Conservation",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "Community Gardens: Growing Food and Relationships",
      excerpt: "Our community garden project not only provides fresh produce but also strengthens neighborhood bonds and teaches sustainable farming practices.",
      date: "February 15, 2024",
      category: "Community",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read"
    }
  ];

  const categories = ["All", "Tree Plantation", "Children's Health", "Environmental", "Education", "Conservation", "Community"];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Blog & Updates
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Stay updated with our latest initiatives, success stories, and environmental insights
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All" 
                    ? "bg-green-600 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${post.image})`}}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-green-600 font-medium">{post.category}</span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <button className="text-green-600 hover:text-green-700 font-medium">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for the latest updates on our environmental initiatives and community programs.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
