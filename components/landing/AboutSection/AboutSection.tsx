"use client";

export default function AboutSection() {
  return (
    <section id="about" className="w-full px-6 md:px-16 py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
          About Aliens Hub
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          Aliens Hub is a modern web development studio specializing in
          high-performance websites, custom SaaS tools, automation systems,
          dashboards, and scalable cloud applications.  
          <br /><br />
          We use technologies like Next.js, Node.js, React, MongoDB, and AWS to
          build fast, secure, and user-friendly digital experiences.
        </p>
      </div>
    </section>
  );
}
