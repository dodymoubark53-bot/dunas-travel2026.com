import React, { useState, useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [ripples, setRipples] = useState([]);
  
  const iframeRef = useRef(null);
  const isPlayingRef = useRef(isPlaying);
  const hasInteractedRef = useRef(hasInteracted);

  // Keep refs in sync for event listeners
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    hasInteractedRef.current = hasInteracted;
  }, [hasInteracted]);

  const sendCommand = (func) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: func,
          args: ''
        }),
        '*'
      );
    }
  };

  const playMusic = () => {
    sendCommand('playVideo');
    setIsPlaying(true);
    sessionStorage.setItem('musicPlaying', 'true');
  };

  const pauseMusic = () => {
    sendCommand('pauseVideo');
    setIsPlaying(false);
    sessionStorage.setItem('musicPlaying', 'false');
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!hasInteractedRef.current) {
      setHasInteracted(true);
    }
    if (isPlayingRef.current) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const addRipple = (x, y) => {
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 800);
  };

  // Restore session playing state on load
  useEffect(() => {
    const storedPlaying = sessionStorage.getItem('musicPlaying') === 'true';
    if (storedPlaying) {
      setHasInteracted(true);
      // Give the iframe a brief moment to load before sending play command
      const timer = setTimeout(() => {
        playMusic();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Monitor document clicks for page interaction and ripple animation
  useEffect(() => {
    const handleDocClick = (e) => {
      const toggleBtn = document.getElementById('webflow-music-toggle-btn');
      if (toggleBtn && (toggleBtn === e.target || toggleBtn.contains(e.target))) {
        return;
      }

      if (!hasInteractedRef.current) {
        setHasInteracted(true);
        playMusic();
      }

      addRipple(e.clientX, e.clientY);
    };

    document.addEventListener('click', handleDocClick);
    return () => {
      document.removeEventListener('click', handleDocClick);
    };
  }, []);

  // Monitor the WhatsApp / Social contact widget open state
  useEffect(() => {
    const contactEl = document.getElementById('floating-contact-container');
    if (!contactEl) return;

    const checkState = () => {
      // Check if expanded: multiple links rendered inside the container
      const links = contactEl.querySelectorAll('a');
      setIsContactOpen(links.length > 1);
    };

    // Initial check
    checkState();

    // Observe changes inside the container (AnimatePresence adding links)
    const observer = new MutationObserver(checkState);
    observer.observe(contactEl, { childList: true, subtree: true });

    // Fallback click listener
    const handleFallbackClick = () => {
      setTimeout(checkState, 100);
    };
    contactEl.addEventListener('click', handleFallbackClick);

    return () => {
      observer.disconnect();
      contactEl.removeEventListener('click', handleFallbackClick);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes webflow-music-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes webflow-music-pulse {
          0% {
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            border-color: rgba(201, 162, 39, 0.4);
          }
          100% {
            box-shadow: 0 4px 20px rgba(201, 162, 39, 0.25);
            border-color: rgba(201, 162, 39, 0.8);
          }
        }

        @keyframes webflow-ripple-animation {
          0% {
            width: 0px;
            height: 0px;
            opacity: 1;
          }
          100% {
            width: 160px;
            height: 160px;
            opacity: 0;
          }
        }

        .music-btn-pulse {
          animation: webflow-music-pulse 2s infinite alternate ease-in-out;
        }

        .music-svg-spin {
          animation: webflow-music-spin 3s linear infinite;
        }
      ` }} />

      {/* Hidden YouTube Iframe */}
      <iframe
        ref={iframeRef}
        id="webflow-bg-music-iframe"
        width="1"
        height="1"
        src="https://www.youtube.com/embed/QqjdVDbxz6s?enablejsapi=1&version=3&loop=1&playlist=QqjdVDbxz6s&controls=0&showinfo=0&rel=0&autoplay=0"
        frameBorder="0"
        allow="autoplay"
        style={{
          position: 'fixed',
          bottom: '-100px',
          left: '-100px',
          visibility: 'hidden',
          opacity: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Music Toggle Button */}
      <button
        id="webflow-music-toggle-btn"
        onClick={togglePlay}
        style={{
          bottom: isContactOpen ? '320px' : '90px',
          transition: 'bottom 0.3s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
        }}
        className={`fixed right-8 w-12 h-12 rounded-full bg-obsidian-900/80 backdrop-blur-sm border border-gold-500/40 shadow-glass flex items-center justify-center text-gold-500 z-[9998] hover:scale-110 hover:bg-obsidian-900 hover:border-gold-500/80 active:scale-95 ${
          isPlaying ? '' : 'music-btn-pulse'
        }`}
        aria-label="Toggle Background Music"
      >
        <svg
          viewBox="0 0 24 24"
          className={`w-5 h-5 fill-current ${isPlaying ? 'music-svg-spin' : ''}`}
        >
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h6V3h-8z" />
        </svg>
      </button>

      {/* Ripple Effects Container */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="webflow-music-ripple"
          style={{
            position: 'fixed',
            left: r.x,
            top: r.y,
            width: '8px',
            height: '8px',
            background: 'rgba(201, 162, 39, 0.15)',
            border: '1.5px solid rgba(201, 162, 39, 0.6)',
            borderRadius: '50%',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            animation: 'webflow-ripple-animation 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards'
          }}
        />
      ))}
    </>
  );
};

export default BackgroundMusic;
