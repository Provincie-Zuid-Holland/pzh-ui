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
                <path d="M373.1 24.97c28.1-28.117 73.7-28.117 101.8 0L487 37.09c28.1 28.12 28.1 73.71 0 101.81L289.8 336.2c-8.7 8.6-19.4 14.9-31.2 18.3l-100 28.6c-8.4 2.4-17.4 0-23.6-7-6.1-5.3-8.5-14.3-6.1-22.7l28.6-100c3.4-11.8 9.7-22.5 18.3-31.2L373.1 24.97zm67 33.94c-8.5-9.37-23.7-9.37-33.1 0L377.9 88l46.1 46.1 29.1-30c9.4-8.5 9.4-23.7 0-33.07l-13-12.12zM203.7 266.6l-16.8 58.5 58.5-16.8c4-1.1 7.5-3.2 10.4-6.1L390.1 168 344 121.9 209.8 256.2c-2.9 2.9-5 6.4-6.1 10.4zM200 64c13.3 0 24 10.75 24 24 0 13.3-10.7 24-24 24H88c-22.09 0-40 17.9-40 40v272c0 22.1 17.91 40 40 40h272c22.1 0 40-17.9 40-40V312c0-13.3 10.7-24 24-24s24 10.7 24 24v112c0 48.6-39.4 88-88 88H88c-48.6 0-88-39.4-88-88V152c0-48.6 39.4-88 88-88h112z" />
            </svg>
        )
    }
)
const PenToSquareIcon = SVGIcon
PenToSquareIcon.displayName = 'PenToSquare'
export default PenToSquareIcon
