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
                viewBox="0 0 448 512"
                ref={svgRef}
                {...props}>
                <path d="M32 16c0-8.8-7.2-16-16-16S0 7.2 0 16v480c0 8.8 7.2 16 16 16s16-7.2 16-16V392l96.3-24.1c41.1-10.3 84.6-5.5 122.5 13.4 44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0-35.1-17.6-75.4-22-113.5-12.5L32 56V16zm0 73l108.7-27.2c30.7-7.7 63.1-4.1 91.4 10 55.3 27.7 120.4 27.7 175.8 0l8.1-4.1v278l-34.7 13c-37.9 14.2-80 12-116.2-6.1-44.7-22.4-96-28-144.5-15.9L32 359V89z" />
            </svg>
        )
    }
)
const FlagIcon = SVGIcon
FlagIcon.displayName = 'Flag'
export default FlagIcon
