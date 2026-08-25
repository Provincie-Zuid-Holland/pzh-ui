import { forwardRef } from 'react';
import type { IconProps } from '../Icon.types';
const SvgParagraph = forwardRef<SVGSVGElement, IconProps>(({
  size = 16,
  ...props
}, ref) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width={size} height={size} ref={ref} {...props}><path d="M32 192c0-88.4 71.6-160 160-160h232c13.3 0 24 10.7 24 24s-10.7 24-24 24h-40v376c0 13.3-10.7 24-24 24s-24-10.7-24-24V80h-48v376c0 13.3-10.7 24-24 24s-24-10.7-24-24V352h-48c-88.4 0-160-71.6-160-160m208 112V80h-48c-61.9 0-112 50.1-112 112s50.1 112 112 112z" /></svg>);
SvgParagraph.displayName = "SvgParagraph";
export default SvgParagraph;