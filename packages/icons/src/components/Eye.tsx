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
                viewBox="0 0 576 512"
                ref={svgRef}
                {...props}>
                <path d="M279.6 160.4c2.8-.3 5.6-.4 8.4-.4 53 0 96 42.1 96 96 0 53-43 96-96 96-53.9 0-96-43-96-96 0-2.8.1-5.6.4-8.4 9.3 4.5 20.1 8.4 31.6 8.4 35.3 0 64-28.7 64-64 0-11.5-3.9-22.3-8.4-31.6zm201-47.8c46.8 43.4 78.1 94.5 92.9 131.1 3.3 7.9 3.3 16.7 0 24.6-14.8 35.7-46.1 86.8-92.9 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.58-80.6C48.62 355.1 17.34 304 2.461 268.3a31.967 31.967 0 010-24.6C17.34 207.1 48.62 156 95.42 112.6 142.5 68.84 207.2 32 288 32c80.8 0 145.5 36.84 192.6 80.6zM288 112c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144z" />
            </svg>
        )
    }
)
const EyeIcon = SVGIcon
EyeIcon.displayName = 'Eye'
export default EyeIcon
