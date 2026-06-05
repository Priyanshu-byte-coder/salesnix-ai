"use client";
import React from "react";

export default function Marquee({
  children,
  reverse = false,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={`marquee-container ${pauseOnHover ? "pause-on-hover" : ""}`}>
      <div className={`marquee-content ${reverse ? "reverse" : ""}`}>
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}
