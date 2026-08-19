/**
 * Shared motion constants — single source of truth for the institutional
 * animation cadence. Every scroll-reveal, page transition, and micro-interaction
 * draws from here so the site moves with one composed rhythm.
 */

/** Premium institutional easing — calm, decisive, never bouncy. */
export const MOTION_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Standard reveal duration for content fading up on scroll. */
export const REVEAL_DURATION = 0.6;

/** Standard reveal distance — enough to feel deliberate, not far enough to feel slow. */
export const REVEAL_Y = 22;
