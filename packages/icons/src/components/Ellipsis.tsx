import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgEllipsis = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path fill="currentColor" d="M448 256a32 32 0 1 1-64 0 32 32 0 1 1 64 0m-192 0a32 32 0 1 1-64 0 32 32 0 1 1 64 0M32 288a32 32 0 1 1 0-64 32 32 0 1 1 0 64" /></svg>);
SvgEllipsis.displayName = "SvgEllipsis";
export default SvgEllipsis;