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
                <path d="M480 352H346.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96c0-17.7-14.3-32-32-32zm-48 104c-13.2 0-24-10.8-24-24s10.8-24 24-24 24 10.8 24 24-10.8 24-24 24zm-198.6-81.4c6.2 6.3 14.4 9.4 22.6 9.4s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32-17.7 0-32 14.33-32 32v242.8l-73.4-73.4c-12.49-12.5-32.75-12.5-45.25 0-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z" />
            </svg>
        )
    }
)
const DownloadIcon = SVGIcon
DownloadIcon.displayName = 'Download'
export default DownloadIcon
