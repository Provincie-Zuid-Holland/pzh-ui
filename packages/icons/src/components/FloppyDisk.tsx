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
                <path d="M224 256c-35.2 0-64 28.8-64 64s28.8 64 64 64 64-28.8 64-64-28.8-64-64-64zm209.1-126.9l-83.9-83.9c-8.1-8.14-20.4-13.2-33.1-13.2H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9c0-12.7-5.1-25-14.9-34.8zM128 80h144v80H128V80zm272 336c0 8.836-7.164 16-16 16H64c-8.836 0-16-7.164-16-16V96c0-8.838 7.164-16 16-16h16v104c0 13.25 10.75 24 24 24h192c13.3 0 24-10.7 24-24V83.88l78.25 78.25c1.15 1.07 1.75 2.67 1.75 4.17V416z" />
            </svg>
        )
    }
)
const FloppyDiskIcon = SVGIcon
FloppyDiskIcon.displayName = 'FloppyDisk'
export default FloppyDiskIcon
