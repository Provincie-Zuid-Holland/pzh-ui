import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgAlignLeft = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M272 48c8.8 0 16 7.16 16 16s-7.2 16-16 16H16C7.164 80 0 72.84 0 64s7.164-16 16-16zm160 128c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.836 0-16-7.2-16-16s7.164-16 16-16zM0 320c0-8.8 7.164-16 16-16h256c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.836 0-16-7.2-16-16m432 112c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.836 0-16-7.2-16-16s7.164-16 16-16z" /></svg>);
SvgAlignLeft.displayName = "SvgAlignLeft";
export default SvgAlignLeft;