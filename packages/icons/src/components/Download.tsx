import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgDownload = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M245.4 379.1c3 3.6 6.8 4.9 10.6 4.9s7.594-1.344 10.62-4.047l144-128c6.594-5.859 7.219-15.98 1.344-22.58-5.875-6.625-16.06-7.234-22.59-1.328L272 332.4V16c0-8.844-7.2-16-16-16s-16 7.156-16 16v316.4L122.6 228c-6.5-5.9-16.7-5.2-22.6 1.4-5.84 5.7-5.22 16.7 1.4 21.7zM448 320h-48c-8.836 0-16 7.162-16 16 0 8.836 7.164 16 16 16h48c17.67 0 32 14.33 32 32v64c0 17.67-14.33 32-32 32H64c-17.67 0-32-14.33-32-32v-64c0-17.67 14.33-32 32-32h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H64c-35.35 0-64 28.65-64 64v64c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64v-64c0-35.3-28.7-64-64-64m-8 96c0-13.25-10.75-24-24-24s-24 10.75-24 24 10.75 24 24 24 24-10.7 24-24" /></svg>);
SvgDownload.displayName = "SvgDownload";
export default SvgDownload;