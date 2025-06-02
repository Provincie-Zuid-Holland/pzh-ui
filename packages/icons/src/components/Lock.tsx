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
                <path d="M96 192v-64C96 57.31 153.3 0 224 0s128 57.31 128 128v64h16c44.2 0 80 35.8 80 80v160c0 44.2-35.8 80-80 80H80c-44.18 0-80-35.8-80-80V272c0-44.2 35.82-80 80-80h16zm32 0h192v-64c0-53.02-43-96-96-96-53.9 0-96 42.98-96 96v64zM32 432c0 26.5 21.49 48 48 48h288c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48H80c-26.51 0-48 21.5-48 48v160z" />
            </svg>
        )
    }
)
const LockIcon = SVGIcon
LockIcon.displayName = 'Lock'
export default LockIcon
