"use client";
import React from "react";

export default function ShimmerButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button className="shimmer-btn" onClick={onClick}>
      <span className="shimmer-btn-content">{children}</span>
      <div className="shimmer-btn-glow" />
    </button>
  );
}
