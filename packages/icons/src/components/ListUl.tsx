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
                <path d="M16 96c0-26.51 21.49-48 48-48s48 21.49 48 48c0 26.5-21.49 48-48 48s-48-21.5-48-48zm464-32c17.7 0 32 14.33 32 32 0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32 0-17.67 14.3-32 32-32h288zm0 160c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32h288zm0 160c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32h288zM16 416c0-26.5 21.49-48 48-48s48 21.5 48 48-21.49 48-48 48-48-21.5-48-48zm96-160c0 26.5-21.49 48-48 48s-48-21.5-48-48 21.49-48 48-48 48 21.5 48 48z" />
            </svg>
        )
    }
)
const ListUlIcon = SVGIcon
ListUlIcon.displayName = 'ListUl'
export default ListUlIcon
