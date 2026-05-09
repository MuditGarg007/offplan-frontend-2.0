"use client";

import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Navbar onOpenAi={() => {}} />
      <main>
        {/* Home page content */}
      </main>
    </div>
  );
}
