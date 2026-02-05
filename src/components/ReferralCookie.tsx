"use client";

import { useEffect } from "react";

/**
 * ReferralCookie Component
 * 
 * This component reads referral parameters from the URL and sets a cookie
 * that can be read by the DopeRaider game. The game expects a cookie named
 * "referrer" to track referral links.
 * 
 * Usage: Add this component to your layout or page to enable referral tracking
 * 
 * URL formats that will be detected:
 * - https://doperaider.com/?ref=username
 * - https://doperaider.com/?referrer=code
 * - https://doperaider.com/?referral=user123
 * 
 * The cookie will be set with:
 * - Name: "referrer"
 * - Value: The referral code from the URL
 * - Max Age: 30 days (2592000 seconds)
 * - Path: "/" (accessible across the entire domain)
 * - SameSite: "Lax" (for cross-site compatibility)
 */

export default function ReferralCookie() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Function to set cookie
    const setCookie = (name: string, value: string, days: number) => {
      const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
      console.log(`Referral cookie set: ${name}=${value} (expires in ${days} days)`);
    };

    // Function to get URL parameter
    const getUrlParam = (param: string): string | null => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    };

    // Check for referral parameters in the URL
    const referralParam = getUrlParam("ref") || getUrlParam("referrer") || getUrlParam("referral");
    
    if (referralParam) {
      // Set the cookie with the referral code
      setCookie("referrer", referralParam, 30); // 30 days expiration
      
      // Optional: Clean up the URL by removing the referral parameter (without page reload)
      // This keeps the URL clean for sharing
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  // This component doesn't render anything visible
  return null;
}