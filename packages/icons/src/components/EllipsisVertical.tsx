import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgEllipsisVertical = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M64 360c30.93 0 56 25.1 56 56s-25.07 56-56 56-56-25.1-56-56 25.07-56 56-56m0-160c30.93 0 56 25.1 56 56s-25.07 56-56 56-56-25.1-56-56 25.07-56 56-56m0-48c-30.93 0-56-25.1-56-56 0-30.93 25.07-56 56-56s56 25.07 56 56c0 30.9-25.07 56-56 56" /></svg>);
SvgEllipsisVertical.displayName = "SvgEllipsisVertical";
export default SvgEllipsisVertical;