import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgBan = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256M92.93 126.9C64.8 162.3 48 207.2 48 256c0 114.9 93.1 208 208 208 48.8 0 93.7-16.8 129.1-44.9zM464 256c0-114.9-93.1-208-208-208-48.8 0-93.7 16.8-129.1 44.93L419.1 385.1C447.2 349.7 464 304.8 464 256" /></svg>);
SvgBan.displayName = "SvgBan";
export default SvgBan;