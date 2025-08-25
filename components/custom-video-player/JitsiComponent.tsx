'use client';

import { useEffect, useRef, useState } from 'react';

interface JitsiComponentProps {
  roomName?: string;
  userName?: string;
}

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

const JitsiComponent: React.FC<JitsiComponentProps> = ({
  roomName = 'MyLiveClass',
  userName = 'Student',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [jitsiLoaded, setJitsiLoaded] = useState(false);
  const apiRef = useRef<any>(null);
  roomName = 'AtulDevTest1234';
  useEffect(() => {
    const loadJitsiScript = (): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        if (window.JitsiMeetExternalAPI) {
          resolve();
          return;
        }

        const existingScript = document.getElementById('jitsi-script') as HTMLScriptElement;
        if (existingScript) {
          existingScript.onload = () => resolve();
          existingScript.onerror = () => reject();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.async = true;
        script.id = 'jitsi-script';
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
      });
    };

    const initJitsi = (): void => {
      if (!window.JitsiMeetExternalAPI || !containerRef.current) {
        console.error('Jitsi API not available');
        return;
      }

      const domain = 'meet.jit.si';
      const options = {
        roomName,
        width: '100%',
        height: 600,
        parentNode: containerRef.current,
        userInfo: {
          displayName: userName,
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      apiRef.current = api;

      api.addEventListener('videoConferenceJoined', () => {
        console.log(`${userName} has joined the conference`);
      });

      api.addEventListener('videoConferenceLeft', () => {
        console.log(`${userName} has left the conference`);
      });
    };

    loadJitsiScript()
      .then(() => {
        setJitsiLoaded(true);
        initJitsi();
      })
      .catch((err) => {
        console.error('Failed to load Jitsi script', err);
      });

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
      }
    };
  }, [roomName, userName]);

  return (
    <div>
      <h2>Join Live Video Class</h2>
      {!jitsiLoaded && <p>Loading live class...</p>}
      <div ref={containerRef} style={{ height: 600, width: '100%' }} />
    </div>
  );
};

export default JitsiComponent;
