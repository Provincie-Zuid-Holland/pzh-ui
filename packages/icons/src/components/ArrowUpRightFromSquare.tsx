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
                <path d="M256 64c0-17.67 14.3-32 32-32h127.1c5.2 0 9.4.86 13.1 2.43 2.9 1.55 7.3 3.84 10.4 6.87 0 .05 0 .1.1.14 6.2 6.22 8.4 14.34 9.3 22.46V192c0 17.7-14.3 32-32 32s-32-14.3-32-32v-50.7L214.6 310.6c-12.5 12.5-32.7 12.5-45.2 0s-12.5-32.7 0-45.2L338.7 96H288c-17.7 0-32-14.33-32-32zM0 128c0-35.35 28.65-64 64-64h96c17.7 0 32 14.33 32 32 0 17.7-14.3 32-32 32H64v288h288v-96c0-17.7 14.3-32 32-32s32 14.3 32 32v96c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64V128z" />
            </svg>
        )
    }
)
const ArrowUpRightFromSquareIcon = SVGIcon
ArrowUpRightFromSquareIcon.displayName = 'ArrowUpRightFromSquare'
export default ArrowUpRightFromSquareIcon
