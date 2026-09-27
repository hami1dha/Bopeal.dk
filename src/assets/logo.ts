// Explicit Vite asset import - guarantees Vite bundles and hashes this asset correctly in both dev and production
import visibleLogoImg from './images/bopael_visible_icon_1790508825247.jpg';

// Export both bundled URL and static public URL fallback
export const BOPEL_LOGO = visibleLogoImg;
export const BOPEL_FALLBACK_LOGO = '/bopael-logo.jpg';
export const BOPEL_SVG_LOGO = '/favicon.svg';
