import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgFileLines = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M365.3 125.3 258.8 18.8C246.7 6.742 230.5 0 213.5 0H64C28.65 0 0 28.65 0 64l.007 384c0 35.35 28.65 64 64 64H320c35.35 0 64-28.65 64-64V170.5c0-17-6.7-33.2-18.7-45.2M224 34.08c4.477 1.566 8.666 3.846 12.12 7.299l106.5 106.5c3.48 3.421 5.78 7.621 7.28 12.121H240c-8.8 0-16-7.2-16-16zM352 448c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V64c0-17.64 14.36-32 32-32h128v112c0 26.5 21.5 48 48 48h112zM96 272c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16s-7.2-16-16-16H112c-8.8 0-16 7.2-16 16m176 48H112c-8.8 0-16 7.2-16 16s7.2 16 16 16h160c8.838 0 16-7.164 16-16s-7.2-16-16-16m0 64H112c-8.8 0-16 7.2-16 16s7.2 16 16 16h160c8.838 0 16-7.164 16-16s-7.2-16-16-16" /></svg>);
SvgFileLines.displayName = "SvgFileLines";
export default SvgFileLines;