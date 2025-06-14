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
                <path d="M572.6 270.3l-96 192c-5.4 10.9-16.5 17.7-29.5 17.7H64c-35.35 0-64-28.66-64-64V96c0-35.34 28.65-64 64-64h117.5c16.97 0 33.25 6.742 45.26 18.75L275.9 96H416c35.35 0 64 28.66 64 64v32h-48v-32c0-8.824-7.178-16-16-16H256l-63.2-59.31c-3-3.03-7-4.69-11.3-4.69H64c-8.82 0-16 7.18-16 16v288l71.16-142.3A31.976 31.976 0 01147.8 224H544c23.7 0 39.2 25 28.6 46.3z" />
            </svg>
        )
    }
)
const FolderOpenIcon = SVGIcon
FolderOpenIcon.displayName = 'FolderOpen'
export default FolderOpenIcon
