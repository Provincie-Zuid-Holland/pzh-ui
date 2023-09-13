import { SVGProps, forwardRef } from 'react'

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
                <path d="M352 120c0-13.3 10.7-24 24-24h176c13.3 0 24 10.7 24 24v176c0 13.3-10.7 24-24 24s-24-10.7-24-24V177.9L337 369c-9.4 9.4-24.6 9.4-33.9 0l-111-111L41 409c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L175 207c9.4-9.4 24.6-9.4 33.9 0l111 111 174.2-174H376c-13.3 0-24-10.7-24-24z" />
            </svg>
        )
    }
)
const ArrowTrendUpIcon = SVGIcon
ArrowTrendUpIcon.displayName = 'ArrowTrendUp'
export default ArrowTrendUpIcon
