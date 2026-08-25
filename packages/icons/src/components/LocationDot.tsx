import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgLocationDot = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M272 192c0 44.2-35.8 80-80 80s-80-35.8-80-80 35.8-80 80-80 80 35.8 80 80m-80 48c26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48 21.5 48 48 48m192-48c0 87.4-117 243-168.3 307.2-12.3 15.3-35.1 15.3-47.4 0C116.1 435 0 279.4 0 192 0 85.96 85.96 0 192 0c106 0 192 85.96 192 192M192 32c-88.4 0-160 71.6-160 160 0 15.6 5.43 37 16.56 63.4 10.91 25.9 26.24 54 43.58 82.1C126.2 392.8 166.6 445.7 192 477.6c25.4-31.9 65.8-84.8 99.9-140.1 17.3-28.1 32.6-56.2 43.5-82.1C346.6 229 352 207.6 352 192c0-88.4-71.6-160-160-160" /></svg>);
SvgLocationDot.displayName = "SvgLocationDot";
export default SvgLocationDot;