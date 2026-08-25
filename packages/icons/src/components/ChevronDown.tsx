import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgChevronDown = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M267.3 395.3c-6.2 6.2-16.4 6.2-22.6 0l-192-192c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L256 361.4l180.7-180.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" /></svg>);
SvgChevronDown.displayName = "SvgChevronDown";
export default SvgChevronDown;