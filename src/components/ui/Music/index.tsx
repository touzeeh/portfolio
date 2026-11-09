'use client';

import React from 'react';
import { MusicProvider, useMusic } from './MusicContext';
import { MusicDock } from './MusicDock';

export { useMusic, MusicProvider };
export { MusicDock };

export const BackgroundMusic: React.FC = () => {
  return <MusicDock />;
};
