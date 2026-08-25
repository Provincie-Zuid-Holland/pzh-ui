import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgUnderline = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path fill="currentColor" d="M0 16C0 7.2 7.2 0 16 0h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H80v208c0 61.9 50.1 112 112 112s112-50.1 112-112V32h-32c-8.8 0-16-7.2-16-16s7.2-16 16-16h96c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v208c0 79.5-64.5 144-144 144S48 319.5 48 240V32H16C7.2 32 0 24.8 0 16m16 464h352c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16" /></svg>);
SvgUnderline.displayName = "SvgUnderline";
export default SvgUnderline;