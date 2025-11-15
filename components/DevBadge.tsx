'use client';

import { useEffect, useState } from 'react';

export function DevBadge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('#site-footer');
    if (!footer) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '0px', threshold: 0.1 }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <a
        href="https://nextpace.agency"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Geliştiren: Nextpace"
        className="inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 bg-black text-white border border-yellow-400/40 shadow-[0_0_0_1px_rgba(255,215,0,.25)]/50 backdrop-blur-sm hover:scale-[1.02] transition"
      >
        <img
          src="https://i.hizliresim.com/dvtoaoo.png"
          alt=""
          loading="lazy"
          className="w-5 h-5 md:w-6 md:h-6 object-contain shrink-0"
        />
        <span className="text-sm text-white/80">Geliştiren</span>
        <span className="text-sm font-medium">Nextpace</span>
      </a>
    </div>
  );
}
