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
        <path d="M288 240h-96c-66.2 0-122 44.7-138.8 105.5-3.3-12.4-5.2-26.2-5.2-41.5 0-70.7 57.3-128 128-128h136c13.3 0 24-10.7 24-24V99.9L456.1 208 336 316.1V264c0-13.3-10.7-24-24-24h-24zm0 48v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4S288 51.4 288 64v64H176C78.8 128 0 206.8 0 304c0 78 38.6 126.2 68.7 152.1 4.1 3.5 8.1 6.6 11.7 9.3 3.2 2.4 6.2 4.4 8.9 6.2 4.5 3 8.3 5.1 10.8 6.5 2.5 1.4 5.3 1.9 8.1 1.9 10.9 0 19.7-8.9 19.7-19.7 0-6.8-3.6-13.2-8.3-18.1l-1.4-1.4c-2.4-2.3-5.1-5.1-7.7-8.6-1.7-2.3-3.4-5-5-7.9-5.3-9.7-9.5-22.9-9.5-40.2 0-53 43-96 96-96h96z" />
      </svg>
    );
  }
);
const ShareIcon = SVGIcon;
ShareIcon.displayName = "Share";
export default ShareIcon;
