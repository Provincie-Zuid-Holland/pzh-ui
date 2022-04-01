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
                viewBox="0 0 448 512"
                ref={svgRef}
                {...props}>
                <path d="M416 288c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.67 0-32-14.3-32-32s14.33-32 32-32h384zm0-128c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.67 0-32-14.3-32-32s14.33-32 32-32h384z" />
            </svg>
        )
    }
)
const GripLinesIcon = SVGIcon
GripLinesIcon.displayName = 'GripLines'
export default GripLinesIcon
