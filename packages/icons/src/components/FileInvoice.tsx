import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgFileInvoice = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M320 480H64c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32h128v112c0 26.5 21.5 48 48 48h112v256c0 17.7-14.3 32-32 32m-80-320c-8.8 0-16-7.2-16-16V32.5c2.8.7 5.4 2.1 7.4 4.2l115.9 115.9c2.1 2.1 3.5 4.6 4.2 7.4zM64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V163.9c0-12.7-5.1-24.9-14.1-33.9L254.1 14.1c-9-9-21.2-14.1-33.9-14.1zm0 80c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16H80c-8.8 0-16 7.2-16 16m0 64c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16H80c-8.8 0-16 7.2-16 16m160 288c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16h-64c-8.8 0-16 7.2-16 16m64-96H96v-64h192zM96 240c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h192c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32z" /></svg>);
SvgFileInvoice.displayName = "SvgFileInvoice";
export default SvgFileInvoice;