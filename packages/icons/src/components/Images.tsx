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
                <path d="M512 32H160c-35.35 0-64 28.65-64 64v224c0 35.35 28.65 64 64 64h352c35.35 0 64-28.65 64-64V96c0-35.35-28.7-64-64-64zm16 288c0 8.822-7.178 16-16 16h-16L386.7 175.1c-3-4.4-8-7.1-13.4-7.1a15.978 15.978 0 00-13.31 7.125l-62.74 94.11L274.9 238.6c-3-4.2-7.8-6.6-12.9-6.6a16.007 16.007 0 00-12.93 6.574L176 336h-16c-8.822 0-16-7.178-16-16V96c0-8.822 7.178-16 16-16h352c8.822 0 16 7.178 16 16v224zM224 112c-17.67 0-32 14.33-32 32s14.33 32 32 32c17.68 0 32-14.33 32-32s-14.3-32-32-32zm232 368H120C53.83 480 0 426.2 0 360V120c0-13.2 10.75-24 24-24s24 10.8 24 24v240c0 39.7 32.3 72 72 72h336c13.25 0 24 10.75 24 24s-10.7 24-24 24z" />
            </svg>
        )
    }
)
const ImagesIcon = SVGIcon
ImagesIcon.displayName = 'Images'
export default ImagesIcon
