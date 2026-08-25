import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgMessageCheck = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="m311.3 136.4-79.1 92.3-29.7-29.7c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l48 48c4.5 4.5 10.62 7.031 16.97 7.031.313 0 .625 0 .906-.031 6.664-.24 12.964-3.24 17.264-8.34l96-112c8.625-10.06 7.469-25.22-2.594-33.84-10.006-8.56-25.206-7.46-33.806 2.64M447.1 0h-384C27.85 0-.9 28.75-.9 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.1c0 9.836 11.02 15.55 19.12 9.7l124.9-93.7h144c35.25 0 64-28.75 64-63.1V63.1C511.1 28.75 483.2 0 447.1 0M464 352c0 8.75-7.25 16-16 16H288l-80 60v-60H64c-8.75 0-16-7.25-16-16V64c0-8.75 7.25-16 16-16h384c8.75 0 16 7.25 16 16z" /></svg>);
SvgMessageCheck.displayName = "SvgMessageCheck";
export default SvgMessageCheck;