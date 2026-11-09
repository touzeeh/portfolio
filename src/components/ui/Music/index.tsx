'use client';

import React from 'react';
import { MusicProvider } from './MusicContext';
import { MusicDock } from './MusicDock';

export { useMusic } from './MusicContext';
export { MusicDock } from './MusicDock';

export const BackgroundMusic: React.FC = () => {
  return (
    <MusicProvider>
      <MusicDock />
    </MusicProvider>
  );
};
