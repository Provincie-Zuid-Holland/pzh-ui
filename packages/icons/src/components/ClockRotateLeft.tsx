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
                <path d="M256 0c141.4 0 256 114.6 256 256S397.4 512 256 512c-54.3 0-104.8-17-146.3-45.9-14.5-11-18.06-30.1-7.9-44.6 10.1-14.5 30-18 44.5-7.9C177.4 435.3 215.2 448 256 448c106 0 192-86 192-192 0-106.9-86-192-192-192-53.9 0-101 21.46-135.8 56.2L151 151c15.1 15.1 4.4 41-16.9 41H24c-13.25 0-24-10.7-24-24V57.94c0-21.38 25.85-32.09 40.97-16.97l34.01 34.01C121.3 28.69 185.3 0 255.1 0h.9zm0 128c13.3 0 24 10.7 24 24v94.1l64.1 64.9c10.2 9.4 10.2 24.6 0 33.1-8.5 10.2-23.7 10.2-33.1 0l-72-72c-4.5-3.6-7-9.7-7-16.1V152c0-13.3 10.7-24 24-24z" />
            </svg>
        )
    }
)
const ClockRotateLeftIcon = SVGIcon
ClockRotateLeftIcon.displayName = 'ClockRotateLeft'
export default ClockRotateLeftIcon
