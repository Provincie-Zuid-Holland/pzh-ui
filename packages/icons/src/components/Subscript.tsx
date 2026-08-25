import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgSubscript = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M336 96c8.8 0 16-7.16 16-16s-7.2-16-16-16l-48 .01c-5.469 0-10.56 2.79-13.5 7.399L176 226.2 77.5 71.41a16.01 16.01 0 0 0-13.5-7.4L16 64C7.156 64 0 71.16 0 80s7.156 16 16 16h39.22l101.8 160-101.8 160H16c-8.844 0-16 7.2-16 16s7.156 16 16 16h48c5.469 0 10.56-2.804 13.5-7.414L176 285.8l98.5 154.8a16.02 16.02 0 0 0 13.5 7.414l48-.014c8.844 0 16-7.156 16-16s-7.2-16-16-16h-39.22L194.1 256 295.9 96zm160 384h-32V336c0-8.844-7.156-16-16-16h-32c-8.844 0-16 7.156-16 16s7.2 16 16 16h16v128h-32c-8.844 0-16 7.156-16 16s7.156 16 16 16h96c8.844 0 16-7.156 16-16s-7.2-16-16-16" /></svg>);
SvgSubscript.displayName = "SvgSubscript";
export default SvgSubscript;