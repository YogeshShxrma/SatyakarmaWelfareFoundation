
const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Inspire Change?
        </h2>
        <p className="text-xl text-green-100 mb-8 leading-relaxed">
          Join thousands of volunteers, donors, and partners in creating a sustainable future. 
          Every action matters, every contribution counts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
            Support the Future
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-all transform hover:scale-105">
            Become a Volunteer
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
