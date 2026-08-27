import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgLocationPin = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path fill="currentColor" d="M192 32c-88.9 0-160 70.6-160 156.6 0 50.3 25.9 109.4 61.4 165.6 34 53.8 74 100.5 98.6 127.4 24.6-26.9 64.6-73.7 98.6-127.4C326.1 298 352 238.9 352 188.6 352 102.7 280.9 32 192 32M0 188.6C0 84.4 86 0 192 0s192 84.4 192 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0C120.1 450.9-.1 307.9-.1 188.6z" /></svg>);
SvgLocationPin.displayName = "SvgLocationPin";
export default SvgLocationPin;