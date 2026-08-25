import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgUniversalAccess = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448m0 480a256 256 0 1 0 0-512 256 256 0 1 0 0 512m-16-368a16 16 0 1 1 32 0 16 16 0 1 1-32 0m64 0a48 48 0 1 0-96 0 48 48 0 1 0 96 0m-174.3 56.8c-4 7.9-.7 17.5 7.2 21.5l21.1 10.5c16 8 32.8 14 50.1 17.8v67.7l-15.7 78.4c-1.7 8.7 3.9 17.1 12.6 18.8s17.1-3.9 18.8-12.6l13.3-66.9h37.8l13.4 67.1c1.7 8.7 10.2 14.3 18.8 12.6s14.3-10.2 12.6-18.8L304 318.4v-67.7c17.3-3.9 34.1-9.9 50.1-17.8l21.1-10.5c7.9-4 11.1-13.6 7.2-21.5s-13.6-11.1-21.5-7.2l-21.1 10.5c-26 13-54.7 19.8-83.8 19.8s-57.8-6.8-83.8-19.8l-21.1-10.5c-7.9-4-17.5-.7-21.5 7.2zM240 255.4a214 214 0 0 0 32 0V304h-32z" /></svg>);
SvgUniversalAccess.displayName = "SvgUniversalAccess";
export default SvgUniversalAccess;