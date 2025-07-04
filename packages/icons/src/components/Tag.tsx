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
                <path d="M48 32h149.5c17 0 33.2 6.74 45.2 18.75l176 175.95c25 25 25 65.6 0 90.6L285.3 450.7c-25 25-65.6 25-90.6 0l-175.95-176C6.743 262.7 0 246.5 0 229.5V80c0-26.51 21.49-48 48-48zm64 144c17.7 0 32-14.3 32-32s-14.3-32-32-32c-17.67 0-32 14.3-32 32s14.33 32 32 32z" />
            </svg>
        )
    }
)
const TagIcon = SVGIcon
TagIcon.displayName = 'Tag'
export default TagIcon
