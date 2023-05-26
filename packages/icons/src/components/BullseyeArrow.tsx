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
                <path d="M361.5 218.4c4.2 11.8 6.5 24.4 6.5 37.6 0 61.9-50.1 112-112 112s-112-50.1-112-112 50.1-112 112-112c13.2 0 25.9 2.3 37.6 6.5l4.9-4.9-7.6-45.8C279.6 97.3 268 96 256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160c0-12-1.3-23.6-3.8-34.9l-45.8-7.6-4.9 4.9zm97.4-8.1c3.3 14.7 5 30 5 45.7 0 114.9-93.1 208-208 208S48 370.9 48 256 141.1 48 256 48c15.7 0 31 1.7 45.7 5l38.8-38.8C314 5 285.6 0 256 0 114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256c0-29.6-5-58-14.3-84.5L459 210.3zM365 180.9l50.7 8.4c10.2 1.7 20.6-1.6 27.9-8.9l51.2-51.2c8.1-8.1 5.3-21.9-5.4-26.2L432 80l-23-57.5c-4.3-10.7-18-13.5-26.2-5.4l-51.2 51.3c-7.3 7.3-10.6 17.7-8.9 27.9l8.4 50.7-92.1 92c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l92.1-92.1z" />
            </svg>
        )
    }
)
const BullseyeArrowIcon = SVGIcon
BullseyeArrowIcon.displayName = 'BullseyeArrow'
export default BullseyeArrowIcon
