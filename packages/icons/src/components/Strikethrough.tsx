import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgStrikethrough = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path fill="currentColor" d="M96 147.6C96 83.8 147.8 32 211.6 32H384c8.8 0 16 7.2 16 16s-7.2 16-16 16H211.6c-46.2 0-83.6 37.4-83.6 83.6 0 40.9 29.6 75.8 69.9 82.5l121.5 20.3q11.1 1.8 21.3 5.7L496 256c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16h155.3C126.8 239.5 96 196.7 96 147.6M379 336h33.4c2.3 9.1 3.5 18.6 3.5 28.4 0 63.8-51.8 115.6-115.6 115.6H128c-8.8 0-16-7.2-16-16s7.2-16 16-16h172.4c46.2 0 83.6-37.4 83.6-83.6 0-9.9-1.7-19.5-5-28.4" /></svg>);
SvgStrikethrough.displayName = "SvgStrikethrough";
export default SvgStrikethrough;