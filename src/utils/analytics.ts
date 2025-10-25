// Google Analytics Configuration
// Replace GA_MEASUREMENT_ID with your actual Google Analytics 4 Measurement ID

export const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID'; // Replace with your GA4 ID

// Analytics configuration
export const analyticsConfig = {
  measurementId: GA_MEASUREMENT_ID,
  debugMode: false, // Set to true for development
  anonymizeIp: true,
  cookieExpires: 63072000, // 2 years
  cookieUpdate: true,
  cookieFlags: 'SameSite=None;Secure',
  sendPageView: true,
  enhancedEcommerce: false,
  customMap: {},
  contentGroup1: 'Blog',
  contentGroup2: 'Technology',
  contentGroup3: 'Software Development'
};

// Custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Page view tracking
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Blog post reading time tracking
export const trackReadingTime = (postTitle: string, readingTime: number) => {
  trackEvent('blog_reading_time', {
    post_title: postTitle,
    reading_time_minutes: readingTime,
    event_category: 'engagement',
    event_label: 'blog_post'
  });
};

// Spotify integration tracking
export const trackSpotifyInteraction = (action: string, trackName?: string) => {
  trackEvent('spotify_interaction', {
    action: action,
    track_name: trackName,
    event_category: 'music',
    event_label: 'spotify_widget'
  });
};


// Social sharing tracking
export const trackSocialShare = (platform: string, url: string, title: string) => {
  trackEvent('share', {
    method: platform,
    content_type: 'article',
    item_id: url,
    event_category: 'engagement',
    event_label: 'social_share'
  });
};

// Comment tracking
export const trackComment = (action: string, postTitle: string) => {
  trackEvent('comment_interaction', {
    action: action,
    post_title: postTitle,
    event_category: 'engagement',
    event_label: 'comments'
  });
};

// Scroll depth tracking
export const trackScrollDepth = (depth: number, url: string) => {
  trackEvent('scroll', {
    percent_scrolled: depth,
    page_location: url,
    event_category: 'engagement',
    event_label: 'scroll_depth'
  });
};

// Time on page tracking
export const trackTimeOnPage = (timeInSeconds: number, url: string) => {
  trackEvent('timing_complete', {
    name: 'time_on_page',
    value: timeInSeconds,
    page_location: url,
    event_category: 'engagement',
    event_label: 'time_on_page'
  });
};

// Error tracking
export const trackError = (error: string, url: string, line?: number) => {
  trackEvent('exception', {
    description: error,
    fatal: false,
    page_location: url,
    line_number: line,
    event_category: 'error',
    event_label: 'javascript_error'
  });
};

// Performance tracking
export const trackPerformance = (metric: string, value: number, url: string) => {
  trackEvent('timing_complete', {
    name: metric,
    value: value,
    page_location: url,
    event_category: 'performance',
    event_label: metric
  });
};

// User engagement scoring
export const calculateEngagementScore = () => {
  const startTime = performance.now();
  let scrollDepth = 0;
  let clickCount = 0;
  
  // Track scroll depth
  const trackScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollDepth = Math.round((scrollTop / scrollHeight) * 100);
  };
  
  // Track clicks
  const trackClicks = () => {
    clickCount++;
  };
  
  // Add event listeners
  window.addEventListener('scroll', trackScroll);
  document.addEventListener('click', trackClicks);
  
  // Return engagement score calculation function
  return () => {
    const timeOnPage = Math.round((performance.now() - startTime) / 1000);
    const engagementScore = Math.min(100, (scrollDepth * 0.4) + (clickCount * 10) + (timeOnPage * 0.1));
    
    trackEvent('engagement_score', {
      score: engagementScore,
      scroll_depth: scrollDepth,
      click_count: clickCount,
      time_on_page: timeOnPage,
      event_category: 'engagement',
      event_label: 'user_engagement'
    });
    
    return engagementScore;
  };
};
