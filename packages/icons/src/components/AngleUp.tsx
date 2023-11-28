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
        <path d="M207 143c9.4-9.4 24.6-9.4 33.9 0L401 303c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-143-143L81 337c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L207 143z" />
      </svg>
    );
  }
);
const AngleUpIcon = SVGIcon;
AngleUpIcon.displayName = "AngleUp";
export default AngleUpIcon;
