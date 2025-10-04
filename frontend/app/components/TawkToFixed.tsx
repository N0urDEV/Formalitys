'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Tawk.to configuration
const TAWK_PROPERTY_ID = '68e13b60be3099194f4593e9';
const TAWK_WIDGET_ID = '1j6nsvs5l';

// Extend Window interface for Tawk.to
declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

export default function TawkToChat() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if Tawk.to is already loaded
    if (window.Tawk_API) {
      return;
    }

    // Initialize Tawk.to
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Create and inject the Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Insert the script
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    // Configure Tawk.to when it loads
    script.onload = () => {
      if (window.Tawk_API) {
        console.log('Tawk.to loaded successfully');
        
        // Wait a bit for Tawk.to to fully initialize
        setTimeout(() => {
          // Add page context to chat
          window.Tawk_API.addEvent('chat:started', function() {
            console.log('Chat started from:', pathname);
          });

          // Track when chat is opened
          window.Tawk_API.addEvent('chat:opened', function() {
            console.log('Tawk.to chat opened from:', pathname);
          });

          // Track when chat is closed
          window.Tawk_API.addEvent('chat:closed', function() {
            console.log('Tawk.to chat closed');
          });
        }, 1000);

        // Add custom CSS for styling
        const customCSS = `
          .tawk-widget {
            border-radius: 20px !important;
            box-shadow: 0 10px 30px rgba(0, 126, 167, 0.3) !important;
          }
          .tawk-widget-button {
            background: linear-gradient(135deg, #007ea7, #00a8e8) !important;
            border-radius: 50% !important;
            box-shadow: 0 4px 20px rgba(0, 126, 167, 0.4) !important;
            transition: all 0.3s ease !important;
          }
          .tawk-widget-button:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 6px 25px rgba(0, 126, 167, 0.5) !important;
          }
          .tawk-chat-window {
            border-radius: 20px 20px 0 0 !important;
            box-shadow: 0 -5px 30px rgba(0, 126, 167, 0.2) !important;
          }
          .tawk-chat-header {
            background: linear-gradient(135deg, #007ea7, #00a8e8) !important;
            border-radius: 20px 20px 0 0 !important;
          }
          .tawk-chat-input {
            border-radius: 0 0 20px 20px !important;
          }
        `;

        // Inject custom CSS
        const style = document.createElement('style');
        style.textContent = customCSS;
        document.head.appendChild(style);
      }
    };

    script.onerror = () => {
      console.error('Failed to load Tawk.to script');
    };

    // Cleanup function
    return () => {
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, [pathname]);

  // This component doesn't render anything visible
  return null;
}
