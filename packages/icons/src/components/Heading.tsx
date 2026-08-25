import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgHeading = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M0 56c0-13.3 10.7-24 24-24h112c13.3 0 24 10.7 24 24s-10.7 24-24 24h-32v144h240V80h-32c-13.3 0-24-10.7-24-24s10.7-24 24-24h112c13.3 0 24 10.7 24 24s-10.7 24-24 24h-32v352h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H312c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V272H104v160h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V80H24C10.7 80 0 69.3 0 56" /></svg>);
SvgHeading.displayName = "SvgHeading";
export default SvgHeading;