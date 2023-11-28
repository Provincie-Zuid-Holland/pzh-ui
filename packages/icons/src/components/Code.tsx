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
        viewBox="0 0 640 512"
        ref={svgRef}
        {...props}
      >
        <path d="M414.8 40.79l-128 448.01c-4.9 17-22.6 26.8-39.6 22-17-4.9-26.8-22.6-22-39.6l128-447.99c4.9-16.994 22.6-26.834 39.6-21.978 17 4.855 26.8 22.568 22 39.558zm103.8 80.61l112 112c12.5 12.5 12.5 32.7 0 45.2l-112 112c-12.5 12.5-32.7 12.5-45.2 0s-12.5-32.7 0-45.2l89.3-89.4-89.3-89.4c-12.5-12.5-12.5-32.7 0-45.2s32.7-12.5 45.2 0zm-352 45.2L77.25 256l89.35 89.4c12.5 12.5 12.5 32.7 0 45.2s-32.7 12.5-45.2 0L9.372 278.6c-12.496-12.5-12.496-32.7 0-45.2l112.028-112c12.5-12.5 32.7-12.5 45.2 0s12.5 32.7 0 45.2z" />
      </svg>
    );
  }
);
const CodeIcon = SVGIcon;
CodeIcon.displayName = "Code";
export default CodeIcon;
