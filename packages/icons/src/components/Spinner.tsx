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
                <path d="M304 48c0 26.51-21.5 48-48 48s-48-21.49-48-48 21.5-48 48-48 48 21.49 48 48zm0 416c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zM0 256c0-26.5 21.49-48 48-48s48 21.5 48 48-21.49 48-48 48-48-21.5-48-48zm512 0c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zM74.98 437c-18.75-18.7-18.75-49.1 0-67.9 18.75-18.7 49.12-18.7 67.92 0 18.7 18.8 18.7 49.2 0 67.9-18.8 18.8-49.17 18.8-67.92 0zm67.92-294.1c-18.8 18.7-49.17 18.7-67.92 0-18.74-18.8-18.74-49.17 0-67.92 18.75-18.75 49.12-18.75 67.92 0 18.7 18.75 18.7 49.12 0 67.92zm226.2 226.2c18.8-18.7 49.2-18.7 67.9 0 18.8 18.8 18.8 49.2 0 67.9-18.7 18.8-49.1 18.8-67.9 0-18.7-18.7-18.7-49.1 0-67.9z" />
            </svg>
        )
    }
)
const SpinnerIcon = SVGIcon
SpinnerIcon.displayName = 'Spinner'
export default SpinnerIcon
