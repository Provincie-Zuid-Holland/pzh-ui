import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgMessageXmark = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M448 0H64C28.75 0 0 28.75 0 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.1c0 9.836 11.02 15.55 19.12 9.7l124.88-91h144c35.25 0 64-28.75 64-63.1V63.1C512 28.75 483.3 0 448 0m16 352c0 8.75-7.25 16-16 16H288l-80 60v-60H64c-8.75 0-16-7.25-16-16V64c0-8.75 7.25-16 16-16h384c8.75 0 16 7.25 16 16zM336.1 127c-9.375-9.375-24.56-9.375-33.94 0L256 174.1 208.1 127c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L222.1 208 175 255c-9.375 9.375-9.375 24.56 0 33.94 9.375 9.371 24.55 9.379 33.94 0L256 241.9l47.03 47.03c9.375 9.371 24.55 9.379 33.94 0 9.375-9.375 9.375-24.56 0-33.94L289.9 208l47.03-47.03c9.37-9.37 9.37-24.57-.83-33.97" /></svg>);
SvgMessageXmark.displayName = "SvgMessageXmark";
export default SvgMessageXmark;