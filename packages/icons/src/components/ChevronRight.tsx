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
        viewBox="0 0 320 512"
        ref={svgRef}
        {...props}
      >
        <path d="M85.14 475.8c-3.438-3.141-5.156-7.438-5.156-11.75 0-3.891 1.406-7.781 4.25-10.86l181.1-197.1L84.23 58.86c-6-6.5-5.625-16.64.906-22.61 6.5-6 16.59-5.594 22.59.89l192 208a15.956 15.956 0 010 21.72l-192 208c-6.026 6.44-16.086 6.94-22.586.94z" />
      </svg>
    );
  }
);
const ChevronRightIcon = SVGIcon;
ChevronRightIcon.displayName = "ChevronRight";
export default ChevronRightIcon;
