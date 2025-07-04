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
                <path d="M448 336V48c0-26.51-21.5-48-48-48H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1 0-11.72-6.607-21.52-16-27.1v-81.36c9.8-9.64 16-22.24 16-36.44zM143.1 128h192c9.7 0 16.9 7.2 16.9 16s-7.2 16-16 16H143.1c-7.9 0-15.1-7.2-15.1-16s7.2-16 15.1-16zm0 64h192c9.7 0 16.9 7.2 16.9 16s-7.2 16-16 16H143.1c-7.9 0-15.1-7.2-15.1-16s7.2-16 15.1-16zM384 448H96c-17.67 0-32-14.33-32-32s14.33-32 32-32h288v64z" />
            </svg>
        )
    }
)
const BookIcon = SVGIcon
BookIcon.displayName = 'Book'
export default BookIcon
