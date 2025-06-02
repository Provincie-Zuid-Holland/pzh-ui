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
                viewBox="0 0 448 512"
                ref={svgRef}
                {...props}>
                <path d="M246.2 46.9c-3.7-9-12.4-14.9-22.2-14.9s-18.5 5.9-22.2 14.9L44.6 432H24c-13.3 0-24 10.7-24 24s10.7 24 24 24h112c13.3 0 24-10.7 24-24s-10.7-24-24-24H96.5l32.7-80h189.7l32.7 80H312c-13.3 0-24 10.7-24 24s10.7 24 24 24h112c13.3 0 24-10.7 24-24s-10.7-24-24-24h-20.6L246.2 46.9zM299.3 304H148.7L224 119.5 299.3 304z" />
            </svg>
        )
    }
)
const FontIcon = SVGIcon
FontIcon.displayName = 'Font'
export default FontIcon
