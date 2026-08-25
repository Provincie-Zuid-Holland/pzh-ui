import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgArrowUpWideShort = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M416 288h-95.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H416c17.67 0 32-14.33 32-32s-14.3-32-32-32m-64 128h-32c-17.67 0-32 14.33-32 32s14.33 32 32 32h32c17.67 0 31.1-14.33 31.1-32s-13.4-32-31.1-32m128-256H320.9c-17.67 0-32 14.33-32 32s14.33 32 32 32H480c17.67 0 32-14.33 32-32s-14.3-32-32-32m64-128H320.9c-17.67 0-32 14.33-32 32s14.33 32 32 32H544c17.67 0 32-14.33 32-32s-14.3-32-32-32m-392.4 9.95c-12.12-13.26-35.06-13.26-47.19 0l-87.1 96.09C4.475 151.1 5.35 171.4 18.38 183.3a31.9 31.9 0 0 0 21.61 8.414c8.672 0 17.3-3.504 23.61-10.39L96 145.9v302c0 17.8 14.3 32.1 32 32.1s32-14.33 32-32.03V145.9l32.4 35.4c12 13 32.2 14 45.2 2 13.03-11.95 13.9-32.22 1.969-45.27z" /></svg>);
SvgArrowUpWideShort.displayName = "SvgArrowUpWideShort";
export default SvgArrowUpWideShort;