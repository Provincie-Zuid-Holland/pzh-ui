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
                <path d="M472 24c0-8-3.9-15.4-10.5-19.9s-15-5.4-22.4-2.4l-40 16c-12.3 4.9-18.3 18.9-13.4 31.2s18.9 18.3 31.2 13.4l7.1-2.8V176h-16c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-16V24zM24 64C10.7 64 0 74.7 0 88s10.7 24 24 24h27.2l96 144-96 144H24c-13.3 0-24 10.7-24 24s10.7 24 24 24h40c8 0 15.5-4 20-10.7l92-138 92 138c4.5 6.7 12 10.7 20 10.7h40c13.3 0 24-10.7 24-24s-10.7-24-24-24h-27.2l-96-144 96-144H328c13.3 0 24-10.7 24-24s-10.7-24-24-24h-40c-8 0-15.5 4-20 10.7l-92 138-92-138C79.5 68 72 64 64 64H24z" />
            </svg>
        )
    }
)
const SuperscriptIcon = SVGIcon
SuperscriptIcon.displayName = 'Superscript'
export default SuperscriptIcon
