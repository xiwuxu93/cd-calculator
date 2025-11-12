export function trackEvent(action: string, params?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  // @ts-ignore
  const gtag = (window as any).gtag as undefined | ((...args: any[]) => void);
  if (!gtag) return; // GA not configured
  try {
    gtag('event', action, params ?? {});
  } catch {
    // no-op
  }
}

