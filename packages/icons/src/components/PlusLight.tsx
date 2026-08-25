import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgPlusLight = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M240 64c0-8.8-7.2-16-16-16s-16 7.2-16 16v176H32c-8.8 0-16 7.2-16 16s7.2 16 16 16h176v176c0 8.8 7.2 16 16 16s16-7.2 16-16V272h176c8.8 0 16-7.2 16-16s-7.2-16-16-16H240z" /></svg>);
SvgPlusLight.displayName = "SvgPlusLight";
export default SvgPlusLight;