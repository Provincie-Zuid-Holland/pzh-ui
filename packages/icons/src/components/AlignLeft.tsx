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
                <path d="M256 96H32C14.33 96 0 81.67 0 64s14.33-32 32-32h224c17.7 0 32 14.33 32 32s-14.3 32-32 32zm0 256H32c-17.67 0-32-14.3-32-32s14.33-32 32-32h224c17.7 0 32 14.3 32 32s-14.3 32-32 32zM0 192c0-17.7 14.33-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.67 0-32-14.3-32-32zm416 288H32c-17.67 0-32-14.3-32-32s14.33-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
        )
    }
)
const AlignLeftIcon = SVGIcon
AlignLeftIcon.displayName = 'AlignLeft'
export default AlignLeftIcon
