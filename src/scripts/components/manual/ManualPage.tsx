import React, { ReactNode } from 'react';
import { Translation } from '@/Translations';

type ManualPageProps = {
  headline: string;
  text: string;
  animation: ReactNode;
  id: string;
};

export default function ManualPage({
  headline,
  text,
  animation,
  id,
}: ManualPageProps) {
  return (
    <>
      <h2
        id="manualModalHeadline"
        className="modal-headline manual-modal-headline"
        dangerouslySetInnerHTML={{
          __html: Translation.translate(headline, {
            '@appname': '<i>Collect Skills </i>',
          }),
        }}
      />
      <p
        id="manualModalInfoText"
        className="manual-modal-info-text"
        dangerouslySetInnerHTML={{
          __html: Translation.translate(text, {
            '@appname': '<i>Collect Skills </i>',
          }),
        }}
      />
      <div
        id="manualModalImageContainer"
        className="manual-modal-image-container"
      >
        <div className="manual_animation_container" id={id}>
          {animation}
        </div>
      </div>
    </>
  );
}
