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
        <path d="M405.1.8c-8.4-2.8-17.4 1.7-20.2 10.1l-160 480c-2.8 8.4 1.7 17.4 10.1 20.2s17.4-1.7 20.2-10.1l160-480c2.8-8.4-1.7-17.4-10.1-20.2zM172 117.4c-5.9-6.6-16-7.2-22.6-1.3l-144 128C2 247.1 0 251.4 0 256s2 8.9 5.4 12l144 128c6.6 5.9 16.7 5.3 22.6-1.3s5.3-16.7-1.3-22.6L40.1 256l130.5-116c6.6-5.9 7.2-16 1.3-22.6zm296.1 0c-5.9 6.6-5.3 16.7 1.3 22.6l130.5 116-130.5 116c-6.6 5.9-7.2 16-1.3 22.6s16 7.2 22.6 1.3l144-128c3.4-3 5.4-7.4 5.4-12s-2-8.9-5.4-12l-144-128c-6.6-5.9-16.7-5.3-22.6 1.3z" />
      </svg>
    );
  }
);
const CodeIcon = SVGIcon;
CodeIcon.displayName = "Code";
export default CodeIcon;
