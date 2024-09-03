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
        <path d="M336 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h121.4L212.7 276.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L480 54.6V176c0 8.8 7.2 16 16 16s16-7.2 16-16V16c0-8.8-7.2-16-16-16H336zM64 32C28.7 32 0 60.7 0 96v352c0 35.3 28.7 64 64 64h352c35.3 0 64-28.7 64-64V304c0-8.8-7.2-16-16-16s-16 7.2-16 16v144c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h144c8.8 0 16-7.2 16-16s-7.2-16-16-16H64z" />
      </svg>
    );
  }
);
const ArrowUpRightFromSquareLightIcon = SVGIcon;
ArrowUpRightFromSquareLightIcon.displayName = "ArrowUpRightFromSquareLight";
export default ArrowUpRightFromSquareLightIcon;
