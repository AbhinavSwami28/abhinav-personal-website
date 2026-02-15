"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FlashlightMode from "./FlashlightMode";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [flashlightActive, setFlashlightActive] = useState(false);

  return (
    <>
      <Navbar
        flashlightActive={flashlightActive}
        onFlashlightToggle={setFlashlightActive}
      />
      <main className="flex-1">{children}</main>
      <Footer />
      <FlashlightMode
        active={flashlightActive}
        onExit={() => setFlashlightActive(false)}
      />
    </>
  );
}
