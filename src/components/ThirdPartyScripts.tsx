"use client";

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function ThirdPartyScripts() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID && !ADSENSE_CLIENT_ID) return;

    let loaded = false;
    const loadScripts = () => {
      if (loaded) return;
      loaded = true;
      setShouldLoad(true);
      
      // Clean up event listeners
      triggerEvents.forEach((event) => {
        window.removeEventListener(event, loadScripts);
      });
    };

    const triggerEvents = ['scroll', 'mousemove', 'touchstart', 'keydown', 'click'];

    // Add listeners for user interaction
    triggerEvents.forEach((event) => {
      window.addEventListener(event, loadScripts, { passive: true });
    });

    // Fallback timer: load after 3.5 seconds
    const timer = setTimeout(loadScripts, 3500);

    // Optional requestIdleCallback fallback
    let idleId: number | null = null;
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = (window as any).requestIdleCallback(loadScripts, { timeout: 4000 });
    }

    return () => {
      clearTimeout(timer);
      if (idleId && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleId);
      }
      triggerEvents.forEach((event) => {
        window.removeEventListener(event, loadScripts);
      });
    };
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}

      {ADSENSE_CLIENT_ID ? (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      ) : null}

      <Script id="grow-queue" strategy="afterInteractive">
        {`
          window.growMe || ((window.growMe = function(e){window.growMe._.push(e);}),(window.growMe._=[]));
        `}
      </Script>
      <Script
        id="grow-init"
        src="https://faves.grow.me/main.js"
        data-grow-faves-site-id="U2l0ZToyNDk5YTFhZC02YjZhLTQyMDktOTFmYy1jMWVlYWEwYmJlMmI="
        strategy="afterInteractive"
        defer
      />
    </>
  );
}

