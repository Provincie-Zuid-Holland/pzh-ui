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
                <path d="M215.1 272h-136c-12.94 0-24.63 7.797-29.56 19.75-4.07 11.95-1.32 25.75 7.83 34.85l30.06 30.06-78.06 78.07c-12.5 12.5-12.5 32.75-.001 45.25l22.62 22.62c12.5 12.5 32.76 12.5 45.26.001l78.06-78.07 30.06 30.06a31.983 31.983 0 0022.63 9.367 31.974 31.974 0 0032-31.99V296c-.899-13.3-10.699-24-24.899-24zm80.9-32h136c12.94 0 24.63-7.797 29.56-19.75a31.952 31.952 0 00-6.938-34.87l-30.06-30.06 78.06-78.07c12.5-12.5 12.5-32.76 0-45.26l-22.62-22.62c-12.5-12.5-32.76-12.5-45.26 0l-78.06 78.07-30.06-30.06c-9.156-9.141-22.87-11.84-34.87-6.937a31.974 31.974 0 00-19.75 29.56v135.1C272 229.3 282.7 240 296 240z" />
            </svg>
        )
    }
)
const DownLeftAndUpRightToCenterIcon = SVGIcon
DownLeftAndUpRightToCenterIcon.displayName = 'DownLeftAndUpRightToCenter'
export default DownLeftAndUpRightToCenterIcon
