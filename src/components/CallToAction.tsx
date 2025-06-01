
const CallToAction = () => {
  return (
    <section className="py-20 bg-sage-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-lato font-bold text-gray-800 mb-6">
          Join Our Mission
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Be part of the change you want to see. Whether through volunteering, 
          partnerships, or spreading awareness - every action counts towards a cleaner, 
          healthier future for our children and communities.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-sm minimal-hover border border-gray-100">
            <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Volunteer</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Join our tree plantation drives, children's wellness programs, 
              and community awareness campaigns.
            </p>
            <button className="w-full bg-sage-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-sage-700 transition-colors">
              Become a Volunteer
            </button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm minimal-hover border border-gray-100">
            <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Partner</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Collaborate with us as a school, organization, or community group 
              to amplify our environmental impact.
            </p>
            <button className="w-full bg-ocean-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-ocean-700 transition-colors">
              Partner With Us
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Ready to Make a Difference?
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Contact us to learn more about our programs, volunteer opportunities, 
            or partnership initiatives. Together, we can create a sustainable future.
          </p>
          <button className="bg-earth-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-earth-700 transition-colors">
            Contact Us Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
