import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgItalic = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path fill="currentColor" d="M128 48c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16s-7.2 16-16 16h-92.6L142.5 448H240c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16h92.6L241.5 64H144c-8.8 0-16-7.2-16-16" /></svg>);
SvgItalic.displayName = "SvgItalic";
export default SvgItalic;