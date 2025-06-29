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
                <path d="M232.5 5.171a56.026 56.026 0 0147 0L498.1 106.2c8.5 3.9 13.9 12.4 13.9 20.9 0 10.2-5.4 18.7-13.9 22.7l-218.6 101c-14.9 6.9-32.1 6.9-47 0l-218.57-101C5.438 145.8 0 137.3 0 127.1c0-8.5 5.437-17 13.93-20.9L232.5 5.171zM498.1 234.2c8.5 3.9 13.9 12.4 13.9 20.9 0 10.2-5.4 18.7-13.9 22.7l-218.6 101c-14.9 6.9-32.1 6.9-47 0l-218.57-101C5.438 273.8 0 265.3 0 255.1c0-8.5 5.437-17 13.93-20.9l53.2-24.6 151.97 70.2c23.4 10.9 50.4 10.9 73.8 0l152-70.2 53.2 24.6zM292.9 407.8l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 20.9 0 10.2-5.4 18.7-13.9 22.7l-218.6 101c-14.9 6.9-32.1 6.9-47 0l-218.57-101C5.438 401.8 0 393.3 0 383.1c0-8.5 5.437-17 13.93-20.9l53.2-24.6 151.97 70.2c23.4 10.9 50.4 10.9 73.8 0z" />
            </svg>
        )
    }
)
const LayerGroupIcon = SVGIcon
LayerGroupIcon.displayName = 'LayerGroup'
export default LayerGroupIcon
