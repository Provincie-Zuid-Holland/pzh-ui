import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgAlignCenter = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M336 48c8.8 0 16 7.16 16 16s-7.2 16-16 16H112c-8.8 0-16-7.16-16-16s7.2-16 16-16zm96 128c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.836 0-16-7.2-16-16s7.164-16 16-16zM96 320c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16m336 112c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.836 0-16-7.2-16-16s7.164-16 16-16z" /></svg>);
SvgAlignCenter.displayName = "SvgAlignCenter";
export default SvgAlignCenter;