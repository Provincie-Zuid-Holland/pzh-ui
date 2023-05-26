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
                <path d="M272 192c0 44.2-35.8 80-80 80s-80-35.8-80-80 35.8-80 80-80 80 35.8 80 80zm-80-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm192 32c0 87.4-117 243-168.3 307.2-12.3 15.3-35.1 15.3-47.4 0C116.1 435 0 279.4 0 192 0 85.96 85.96 0 192 0c106 0 192 85.96 192 192zM192 48c-79.5 0-144 64.5-144 144 0 12.4 4.49 31.6 15.3 57.2 10.48 24.8 25.36 52.2 42.5 79.9 28.4 46.2 61.4 90 86.2 122.6 24.8-32.6 57.8-76.4 86.2-122.6 17.1-27.7 32-55.1 42.5-79.9 10.8-25.6 15.3-44.8 15.3-57.2 0-79.5-64.5-144-144-144z" />
            </svg>
        )
    }
)
const LocationDotIcon = SVGIcon
LocationDotIcon.displayName = 'LocationDot'
export default LocationDotIcon
