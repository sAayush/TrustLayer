"use client";

import { useEffect } from "react";

export default function TestErrorPage() {
  useEffect(() => {
    // This will trigger the error boundary
    throw new Error("This is a test error to showcase the error page design!");
  }, []);

  return null;
}

