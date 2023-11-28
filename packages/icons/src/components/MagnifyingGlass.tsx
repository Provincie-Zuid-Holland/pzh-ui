import { forwardRef, SVGProps } from "react";
interface CustomIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}
const SVGIcon = forwardRef<SVGSVGElement, CustomIconProps>(
  ({ size = 14, ...props }, svgRef) => {
    if (size) {
      props.width = size;
      props.height = size;
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 512 512"
        ref={svgRef}
        {...props}
      >
        <path d="M504.1 471l-134-134c29-35.5 45-80.2 45-129 0-114.9-93.13-208-208-208S0 93.13 0 208s93.12 208 207.1 208c48.79 0 93.55-16.91 129-45.04l134 134c5.6 4.74 11.8 7.04 17.9 7.04s12.28-2.344 16.97-7.031c9.33-9.369 9.33-24.569-.87-33.969zM48 208c0-88.22 71.78-160 160-160s160 71.78 160 160-71.78 160-160 160S48 296.2 48 208z" />
      </svg>
    );
  }
);
const MagnifyingGlassIcon = SVGIcon;
MagnifyingGlassIcon.displayName = "MagnifyingGlass";
export default MagnifyingGlassIcon;
