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
                <path d="M0 88C0 39.4 39.4 0 88 0h304c30.9 0 56 25.1 56 56v288c0 22.3-13.1 41.6-32 50.6V464h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H80c-44.2 0-80-35.8-80-80 0-2.7.1-5.4.4-8H0V88zm80 312c-17.7 0-32 14.3-32 32s14.3 32 32 32h288v-64H80zm-32-41.3c9.8-4.3 20.6-6.7 32-6.7h312c4.4 0 8-3.6 8-8V56c0-4.4-3.6-8-8-8h-40v158.7c0 13.4-15.5 20.9-26 12.5L272 176l-54 43.2c-10.5 8.4-26 .9-26-12.5V48H88c-22.1 0-40 17.9-40 40v270.7z" />
            </svg>
        )
    }
)
const BookBookmarkIcon = SVGIcon
BookBookmarkIcon.displayName = 'BookBookmark'
export default BookBookmarkIcon
