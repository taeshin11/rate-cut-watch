'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147387.profitablecpmratenetwork.com/3a/d6/6c/3ad66ce536de7a8ca2b3d309aaab89d0.js", "https://pl29147390.profitablecpmratenetwork.com/f6/2d/93/f62d93b8e2928957058be8b6e3af9ecd.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
