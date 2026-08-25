import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgTable = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M0 96c0-35.35 28.65-64 64-64h384c35.3 0 64 28.65 64 64v320c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64zm32 0v64h448V96c0-17.67-14.3-32-32-32H64c-17.67 0-32 14.33-32 32m0 96v112h208V192zm240 0v112h208V192zm-32 144H32v80c0 17.7 14.33 32 32 32h176zm208 112c17.7 0 32-14.3 32-32v-80H272v112z" /></svg>);
SvgTable.displayName = "SvgTable";
export default SvgTable;