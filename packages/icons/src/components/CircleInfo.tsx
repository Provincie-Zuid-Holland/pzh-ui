import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgCircleInfo = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448m0 480a256 256 0 1 0 0-512 256 256 0 1 0 0 512m-48-160c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32V240c0-8.8-7.2-16-16-16h-40c-8.8 0-16 7.2-16 16s7.2 16 16 16h24v96zm48-168a24 24 0 1 0 0-48 24 24 0 1 0 0 48" /></svg>);
SvgCircleInfo.displayName = "SvgCircleInfo";
export default SvgCircleInfo;