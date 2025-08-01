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
                <path d="M421.7 220.3L188.5 453.4l-33.9-33.9 3.5-3.5H112c-8.8 0-16-7.2-16-16v-46.1l-3.49 3.5c-4.73 4.8-8.2 10.6-10.09 17l-22.98 78.2 78.16-23c5.5-1.9 12.2-5.4 17-10.1l33.9 33.9c-10.4 10.4-23.3 18.1-37.4 22.2L30.77 511c-8.42 2.5-17.53.2-23.74-6.9-6.21-5.3-8.532-14.4-6.054-22.9L36.37 360.9c4.16-14.1 11.79-27 22.2-37.4L291.7 90.34l130 129.96zm71-161.55c25 24.99 25 65.55 0 90.55l-48.4 48.4-130-129.98 48.4-48.4c25-24.998 65.6-24.998 90.6 0l39.4 39.43z" />
            </svg>
        )
    }
)
const PencilIcon = SVGIcon
PencilIcon.displayName = 'Pencil'
export default PencilIcon
