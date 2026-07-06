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
                viewBox="0 0 576 512"
                ref={svgRef}
                {...props}>
                <path d="M64 125.3c-18.6-6.6-32-24.4-32-45.3 0-26.5 21.5-48 48-48 20.9 0 38.7 13.4 45.3 32h325.4c6.6-18.6 24.4-32 45.3-32 26.5 0 48 21.5 48 48 0 20.9-13.4 38.7-32 45.3v261.4c18.6 6.6 32 24.4 32 45.3 0 26.5-21.5 48-48 48-20.9 0-38.7-13.4-45.3-32H125.3c-6.6 18.6-24.4 32-45.3 32-26.5 0-48-21.5-48-48 0-20.9 13.4-38.7 32-45.3V125.3zM125.3 96c-4.8 13.6-15.6 24.4-29.3 29.3v261.4c13.6 4.8 24.4 15.6 29.3 29.3h325.4c4.8-13.6 15.6-24.4 29.3-29.3V125.3c-13.6-4.8-24.4-15.6-29.3-29.3H125.3zM496 416a16 16 0 100 32 16 16 0 100-32zM96 432a16 16 0 10-32 0 16 16 0 1032 0zM496 64a16 16 0 100 32 16 16 0 100-32zM96 80a16 16 0 10-32 0 16 16 0 1032 0zm80 48h96c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-96c-26.5 0-48-21.5-48-48v-64c0-26.5 21.5-48 48-48zm-16 48v64c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16h-96c-8.8 0-16 7.2-16 16zm192 64c0-8.8 7.2-16 16-16h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-96c-26.5 0-48-21.5-48-48 0-8.8 7.2-16 16-16s16 7.2 16 16 7.2 16 16 16h96c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16-7.2-16-16z" />
            </svg>
        )
    }
)
const ObjectGroupIcon = SVGIcon
ObjectGroupIcon.displayName = 'ObjectGroup'
export default ObjectGroupIcon
