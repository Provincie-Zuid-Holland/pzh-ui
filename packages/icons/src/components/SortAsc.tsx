import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgSortAsc = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path fill="currentColor" d="M32 224c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 7-34.8l160-160c12.5-12.5 32.8-12.5 45.3 0l160 160c9.2 9.2 11.9 22.9 6.9 34.9S364.9 224 352 224z" /></svg>);
SvgSortAsc.displayName = "SvgSortAsc";
export default SvgSortAsc;