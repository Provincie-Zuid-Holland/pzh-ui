import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgBold = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path fill="currentColor" d="M16 32C7.2 32 0 39.2 0 48s7.2 16 16 16h48v384H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h240c70.7 0 128-57.3 128-128 0-52.8-32-98.2-77.7-117.7C334 213.9 352 181.1 352 144c0-61.9-50.1-112-112-112zm80 416V256h160c53 0 96 43 96 96s-43 96-96 96zm0-384h144c44.2 0 80 35.8 80 80s-35.8 80-80 80H96z" /></svg>);
SvgBold.displayName = "SvgBold";
export default SvgBold;