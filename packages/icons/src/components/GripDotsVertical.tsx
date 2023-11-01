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
                viewBox="0 0 256 512"
                ref={svgRef}
                {...props}>
                <path d="M64 128a32 32 0 100-64 32 32 0 100 64zm0 160a32 32 0 100-64 32 32 0 100 64zm32 128a32 32 0 10-64 0 32 32 0 1064 0zm96-288a32 32 0 100-64 32 32 0 100 64zm32 128a32 32 0 10-64 0 32 32 0 1064 0zm-32 192a32 32 0 100-64 32 32 0 100 64z" />
            </svg>
        )
    }
)
const GripDotsVerticalIcon = SVGIcon
GripDotsVerticalIcon.displayName = 'GripDotsVertical'
export default GripDotsVerticalIcon
