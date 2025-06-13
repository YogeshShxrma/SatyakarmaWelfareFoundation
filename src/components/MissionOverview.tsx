import React from 'react';
const MissionOverview = () => {
  return <section className="py-20 bg bg-earth-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-gray-800 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            कर्म में सत्य की खोज करें - Searching for truth through action. We're dedicated to 
            building sustainable communities through environmental awareness, children's wellness, 
            and collaborative partnerships.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-sage-100 dark:bg-sage-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-sage-600 dark:text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Plastic-Free Planet</h3>
            <p className="text-gray-600 dark:text-gray-300">Promoting compostable alternatives and environmental awareness in communities</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-ocean-100 dark:bg-ocean-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-ocean-600 dark:text-ocean-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Active Children</h3>
            <p className="text-gray-600 dark:text-gray-300">Physical wellness and health awareness programs for the next generation</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-earth-100 dark:bg-earth-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-earth-600 dark:text-earth-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Green Communities</h3>
            <p className="text-gray-600 dark:text-gray-300">Tree planting and sustainable community partnership initiatives</p>
          </div>
        </div>
      </div>
    </section>;
};
export default MissionOverview;