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
        viewBox="0 0 448 512"
        ref={svgRef}
        {...props}
      >
        <path d="M420.7 36.69c6.2-6.25 16.4-6.25 22.6 0 6.3 6.24 6.3 16.37 0 22.62L246.6 256l196.7 196.7c6.3 6.2 6.3 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0L224 278.6 27.31 475.3c-6.24 6.3-16.37 6.3-22.624 0-6.248-6.2-6.248-16.4 0-22.6L201.4 256 4.686 59.31c-6.248-6.24-6.248-16.37 0-22.62 6.244-6.25 16.374-6.25 22.624 0L224 233.4 420.7 36.69z" />
      </svg>
    );
  }
);
const XmarkLargeIcon = SVGIcon;
XmarkLargeIcon.displayName = "XmarkLarge";
export default XmarkLargeIcon;
