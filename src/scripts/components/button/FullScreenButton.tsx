import React from "react";
import { Translation } from "@/Translations";
import "./FullScreenButton.scss";
import { useFullscreen } from "@hooks/useFullscreen";

function FullScreenButton() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const getClassNames = () => {
    let className = 'btn';

    if (isFullscreen) {
      className += ' fullscreen-exit-button';
    }
    else {
      className += ' fullscreen-button';
    }

    return className;
  };

  return (
    <button className={getClassNames()}
      aria-label={Translation.translate('button_label_fullscreen')}
      tabIndex={0}
      onClick={toggleFullscreen}>
    </button>
  );
}

export default FullScreenButton;
