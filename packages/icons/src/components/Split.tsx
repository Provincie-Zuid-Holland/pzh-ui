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
                <path d="M391 31c9.4-9.4 24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39h-83.5c-10.6 0-20.8 4.2-28.3 11.7L225.9 256l92.3 92.3c7.5 7.5 17.7 11.7 28.3 11.7H430l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39h-83.5c-23.3 0-45.7-9.3-62.2-25.8L182.1 280H24c-13.3 0-24-10.7-24-24s10.7-24 24-24h158.1l102.2-102.2c16.5-16.5 38.9-25.8 62.2-25.8H430l-39-39c-9.4-9.4-9.4-24.6 0-33.9z" />
            </svg>
        )
    }
)
const SplitIcon = SVGIcon
SplitIcon.displayName = 'Split'
export default SplitIcon