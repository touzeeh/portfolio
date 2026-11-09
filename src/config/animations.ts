/**
 * Animation Configuration Flags
 * Allows toggling individual animation systems on/off for performance or aesthetic testing.
 */
export const ANIMATION_FLAGS = {
  // 1. First-visit session-only intro sequence (~1.4s)
  introSequence: true,

  // 2. Scroll-driven wayfinding route line with traveling agent dot
  wayfindingRoute: true,

  // 3. Header condensing on scroll (>40px) with sliding active nav pill
  condensedHeader: true,

  // 4. Section titles mask reveal and staggered card fade-ups
  sectionReveals: true,

  // 5. Hero 3D wireframe pointer parallax & scroll camera drift
  hero3DParallax: true,

  // 6. Card 3D tilt and cursor-following spotlight glow border
  cardTiltAndSpotlight: true,

  // 7. Magnetic CTA buttons and social links (fine pointer only)
  magneticButtons: true,

  // 8. Hackathon modal scale+fade backdrop blur and trophy shine sweep
  modalTransitions: true,

  // 9. Micro-interactions: link underlines, email copied morph, button shine sweep
  microInteractions: true,

  // 10. Skill items stagger hover lift and contact ambient glow
  skillStagger: true,

  // 11. Audio-reactive ring around music button using Web Audio AnalyserNode
  audioReactiveRing: true,
} as const;

export type AnimationFlagKey = keyof typeof ANIMATION_FLAGS;
