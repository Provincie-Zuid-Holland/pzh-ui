import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgFileXmark = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path fill="currentColor" d="M0 64C0 28.7 28.7 0 64 0h149.5c17 0 33.3 6.7 45.3 18.7l106.5 106.6c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64zm208-5.5V152c0 13.3 10.7 24 24 24h93.5zm51.9 209.6c-9.4-9.4-24.6-9.4-33.9 0L192.1 302l-33.9-33.9c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l33.9 33.9-33.9 33.9c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l33.9-33.9 33.9 33.9c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L226 335.9l33.9-33.9c9.4-9.4 9.4-24.6 0-33.9" /></svg>);
SvgFileXmark.displayName = "SvgFileXmark";
export default SvgFileXmark;