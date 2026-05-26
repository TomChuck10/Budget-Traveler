import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (trackingId) {
  ReactGA.initialize(trackingId);
} else {
  console.log('Google Analytics: Measurement ID not found in environment.');
}

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (trackingId) {
      ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
    }
  }, [location]);

  return null;
}
