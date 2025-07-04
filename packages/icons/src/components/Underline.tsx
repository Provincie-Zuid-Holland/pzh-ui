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
                <path d="M416 448H32c-17.69 0-32 14.31-32 32s14.31 32 32 32h384c17.69 0 32-14.31 32-32s-14.3-32-32-32zM48 64.01h16v160c0 88.22 71.78 159.1 160 159.1s160-71.78 160-159.1v-160h16c17.69 0 32-14.32 32-32S417.69.91 400 .91l-96-.005c-17.69 0-32 14.32-32 32s14.31 32 32 32h16v160c0 52.94-43.06 95.1-96 95.1S128 276.1 128 224V64h16c17.69 0 32-14.31 32-32S161.69 0 144 0L48 .005c-17.69 0-32 14.31-32 31.1S30.31 64.01 48 64.01z" />
            </svg>
        )
    }
)
const UnderlineIcon = SVGIcon
UnderlineIcon.displayName = 'Underline'
export default UnderlineIcon
