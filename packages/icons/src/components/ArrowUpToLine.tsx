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
                viewBox="0 0 384 512"
                ref={svgRef}
                {...props}>
                <path d="M203.3 116.7c-3.1-3.1-7.2-4.7-11.3-4.7s-8.2 1.6-11.3 4.7l-144 144c-6.25 6.25-6.25 16.38 0 22.62s16.38 6.25 22.62 0L176 166.6V464c0 8.844 7.156 16 16 16s16-7.156 16-16V166.6l116.7 116.7c6.25 6.25 16.38 6.25 22.62 0s6.25-16.38 0-22.62L203.3 116.7zM368 32H16C7.156 32 0 39.16 0 48s7.156 16 16 16h352c8.8 0 16-7.16 16-16s-7.2-16-16-16z" />
            </svg>
        )
    }
)
const ArrowUpToLineIcon = SVGIcon
ArrowUpToLineIcon.displayName = 'ArrowUpToLine'
export default ArrowUpToLineIcon
