import React from 'react'

function CustomSupport() {
  return (
    <>
      <header className="bg-primary text-white">
        <div className="px-10 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-10 lg:py-12">
          <h1 className="text-2xl font-bold">Customer Support</h1>
          <p className="text-sm mt-1">We're here to help! Reach out for any questions or concerns.</p>
        </div>
      </header>

      <main className="px-10 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-10 lg:py-12">
        <section className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">1. What is your return policy?</h3>
              <p className="text-sm">We offer a 30-day return policy on all products. Please visit our <a href="/privacy-policy" className="text-blue-600 underline">Return Policy</a> page for more details.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">2. How do I contact support?</h3>
              <p className="text-sm">You can contact us using the form below or via email at <a href="mailto:hseal419@gmail.com" className="text-blue-600 underline">hseal419@gmail.com</a>.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg border border-gray-200 mt-5">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-4">
            <li>
              <h3 className="text-lg font-medium">Email:</h3>
              <p className="text-sm"><a href="mailto:hseal419@gmail.com" className="text-blue-600 underline">hseal419@gmail.com</a></p>
            </li>
            <li>
              <h3 className="text-lg font-medium">Phone:</h3>
              <p className="text-sm">+250 780 289 432</p>
            </li>
            <li>
              <h3 className="text-lg font-medium">Address:</h3>
              <p className="text-sm">Gasabo, Kigali, RW</p>
            </li>
          </ul>
        </section>
      </main>
    </>
  )
}

export default CustomSupport