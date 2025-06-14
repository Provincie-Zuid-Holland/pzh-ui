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
                <path d="M144 480C64.47 480 0 415.5 0 336c0-62.8 40.17-116.2 96.2-135.9-.13-2.7-.2-5.4-.2-8.1 0-88.4 71.6-160 160-160 59.3 0 111 32.25 138.7 80.2C409.9 101.1 428.3 96 448 96c53 0 96 42.1 96 96 0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.3 9.4-9.3 24.6 0 33.1 9.4 10.2 24.6 10.2 33.1 0l39.9-38.2V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 38.2c9.4 10.2 24.6 10.2 33.1 0 10.2-8.5 10.2-23.7 0-33.1l-80-80c-8.5-9.3-23.7-9.3-33.1 0l-80 80z" />
            </svg>
        )
    }
)
const CloudArrowUpIcon = SVGIcon
CloudArrowUpIcon.displayName = 'CloudArrowUp'
export default CloudArrowUpIcon
