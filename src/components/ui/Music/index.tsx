'use client';

import React from 'react';
import { MusicProvider } from './MusicContext';
import { MusicButton } from './MusicButton';
import { LyricsPill } from './LyricsPill';

export { useMusic } from './MusicContext';
export { MusicButton } from './MusicButton';
export { LyricsPill } from './LyricsPill';

export const BackgroundMusic: React.FC = () => {
  return (
    <MusicProvider>
      <LyricsPill />
      <MusicButton />
    </MusicProvider>
  );
};
