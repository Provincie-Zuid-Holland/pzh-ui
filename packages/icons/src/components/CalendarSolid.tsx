import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgCalendarSolid = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M96 32c0-17.67 14.3-32 32-32s32 14.33 32 32v32h128V32c0-17.67 14.3-32 32-32s32 14.33 32 32v32h48c26.5 0 48 21.49 48 48v48H0v-48c0-26.51 21.49-48 48-48h48zm352 432c0 26.5-21.5 48-48 48H48c-26.51 0-48-21.5-48-48V192h448z" /></svg>);
SvgCalendarSolid.displayName = "SvgCalendarSolid";
export default SvgCalendarSolid;