import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgCircleExclamation = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0m0 480C132.5 480 32 379.5 32 256S132.5 32 256 32s224 100.5 224 224-100.5 224-224 224m0-176c8.844 0 16-7.156 16-16V128c0-8.844-7.156-16-16-16s-16 7.2-16 16v160c0 8.8 7.2 16 16 16m0 40c-13.25 0-24 10.75-24 24s10.75 24 24 24 24-10.75 24-24-10.7-24-24-24" /></svg>);
SvgCircleExclamation.displayName = "SvgCircleExclamation";
export default SvgCircleExclamation;