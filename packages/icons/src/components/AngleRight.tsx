import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgAngleRight = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" /></svg>);
SvgAngleRight.displayName = "SvgAngleRight";
export default SvgAngleRight;