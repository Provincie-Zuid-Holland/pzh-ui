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
                <path d="M321.1 242.4c19-22.3 30.9-50.8 30.9-82.4 0-70.59-57.42-128-128-128l-192 .01c-17.67 0-32 14.31-32 32s14.33 32 32 32h16v320H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h224c70.58 0 128-57.41 128-128 0-46.71-25.4-87.21-62.9-109.61zM112 96.01h112c35.3 0 64 28.72 64 64s-28.7 64-64 64H112v-128zM256 416H112V288h144c35.3 0 64 28.71 64 63.1S291.3 416 256 416z" />
            </svg>
        )
    }
)
const BoldIcon = SVGIcon
BoldIcon.displayName = 'Bold'
export default BoldIcon
