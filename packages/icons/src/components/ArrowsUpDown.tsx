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
                <path d="M246.6 361.4c6.3 6.2 9.4 14.4 9.4 22.6s-3.125 16.38-9.375 22.62l-96 96c-12.5 12.5-32.75 12.5-45.25 0l-96-96c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L96 402.8V109.3l-41.37 41.3c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l96-96c12.5-12.5 32.75-12.5 45.25 0l96 96C252.9 111.6 256 119.8 256 128s-3.125 16.38-9.375 22.62c-12.5 12.5-32.75 12.5-45.25 0L160 109.3v293.5l41.38-41.38c12.52-12.52 32.72-12.52 45.22-.02z" />
            </svg>
        )
    }
)
const ArrowsUpDownIcon = SVGIcon
ArrowsUpDownIcon.displayName = 'ArrowsUpDown'
export default ArrowsUpDownIcon
