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
        <path d="M76.29 154.2c-2.88 3.5-7.07 5.6-11.57 4.9-4.49 1.1-8.86-.6-12.03-3.8l-48.004-48c-6.248-6.2-6.248-16.36 0-22.61 6.244-6.25 16.374-6.25 22.624 0l35.61 35.61 68.78-82.54c5.7-6.79 15.8-7.71 22.5-2.05 6.8 5.66 7.7 15.74 2.1 22.53L76.29 154.2zm0 160c-2.88 3.5-7.07 5.6-11.57 4.9-4.49 1.1-8.86-.6-12.03-3.8l-48.004-48c-6.248-6.2-6.248-16.4 0-22.6 6.244-6.3 16.374-6.3 22.624 0l35.61 35.6 68.78-82.5c5.7-7.7 15.8-7.7 22.5-2.1 6.8 5.7 7.7 15.8 2.1 22.5l-80.01 96zM191.1 96c0-8.84 8.1-16 16-16H496c8.8 0 16 7.16 16 16 0 8.8-7.2 16-16 16H207.1c-7.9 0-16-7.2-16-16zm0 160c0-8.8 8.1-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H207.1c-7.9 0-16-7.2-16-16zm-32 160c0-8.8 8.1-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H175.1c-7.9 0-16-7.2-16-16zm-96 32c-16.77 0-32-14.3-32-32s15.23-32 32-32c18.57 0 32 14.3 32 32s-13.43 32-32 32z" />
      </svg>
    );
  }
);
const ListCheckIcon = SVGIcon;
ListCheckIcon.displayName = "ListCheck";
export default ListCheckIcon;
