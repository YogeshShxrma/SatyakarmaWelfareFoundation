import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
const GetInvolved = () => {
  return <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Get Involved
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Join our mission to create a sustainable future through action and collaboration
          </p>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Volunteer */}
            <div className="bg-green-50 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Volunteer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join our passionate team of volunteers and make a direct impact in your community.
              </p>
              <ul className="text-left space-y-2 mb-6 text-gray-600">
                <li>• Tree plantation drives</li>
                <li>• Educational workshops</li>
                <li>• Children's fitness programs</li>
                <li>• Community outreach</li>
              </ul>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Become a Volunteer
              </button>
            </div>

            {/* Partner */}
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Partner</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Collaborate with us to amplify your organization's environmental and social impact.
              </p>
              <ul className="text-left space-y-2 mb-6 text-gray-600">
                <li>• Corporate partnerships</li>
                <li>• Educational institutions</li>
                <li>• Government collaboration</li>
                <li>• NGO networks</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Partner With Us
              </button>
            </div>

            {/* Donate */}
            
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Ready to Make a Difference?
          </h2>
          <form className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input type="text" placeholder="Your Name" className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="email" placeholder="Your Email" className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="mb-6">
              <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>How would you like to get involved?</option>
                <option>Volunteer</option>
                <option>Partner</option>
                <option>Donate</option>
                <option>General Inquiry</option>
              </select>
            </div>
            <div className="mb-6">
              <textarea rows={5} placeholder="Tell us more about your interest in our mission..." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Privacy Policy</h2>
          <div className="prose prose-lg text-gray-600 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Information Collection</h3>
            <p>
              SatyaKarma Welfare Foundation Society collects personal information only when voluntarily 
              provided by individuals who wish to support our mission. This may include contact information 
              for volunteers, donors, and partners.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800">Use of Information</h3>
            <p>
              We use collected information solely for the purpose of advancing our environmental and 
              community initiatives. This includes communication about programs, events, and opportunities 
              to get involved.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800">Data Protection</h3>
            <p>
              We implement appropriate security measures to protect personal information against 
              unauthorized access, alteration, disclosure, or destruction. We do not sell, trade, 
              or otherwise transfer personal information to outside parties.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800">Contact</h3>
            <p>
              For questions about this privacy policy or our data practices, please contact us at 
              privacy@satyakarma.org or through our contact form.
            </p>
            
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default GetInvolved;