import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgCheck = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M438.6 105.4c12.5 12.5 12.5 32.7 0 45.2l-256 256c-12.5 12.5-32.7 12.5-45.2 0L9.372 278.6c-12.496-12.5-12.496-32.7 0-45.2 12.498-12.5 32.758-12.5 45.258 0L159.1 338.7l234.3-233.3c12.5-12.52 32.7-12.52 45.2 0" /></svg>);
SvgCheck.displayName = "SvgCheck";
export default SvgCheck;