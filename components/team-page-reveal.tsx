"use client";

import { useEffect } from "react";
import { revealScreen } from "@/lib/page-transition";

// Only fires the wipe-away animation if the persistent overlay was
// actually covered on the way in (i.e. arrived via the "ALL PARTNERS"
// link). A direct visit or reload is a no-op — see lib/page-transition.
export function TeamPageReveal() {
  useEffect(() => {
    revealScreen();
  }, []);

  return null;
}
