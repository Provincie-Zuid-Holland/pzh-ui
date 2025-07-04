import { forwardRef, SVGProps } from 'react'
interface CustomIconProps extends SVGProps<SVGSVGElement> {
    size?: number
}
const SVGIcon = forwardRef<SVGSVGElement, CustomIconProps>(
    ({ size = 14, ...props }, svgRef) => {
        if (size) {
            props.width = size
            props.height = size
        }
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 512 512"
                ref={svgRef}
                {...props}>
                <path d="M239.6 373.1c11.94-13.05 11.06-33.31-1.969-45.27-13.55-12.42-33.76-10.52-45.22 1.973L160 366.1V64.03C160 46.33 145.67 32 128 32S96 46.33 96 64.03v302l-32.4-35.39c-11.96-12.94-32.21-13.94-45.22-1.94-13.03 11.95-13.9 32.22-1.969 45.27l87.1 96.09c12.12 13.26 35.06 13.26 47.19 0L239.6 373.1zM448 416h-50.75l73.38-73.38c9.156-9.156 11.89-22.91 6.938-34.88S460.9 288 447.1 288h-128c-16.8 0-31.1 14.3-31.1 32s14.33 32 32 32h50.75l-73.38 73.38c-9.156 9.156-11.89 22.91-6.938 34.88S307.1 480 319.1 480h127.1c19.5 0 33.8-14.3 33.8-32s-14.3-32-32-32zm44.6-206.7L412.61 49.2c-10.84-21.81-46.4-21.81-57.24 0L275.4 209.3c-7.906 15.91-1.5 35.24 14.31 43.19 15.87 7.922 35.04 1.477 42.93-14.4l7.154-14.39h88.43l7.154 14.39c6.174 12.43 23.97 23.87 42.93 14.4C494.1 244.6 500.5 225.2 492.6 209.3zm-124.8-41.9l16.2-32.7 16.22 32.63H367.8z" />
            </svg>
        )
    }
)
const ArrowDownAZIcon = SVGIcon
ArrowDownAZIcon.displayName = 'ArrowDownAZ'
export default ArrowDownAZIcon
