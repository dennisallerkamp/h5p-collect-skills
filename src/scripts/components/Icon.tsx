import React, { useEffect } from 'react';
import './Icon.scss';

type IconProps = {
  path: string;
  alt: string;
  className?: string;
};

export default function Icon({ path, alt, className }: IconProps) {
  return (
    <>
      {path ? (
        <img
          src={path}
          alt={alt}
          draggable={false}
          className={'skill-image ' + className}
        />
      ) : (
        <p className={'skill-image ' + className} />
      )}
    </>
  );
}
