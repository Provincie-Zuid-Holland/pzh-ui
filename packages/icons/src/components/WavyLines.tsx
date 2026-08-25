import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgWavyLines = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 8" width={size} height={size} ref={ref} {...props}><path fill="#16113B" d="M0 3.377c.976-.633 1.873-.897 2.691-.897 1.715 0 2.85.87 4.565.87.818 0 1.741-.237 2.744-.896V0C8.997.66 8.074.897 7.256.897c-1.715 0-2.85-.87-4.565-.87C1.873.026.976.29 0 .922zM0 7.31c.976-.634 1.873-.897 2.691-.897 1.715 0 2.85.87 4.565.87.818 0 1.741-.237 2.744-.897V3.931c-1.003.66-1.926.898-2.744.898-1.715 0-2.85-.871-4.565-.871-.818 0-1.715.264-2.691.897z" /></svg>);
SvgWavyLines.displayName = "SvgWavyLines";
export default SvgWavyLines;