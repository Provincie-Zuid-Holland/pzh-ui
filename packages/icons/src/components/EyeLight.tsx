import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgEyeLight = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M117.2 136C160.3 96 217.6 64 288 64s127.7 32 170.8 72 71.9 88 85.2 120c-13.3 32-42.1 80-85.2 120S358.4 448 288 448s-127.7-32-170.8-72S45.3 288 32 256c13.3-32 42.1-80 85.2-120M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4 142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32m-96 224a96 96 0 1 1 192 0 96 96 0 1 1-192 0m224 0a128 128 0 1 0-256 0 128 128 0 1 0 256 0" /></svg>);
SvgEyeLight.displayName = "SvgEyeLight";
export default SvgEyeLight;