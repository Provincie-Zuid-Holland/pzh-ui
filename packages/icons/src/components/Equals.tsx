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
                viewBox="0 0 448 512"
                ref={svgRef}
                {...props}>
                <path d="M48 192h352c17.69 0 32-14.32 32-32s-14.31-31.1-32-31.1H48c-17.69 0-32 14.31-32 31.1s14.31 32 32 32zm352 128H48c-17.69 0-32 14.31-32 31.1s14.31 32 32 32h352c17.69 0 32-14.32 32-32S417.7 320 400 320z" />
            </svg>
        )
    }
)
const EqualsIcon = SVGIcon
EqualsIcon.displayName = 'Equals'
export default EqualsIcon
