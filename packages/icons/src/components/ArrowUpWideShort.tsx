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
                viewBox="0 0 576 512"
                ref={svgRef}
                {...props}>
                <path d="M416 288h-95.1c-17.67 0-32 14.33-32 32s14.33 32 32 32H416c17.67 0 32-14.33 32-32s-14.3-32-32-32zm-64 128h-32c-17.67 0-32 14.33-32 32s14.33 32 32 32h32c17.67 0 31.1-14.33 31.1-32s-13.4-32-31.1-32zm128-256H320.9c-17.67 0-32 14.33-32 32s14.33 32 32 32H480c17.67 0 32-14.33 32-32s-14.3-32-32-32zm64-128H320.9c-17.67 0-32 14.33-32 32s14.33 32 32 32H544c17.67 0 32-14.33 32-32s-14.3-32-32-32zm-392.4 9.95c-12.12-13.26-35.06-13.26-47.19 0l-87.1 96.09C4.475 151.1 5.35 171.4 18.38 183.3a31.891 31.891 0 0021.61 8.414c8.672 0 17.3-3.504 23.61-10.39L96 145.9v302c0 17.8 14.3 32.1 32 32.1s32-14.33 32-32.03V145.9l32.4 35.4c12 13 32.2 14 45.2 2 13.03-11.95 13.9-32.22 1.969-45.27L151.6 41.95z" />
            </svg>
        )
    }
)
const ArrowUpWideShortIcon = SVGIcon
ArrowUpWideShortIcon.displayName = 'ArrowUpWideShort'
export default ArrowUpWideShortIcon
