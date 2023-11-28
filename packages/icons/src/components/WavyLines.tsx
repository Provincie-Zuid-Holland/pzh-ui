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
        width={10}
        height={8}
        fill="none"
        viewBox="0 0 10 8"
        ref={svgRef}
        {...props}
      >
        <path
          fill="currentColor"
          d="M0 3.377c.976-.633 1.873-.897 2.691-.897 1.715 0 2.85.87 4.565.87.818 0 1.741-.237 2.744-.896V0C8.997.66 8.074.897 7.256.897c-1.715 0-2.85-.87-4.565-.87C1.873.026.976.29 0 .922v2.454zM0 7.31c.976-.634 1.873-.897 2.691-.897 1.715 0 2.85.87 4.565.87.818 0 1.741-.237 2.744-.897V3.931c-1.003.66-1.926.897-2.744.897-1.715 0-2.85-.87-4.565-.87-.818 0-1.715.264-2.691.897v2.454z"
        />
      </svg>
    );
  }
);
const WavyLinesIcon = SVGIcon;
WavyLinesIcon.displayName = "WavyLines";
export default WavyLinesIcon;
