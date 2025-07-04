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
                <path d="M3.853 54.87A39.987 39.987 0 0140 32h432c15.5 0 29.5 8.9 36.1 22.87 6.7 13.97 4.6 30.5-6 42.46L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6-10.8 5.4-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9.042 97.33a40 40 0 01-5.188-42.46h-.001z" />
            </svg>
        )
    }
)
const FilterIcon = SVGIcon
FilterIcon.displayName = 'Filter'
export default FilterIcon
