"use client";

import { useEffect, useState } from "react";

export default function TestReferralPage() {
  const [cookieValue, setCookieValue] = useState<string | null>(null);
  const [fullCookie, setFullCookie] = useState<string>("");
  const [urlParams, setUrlParams] = useState<Record<string, string>>({});

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Get current cookie value
    const getCookie = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || '');
      return null;
    };

    // Get URL parameters
    const getUrlParams = () => {
      const params = new URLSearchParams(window.location.search);
      const paramsObj: Record<string, string> = {};
      params.forEach((value, key) => {
        paramsObj[key] = value;
      });
      return paramsObj;
    };

    setCookieValue(getCookie("referrer"));
    setFullCookie(document.cookie || "No cookies");
    setUrlParams(getUrlParams());
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Referral Cookie Test Page</h1>
        
        <div className="mb-8 p-6 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Current Cookie Status</h2>
          <div className="space-y-2">
            <p><strong>Cookie "referrer" value:</strong> {cookieValue ? `"${cookieValue}"` : "Not set"}</p>
            <p><strong>Full document.cookie:</strong> {fullCookie}</p>
          </div>
        </div>

        <div className="mb-8 p-6 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">URL Parameters</h2>
          {Object.keys(urlParams).length > 0 ? (
            <ul className="space-y-2">
              {Object.entries(urlParams).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
          ) : (
            <p>No URL parameters detected</p>
          )}
        </div>

        <div className="mb-8 p-6 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test Links</h2>
          <p className="mb-4">Click these links to test referral cookie setting:</p>
          <div className="space-y-3">
            <a 
              href="/test-referral?ref=testuser123" 
              className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-center"
            >
              Test with ?ref=testuser123
            </a>
            <a 
              href="/test-referral?referrer=player456" 
              className="block px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-center"
            >
              Test with ?referrer=player456
            </a>
            <a 
              href="/test-referral?referral=influencer789" 
              className="block px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-center"
            >
              Test with ?referral=influencer789
            </a>
            <a 
              href="/test-referral" 
              className="block px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-center"
            >
              Clear parameters (no referral)
            </a>
          </div>
        </div>

        <div className="p-6 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>When a user visits with a referral parameter (?ref, ?referrer, or ?referral), the ReferralCookie component sets a cookie named "referrer"</li>
            <li>The cookie expires in 30 days and is accessible across the entire domain (path=/)</li>
            <li>When the user later plays the game, the game reads this cookie using <code>getCookie("referrer")</code></li>
            <li>The referral parameter is removed from the URL for a clean browsing experience</li>
          </ol>
          <p className="mt-4 text-gray-300">
            <strong>Note:</strong> This test page is for verification only. In production, the ReferralCookie component runs silently on every page.
          </p>
        </div>
      </div>
    </div>
  );
}