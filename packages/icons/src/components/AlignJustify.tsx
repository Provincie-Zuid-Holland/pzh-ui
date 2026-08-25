import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgAlignJustify = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M432 48c8.8 0 16 7.16 16 16s-7.2 16-16 16H16C7.164 80 0 72.84 0 64s7.164-16 16-16zM0 192c0-8.8 7.164-16 16-16h416c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.836 0-16-7.2-16-16m432 112c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.836 0-16-7.2-16-16s7.164-16 16-16zm0 128c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.836 0-16-7.2-16-16s7.164-16 16-16z" /></svg>);
SvgAlignJustify.displayName = "SvgAlignJustify";
export default SvgAlignJustify;