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
                <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32s-14.3-32-32-32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32s-14.3-32-32-32zm342.6-182.6l-128-128c-12.51-12.51-32.76-12.49-45.25 0-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192c-17.7 0-32 14.3-32 32s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128c12.43-12.53 12.43-32.73-.07-45.23z" />
            </svg>
        )
    }
)
const ArrowRightFromBracketIcon = SVGIcon
ArrowRightFromBracketIcon.displayName = 'ArrowRightFromBracket'
export default ArrowRightFromBracketIcon
