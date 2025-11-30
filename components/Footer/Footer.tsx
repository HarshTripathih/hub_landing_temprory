export default function Footer() {
  return (
    <footer className="w-full px-1 md:px-0 py-4 md:py-10 bg-[url('/hero_bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="max-w-4xl mx-auto bg-white px-6 py-3 text-black border border-white rounded-4xl">
        <p className="text-center">
          © {new Date().getFullYear()} Aliens Hub — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
