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
                <path d="M96 192v-64C96 57.31 153.3 0 224 0s128 57.31 128 128v64h32c35.3 0 64 28.7 64 64v192c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64V256c0-35.3 28.65-64 64-64h32zm48 0h160v-64c0-44.18-35.8-80-80-80s-80 35.82-80 80v64zM48 448c0 8.8 7.16 16 16 16h320c8.8 0 16-7.2 16-16V256c0-8.8-7.2-16-16-16H64c-8.84 0-16 7.2-16 16v192z" />
            </svg>
        )
    }
)
const LockIcon = SVGIcon
LockIcon.displayName = 'Lock'
export default LockIcon
