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
                <path d="M172.1 40.16l96-36.4c12.8-4.849 27-4.849 39.8 0l96 36.4c21.7 8.25 36.1 29.09 36.1 52.36V204.7c1.3.4 2.6.8 3.9.4l96 37.3c21.7 8.2 36.1 29.1 36.1 52.3v119.2c0 22.2-13.1 42.3-33.5 51.2l-96 42.2c-14.3 6.4-30.7 6.4-45 0L288 457.5l-113.5 49.8c-14.3 6.4-30.7 6.4-45 0l-96.04-42.2C13.13 456.2 0 436.1 0 413.9V294.7c0-23.2 14.39-44.1 36.15-52.3l95.95-37.3c1.3.4 2.6 0 3.9-.4V92.52c0-23.27 14.4-44.11 36.1-52.36zm118.7 8.48c-1.8-.69-4.7-.69-5.6 0l-78.4 29.71 80.3 31.15 82.1-31.15-78.4-29.71zM392 210.6V121l-82.4 31.6v89.2l82.4-31.2zm-237.2 40.3c-1.8-.7-4.7-.7-5.6 0l-78.39 29.7L152 311.7l81.2-31.1-78.4-29.7zm18.8 204.4l82.4-36.2v-95.9l-82.4 31.6v100.5zm169.2-174.7l81.2 31.1 81.2-31.1-78.4-29.7c-1.8-.7-4.7-.7-5.6 0l-78.4 29.7zM528 413.9v-90.7l-82.4 31.6v100.5l77.6-34.1c2.9-1.3 4.8-4.1 4.8-7.3z" />
            </svg>
        )
    }
)
const CubesIcon = SVGIcon
CubesIcon.displayName = 'Cubes'
export default CubesIcon
