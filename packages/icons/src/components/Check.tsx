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
                <path d="M438.6 105.4c12.5 12.5 12.5 32.7 0 45.2l-256 256c-12.5 12.5-32.7 12.5-45.2 0L9.372 278.6c-12.496-12.5-12.496-32.7 0-45.2 12.498-12.5 32.758-12.5 45.258 0L159.1 338.7l234.3-233.3c12.5-12.52 32.7-12.52 45.2 0z" />
            </svg>
        )
    }
)
const CheckIcon = SVGIcon
CheckIcon.displayName = 'Check'
export default CheckIcon
