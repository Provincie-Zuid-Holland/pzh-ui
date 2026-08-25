import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgGripDotsVertical = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M64 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64m0 160a32 32 0 1 0 0-64 32 32 0 1 0 0 64m32 128a32 32 0 1 0-64 0 32 32 0 1 0 64 0m96-288a32 32 0 1 0 0-64 32 32 0 1 0 0 64m32 128a32 32 0 1 0-64 0 32 32 0 1 0 64 0m-32 192a32 32 0 1 0 0-64 32 32 0 1 0 0 64" /></svg>);
SvgGripDotsVertical.displayName = "SvgGripDotsVertical";
export default SvgGripDotsVertical;