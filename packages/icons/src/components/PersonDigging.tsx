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
                <path d="M208 64a48 48 0 1196 0 48 48 0 11-96 0zM9.8 214.8c5.1-12.2 19.1-18 31.4-12.9l19.5 8.1 22.9-38.1C99.9 144.6 129.3 128 161 128c51.4 0 97 32.9 113.3 81.7l34.6 103.7 79.3 33.1 34.2-45.6c6.4-8.5 16.6-13.3 27.2-12.8s20.3 6.4 25.8 15.5l96 160c5.9 9.9 6.1 22.2.4 32.2S555.5 512 544 512H288c-11.1 0-21.4-5.7-27.2-15.2s-6.4-21.2-1.4-31.1l16-32c5.4-10.8 16.5-17.7 28.6-17.7h32l22.5-30L22.8 246.2c-12.2-5.1-18-19.1-12.9-31.4zm82.8 91.8l112 48c11.8 5 19.4 16.6 19.4 29.4v96c0 17.7-14.3 32-32 32s-32-14.3-32-32v-74.9l-60.6-26-37 111c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.3-40.4l48-144 11-33 32 13.7z" />
            </svg>
        )
    }
)
const PersonDiggingIcon = SVGIcon
PersonDiggingIcon.displayName = 'PersonDigging'
export default PersonDiggingIcon
