import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgAngleLeft = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0z" /></svg>);
SvgAngleLeft.displayName = "SvgAngleLeft";
export default SvgAngleLeft;