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
        <path d="M448 0H64C28.75 0 0 28.75 0 63.1v287.1c0 37 28.75 64.9 64 64.9h96v83.1c0 9.836 11.02 15.5 19.12 9.649L304 415.1h144c35.25 0 64-28.75 64-63.1V63.1C512 28.75 483.3 0 448 0zm16 352c0 8.75-7.25 16-16 16H288l-80 60v-60H64c-8.75 0-16-7.25-16-16V64c0-8.75 7.25-16 16-16h384c8.75 0 16 7.25 16 16v288zm-214.9-84c-13.7 0-25.1 11.4-25.1 26s11.4 26 25.1 26c15.5 0 26.9-11.4 26.9-26s-11.4-26-26.9-26zm28.6-172h-43.4c-32.5 0-58.3 25.6-58.3 57.8 0 10.74 9.166 19.83 20 19.83s20-9.03 20-19.83c0-9.914 8.334-18.17 18.33-18.17h43.33c10 0 18.33 8.26 18.33 18.17 0 6.607-3.334 12.39-9.166 15.7L239.3 197.6c-6.668 4.131-10 10.74-10 17.35v13.22c0 10.74 9.166 19.83 20 19.83 10.83 0 20-9.088 20-19.83v-1.67l38.33-23.13C325.2 192.7 336 173.7 336 153.8c0-32.2-25.8-57.8-58.3-57.8z" />
      </svg>
    );
  }
);
const MessageQuestionIcon = SVGIcon;
MessageQuestionIcon.displayName = "MessageQuestion";
export default MessageQuestionIcon;
