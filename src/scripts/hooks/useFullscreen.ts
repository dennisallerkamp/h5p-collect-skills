import { useState } from 'react';

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await exitFullscreen();
    } else {
      await enterFullscreen();
    }
  };

  const toggleClass = () => {
    const element = document.getElementById('collect-skills');
    if (element) {
      element.classList.toggle('fullscreen', !isFullscreen);
    }
  };

  const enterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
        toggleClass();
      }
    } catch (error) {
      console.error('Failed to enter fullscreen mode:', error);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
        toggleClass();
      }
    } catch (error) {
      console.error('Failed to exit fullscreen mode:', error);
    }
  };

  return {
    isFullscreen,
    toggleFullscreen,
  };
}
