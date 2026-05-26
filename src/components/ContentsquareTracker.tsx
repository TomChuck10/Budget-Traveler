import { useEffect } from 'react';

export default function ContentsquareTracker() {
  useEffect(() => {
    const csId = import.meta.env.VITE_CONTENTSQUARE_ID || '0f1b00b41a8dd';

    const script = document.createElement('script');
    script.src = `https://t.contentsquare.net/uxa/${csId}.js`;
    script.async = true;

    const head = document.getElementsByTagName('head')[0];
    if (head) {
      head.appendChild(script);
    }

    return () => {
      if (head && script.parentNode === head) {
        head.removeChild(script);
      }
    };
  }, []);

  return null;
}
