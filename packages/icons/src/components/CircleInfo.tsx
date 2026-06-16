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
                viewBox="0 0 512 512"
                ref={svgRef}
                {...props}>
                <path d="M256 32a224 224 0 110 448 224 224 0 110-448zm0 480a256 256 0 100-512 256 256 0 100 512zm-48-160c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32V240c0-8.8-7.2-16-16-16h-40c-8.8 0-16 7.2-16 16s7.2 16 16 16h24v96h-32zm48-168a24 24 0 100-48 24 24 0 100 48z" />
            </svg>
        )
    }
)
const CircleInfoIcon = SVGIcon
CircleInfoIcon.displayName = 'CircleInfo'
export default CircleInfoIcon
