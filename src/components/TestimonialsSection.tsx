
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "SatyaKarma helped our children understand the importance of environmental protection through fun, engaging activities. The change in their behavior is remarkable.",
      author: "Priya Sharma",
      role: "Parent & Community Volunteer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?q=80&w=150&auto=format&fit=crop"
    },
    {
      quote: "Through their programs, we've seen our community transform into a cleaner, greener space where children actively participate in environmental initiatives.",
      author: "Rajesh Kumar",
      role: "School Principal",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
    },
    {
      quote: "The plastic-free initiatives have not only cleaned our neighborhood but also taught valuable lessons about sustainable living to the next generation.",
      author: "Meera Patel",
      role: "Community Leader",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-lightblue relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2074&auto=format&fit=crop')`
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-dark mb-6">
            Our Impact in Their Words
          </h2>
          <p className="text-lg text-deepblue max-w-2xl mx-auto">
            Hear from the communities and families who have experienced positive change through our programs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6">
                <p className="text-deepblue italic leading-relaxed mb-4">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-dark">{testimonial.author}</h4>
                  <p className="text-sm text-deepblue">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
