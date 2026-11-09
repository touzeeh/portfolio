declare module 'liquid-gl' {
  export interface LiquidGLOptions {
    target: string;
    content?: string | boolean;
    snapshot?: string;
    engine?: 'auto' | 'webgpu' | 'webgl2' | 'webgl';
    resolution?: number;
    zIndex?: number;
    refraction?: number;
    aberration?: number;
    bevelDepth?: number;
    bevelWidth?: number;
    frost?: number;
    shadow?: boolean;
    specular?: boolean;
    reveal?: 'fade' | 'none';
    tilt?: boolean;
    tiltFactor?: number;
    tiltEase?: number;
    draggable?: boolean;
    interaction?: 'none' | 'fluid';
    interactionStrength?: number;
    interactionRadius?: number;
    interactionViscosity?: number;
    magnify?: number;
    tint?: string | null;
    helper?: boolean;
    on?: {
      init?: (instance: any) => void;
      dragstart?: (instance: any, info: any) => void;
      drag?: (instance: any, info: any) => void;
      dragend?: (instance: any, info: any) => void;
    };
  }

  export interface LiquidGLLens {
    destroy: () => void;
    setTint: (tint: string) => void;
    setDraggable: (enabled: boolean) => void;
  }

  function liquidGL(options?: LiquidGLOptions): LiquidGLLens;
  export default liquidGL;
}
