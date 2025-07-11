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
                viewBox="0 0 384 512"
                ref={svgRef}
                {...props}>
                <path d="M352 0c17.7 0 32 14.33 32 32s-14.3 32-32 32v10.98c0 42.42-16.9 83.12-46.9 113.12L237.3 256l67.8 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.67 0-32-14.3-32-32s14.33-32 32-32v-11c0-42.4 16.86-83.1 46.86-113.1L146.7 256l-67.84-67.9C48.86 158.1 32 117.4 32 74.98V64C14.33 64 0 49.67 0 32S14.33 0 32 0h320zM111.1 128H272c10.4-15.6 16-34.02 16-53.02V64H96v10.98c0 19 5.6 37.42 15.1 53.02zm0 256H272c-3.5-5.3-7.5-10.3-12.1-14.9L192 301.3l-67.9 67.8c-4.6 4.6-8.6 9.6-13 14.9z" />
            </svg>
        )
    }
)
const HourglassIcon = SVGIcon
HourglassIcon.displayName = 'Hourglass'
export default HourglassIcon
