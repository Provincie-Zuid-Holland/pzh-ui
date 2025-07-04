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
                <path d="M260.7 404.7c-6.25 6.25-6.25 16.38 0 22.62 3.1 3.08 7.2 4.68 11.3 4.68s8.188-1.562 11.31-4.688l96-96c6.25-6.25 6.25-16.38 0-22.62l-96-96c-6.25-6.25-16.38-6.25-22.62 0s-6.25 16.38 0 22.62L329.4 304H16c-8.844 0-16 7.2-16 16s7.156 16 16 16h313.4l-68.7 68.7zm232.6-279.4L386.8 18.8C374.7 6.742 358.5 0 341.5 0H192c-35.3 0-64 28.65-64 64v176c0 8.8 7.2 16 16 16s16-7.2 16-16V64c0-17.67 14.33-32 32-32h128v112c0 26.5 21.5 48 48 48h112v256c0 17.67-14.33 32-32 32H192c-17.67 0-32-14.33-32-32v-48c0-8.8-7.2-16-16-16s-16 7.2-16 16v48c0 35.35 28.66 64 64 64h256c35.35 0 64-28.65 64-64V170.5c0-17-6.7-33.2-18.7-45.2zM368 160c-8.8 0-16-7.2-16-16V34.08c4.477 1.566 8.666 3.846 12.12 7.299l106.5 106.5c3.48 3.421 5.78 7.621 7.28 12.121H368z" />
            </svg>
        )
    }
)
const FileImportIcon = SVGIcon
FileImportIcon.displayName = 'FileImport'
export default FileImportIcon
