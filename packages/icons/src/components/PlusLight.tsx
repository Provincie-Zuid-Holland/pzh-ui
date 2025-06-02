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
                <path d="M240 64c0-8.8-7.2-16-16-16s-16 7.2-16 16v176H32c-8.8 0-16 7.2-16 16s7.2 16 16 16h176v176c0 8.8 7.2 16 16 16s16-7.2 16-16V272h176c8.8 0 16-7.2 16-16s-7.2-16-16-16H240V64z" />
            </svg>
        )
    }
)
const PlusLightIcon = SVGIcon
PlusLightIcon.displayName = 'PlusLight'
export default PlusLightIcon
