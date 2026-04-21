'use client';
import { useEffect, useRef } from 'react';

export function AdsterraNativeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = '1';
    const s = document.createElement('script');
    s.async = true; s.setAttribute('data-cfasync', 'false');
    s.src = 'https://pl29147388.profitablecpmratenetwork.com/3303b530b76d6446f4d5eb5d74d9fbb2/invoke.js';
    ref.current.appendChild(s);
  }, []);
  return <div ref={ref} id="container-3303b530b76d6446f4d5eb5d74d9fbb2" style={{ margin: '1.5rem 0', minHeight: '90px' }} />;
}
