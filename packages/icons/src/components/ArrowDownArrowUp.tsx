import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgArrowDownArrowUp = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M203.3 475.3c-6.2 6.2-16.4 6.2-22.6 0l-96-96c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l68.7 68.7V48c0-8.8 7.2-16 16-16s16 7.2 16 16v377.4l68.7-68.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6zm352-342.6c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L464 86.6V464c0 8.8-7.2 16-16 16s-16-7.2-16-16V86.6l-68.7 68.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l96-96c6.2-6.2 16.4-6.2 22.6 0z" /></svg>);
SvgArrowDownArrowUp.displayName = "SvgArrowDownArrowUp";
export default SvgArrowDownArrowUp;