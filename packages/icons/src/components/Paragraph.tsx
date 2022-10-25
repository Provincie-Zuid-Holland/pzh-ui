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
                <path d="M448 63.1c0 18.57-14.3 32.9-32 32.9h-32v352c0 17.67-14.33 32-31.1 32S320 465.7 320 448V96h-32v352c0 17.67-14.33 32-31.1 32S224 465.7 224 448v-96h-25.1c-83.57 0-158.2-61.11-166.1-144.3C23.66 112.3 98.44 32 191.1 32h224c18.6 0 32.9 14.33 32.9 31.1z" />
            </svg>
        )
    }
)
const ParagraphIcon = SVGIcon
ParagraphIcon.displayName = 'Paragraph'
export default ParagraphIcon
