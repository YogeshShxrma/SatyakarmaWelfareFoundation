
const CallToAction = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      ></div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-fade-in shadow-text">
          Ready to Inspire Change?
        </h2>
        <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed animate-fade-in delay-300 shadow-text">
          Join thousands of volunteers and partners in creating a sustainable future. 
          Every action matters, every contribution counts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-500">
          <button className="bg-white/90 backdrop-blur-sm text-blue-600 px-12 py-5 rounded-full text-xl font-bold hover:bg-white transition-all transform hover:scale-105 shadow-2xl hover-scale">
            Support the Future
          </button>
          <button className="border-3 border-white/80 text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-white/20 backdrop-blur-sm transition-all transform hover:scale-105 shadow-2xl hover-scale">
            Become a Volunteer
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
