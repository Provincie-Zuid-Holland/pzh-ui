import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgAngleUp = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M207 143c9.4-9.4 24.6-9.4 33.9 0L401 303c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-143-143L81 337c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9z" /></svg>);
SvgAngleUp.displayName = "SvgAngleUp";
export default SvgAngleUp;