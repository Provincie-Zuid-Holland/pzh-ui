import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgArrowDownToLine = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M16 480c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zm187.3-100.7c-6.2 6.2-16.4 6.2-22.6 0l-128-128c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L176 329.4V48c0-8.8 7.2-16 16-16s16 7.2 16 16v281.4l100.7-100.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" /></svg>);
SvgArrowDownToLine.displayName = "SvgArrowDownToLine";
export default SvgArrowDownToLine;