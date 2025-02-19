import React from 'react'

function PrivacyPolicy() {
  return (
    <>
      <header className="bg-primary text-white">
        <div className="px-10 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-10 lg:py-12">
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
        </div>
      </header>

      <main className="px-10 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-10 lg:py-12">
        <section className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            Welcome to Lala Rental! Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information.
          </p>

          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Personal information you provide to us directly (e.g., name, email, phone number).</li>
            <li>Information automatically collected (e.g., cookies, usage data).</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            We use your information to:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Provide and maintain our services.</li>
            <li>Communicate with you, including updates and promotional content.</li>
            <li>Improve our website and services based on user feedback.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Sharing Your Information</h2>
          <p className="mb-4">
            We do not sell or share your personal information with third parties, except as necessary to provide our services or as required by law.
          </p>

          <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">
            You have the right to access, update, or delete your personal information. Please contact us at [Your Email] for assistance.
          </p>

          <h2 className="text-xl font-semibold mb-4">Cookies</h2>
          <p className="mb-4">
            We use cookies to enhance your experience on our website. You can manage your cookie preferences in your browser settings.
          </p>

          <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website.
          </p>

          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="font-medium">[Your Email]</p>
        </section>
      </main>
    </>
  )
}

export default PrivacyPolicy