import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgCalendar = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M112 0c8.8 0 16 7.164 16 16v48h192V16c0-8.836 7.2-16 16-16s16 7.164 16 16v48h32c35.3 0 64 28.65 64 64v320c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64V128c0-35.35 28.65-64 64-64h32V16c0-8.836 7.2-16 16-16m304 192H32v256c0 17.7 14.33 32 32 32h320c17.7 0 32-14.3 32-32zm-32-96H64c-17.67 0-32 14.3-32 32v32h384v-32c0-17.7-14.3-32-32-32" /></svg>);
SvgCalendar.displayName = "SvgCalendar";
export default SvgCalendar;