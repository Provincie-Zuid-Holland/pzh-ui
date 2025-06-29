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
                viewBox="0 0 640 512"
                ref={svgRef}
                {...props}>
                <path d="M150.7 92.77C195 58.27 251.8 32 320 32c80.8 0 145.5 36.84 192.6 80.6 46.8 43.4 78.1 94.5 92.9 131.1 3.3 7.9 3.3 16.7 0 24.6-13.4 32.3-40.3 77.8-79.9 118.4l105.2 82.4c10.4 8.2 12.3 23.3 4.1 33.7-8.2 10.4-23.3 12.3-33.7 4.1L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196 13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zm72.4 56.73l90.3 70.8c4.2-8.5 6.6-18.1 6.6-29.2 0-10.6-3.9-21.4-8.4-30.7 2.8-.3 5.6-1.3 8.4-1.3 53 0 96 43 96 96 0 14.6-2.9 27.6-8.9 39.4l39.5 30.2c11.1-20.4 17.4-43.8 17.4-69.6 0-78.6-64.5-144-144-144-37.3 0-71.4 15.1-96.9 38.4zM320 480c-80.8 0-145.5-36.8-192.6-80.6-46.78-44.3-78.06-95.4-92.94-131.1a31.98 31.98 0 010-24.6c9.54-22.9 25.83-52.5 48.63-82.2l94.31 74.3c-.9 6.6-1.4 13.3-1.4 19.3 0 80.4 64.5 144.9 144 144.9 18.7 0 36.6-3.6 53-10.1l73.2 57.6C409.9 467.1 367.8 480 320 480z" />
            </svg>
        )
    }
)
const EyeSlashIcon = SVGIcon
EyeSlashIcon.displayName = 'EyeSlash'
export default EyeSlashIcon
