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
                <path d="M267.8 330.9l96-104c6-6.5 5.6-16.6-.9-22.6s-16.6-5.6-22.6.9L272 279.1V16c0-8.8-7.2-16-16-16s-16 7.2-16 16v263.1l-68.2-73.9c-6-6.5-16.1-6.9-22.6-.9s-6.9 16.1-.9 22.6l96 104c3 3.3 7.3 5.1 11.8 5.1s8.7-1.9 11.8-5.1zM64 32C28.7 32 0 60.7 0 96v352c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64h-48c-8.8 0-16 7.2-16 16s7.2 16 16 16h48c17.7 0 32 14.3 32 32v352c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H64z" />
            </svg>
        )
    }
)
const ArrowDownToSquareIcon = SVGIcon
ArrowDownToSquareIcon.displayName = 'ArrowDownToSquare'
export default ArrowDownToSquareIcon
