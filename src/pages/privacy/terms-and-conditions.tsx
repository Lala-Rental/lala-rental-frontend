import React from 'react'

function TermsAndConditions() {
  return (
    <>
      <header className="bg-primary text-white">
        <div className="px-10 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-10 lg:py-12">
          <h1 className="text-2xl font-bold">Terms and Conditions</h1>
        </div>
      </header>

      <main className="px-10 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-10 lg:py-12">
        <section className="bg-white p-6">
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            Welcome to Lala Rental! By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using our services.
          </p>

          <h2 className="text-xl font-semibold mb-4">Use of the Website</h2>
          
          <ul className="list-disc list-inside mb-4">
            <li>You must be at least 18 years old to use this website.</li>
            <li>You agree not to use the website for any unlawful purposes.</li>
            <li>Unauthorized use of the website may result in legal action.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
          <p className="mb-4">
            All content on this website, including text, graphics, logos, and images, is the property of [Your Company Name] or its licensors and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without prior written permission.
          </p>

          <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
          <p className="mb-4">
            We are not liable for any damages or losses resulting from the use of this website or its content. Your use of the website is at your own risk.
          </p>

          <h2 className="text-xl font-semibold mb-4">Third-Party Links</h2>
          <p className="mb-4">
            Our website may contain links to third-party websites. We are not responsible for the content, policies, or practices of these websites. You access them at your own risk.
          </p>

          <h2 className="text-xl font-semibold mb-4">Termination</h2>
          <p className="mb-4">
            We reserve the right to terminate or suspend your access to the website without prior notice if you violate these Terms and Conditions.
          </p>

          <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
          <p className="mb-4">
            These Terms and Conditions are governed by and construed in accordance with the laws of [Your Country/State]. Any disputes will be subject to the exclusive jurisdiction of the courts in [Your Country/State].
          </p>

          <h2 className="text-xl font-semibold mb-4">Changes to the Terms</h2>
          <p className="mb-4">
            We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page, and it is your responsibility to review them periodically.
          </p>

          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <p className="font-medium">[Your Email]</p>
        </section>
      </main>
    </>
  )
}

export default TermsAndConditions