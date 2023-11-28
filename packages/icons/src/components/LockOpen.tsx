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
        viewBox="0 0 576 512"
        ref={svgRef}
        {...props}
      >
        <path d="M352 192h32c35.3 0 64 28.7 64 64v192c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64V256c0-35.3 28.65-64 64-64h240v-64C304 57.31 361.3 0 432 0s128 57.31 128 128v72c0 13.3-10.7 24-24 24s-24-10.7-24-24v-72c0-44.18-35.8-80-80-80s-80 35.82-80 80v64zM48 256v192c0 8.8 7.16 16 16 16h320c8.8 0 16-7.2 16-16V256c0-8.8-7.2-16-16-16H64c-8.84 0-16 7.2-16 16z" />
      </svg>
    );
  }
);
const LockOpenIcon = SVGIcon;
LockOpenIcon.displayName = "LockOpen";
export default LockOpenIcon;
