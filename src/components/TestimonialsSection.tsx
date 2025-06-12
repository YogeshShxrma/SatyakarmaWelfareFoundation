
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Satyakarma Earth Rise showed our children the importance of caring for our planet. The impact on our community has been transformative.",
      author: "Priya Sharma",
      role: "Parent & Community Volunteer",
      image: "https://images.unsplash.com/photo-1494790108755-2616c64c8675?q=80&w=150&auto=format&fit=crop"
    },
    {
      quote: "Through their programs, we learned practical ways to reduce plastic waste. Our school is now completely plastic-free thanks to their guidance.",
      author: "Rajesh Kumar",
      role: "School Principal",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
    },
    {
      quote: "The mindful approach to environmental action that Satyakarma teaches has changed how our entire family thinks about sustainability.",
      author: "Anita Patel",
      role: "Environmental Enthusiast",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-foreground mb-6">
            Voices of Change
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from community members who have experienced the positive impact of our initiatives
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 scroll-reveal"
            >
              <div className="mb-6">
                <svg className="h-8 w-8 text-primary mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
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
                  <h4 className="font-semibold text-foreground">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
