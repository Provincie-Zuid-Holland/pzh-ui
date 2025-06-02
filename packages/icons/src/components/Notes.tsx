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
                <path d="M128 96c0-17.7 14.3-32 32-32h256c17.7 0 32 14.3 32 32v160h-80c-26.5 0-48 21.5-48 48v80H160c-17.7 0-32-14.3-32-32V96zm318.2 192c-1.6 4.5-4.2 8.7-7.6 12.1l-74.5 74.5c-3.4 3.4-7.6 6-12.1 7.6V304c0-8.8 7.2-16 16-16h78.2zM96 96v256c0 35.3 28.7 64 64 64h181.5c17 0 33.3-6.7 45.3-18.7l74.5-74.5c12-12 18.7-28.3 18.7-45.3V96c0-35.3-28.7-64-64-64H160c-35.3 0-64 28.7-64 64zm224 400c0-8.8-7.2-16-16-16H128c-53 0-96-43-96-96V144c0-8.8-7.2-16-16-16s-16 7.2-16 16v240c0 70.7 57.3 128 128 128h176c8.8 0 16-7.2 16-16z" />
            </svg>
        )
    }
)
const NotesIcon = SVGIcon
NotesIcon.displayName = 'Notes'
export default NotesIcon
