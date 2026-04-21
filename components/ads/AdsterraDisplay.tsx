'use client';
import { useEffect, useRef } from 'react';

export function AdsterraDisplay() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = '1';
    const opt = document.createElement('script');
    opt.textContent = `atOptions = { 'key': '05a460f135de26baee257d95c19d35a7', 'format': 'iframe', 'height': 90, 'width': 728, 'params': {} };`;
    ref.current.appendChild(opt);
    const invoke = document.createElement('script');
    invoke.src = 'https://www.highperformanceformat.com/05a460f135de26baee257d95c19d35a7/invoke.js';
    ref.current.appendChild(invoke);
  }, []);
  return <div ref={ref} style={{ textAlign: 'center', overflow: 'hidden', margin: '1rem auto' }} />;
}
