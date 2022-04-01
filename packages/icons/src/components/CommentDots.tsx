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
                viewBox="0 0 512 512"
                ref={svgRef}
                {...props}>
                <path d="M256 31.1C114.6 31.1.9 124.22.9 239.1c0 49.62 21.35 94.98 56.97 130.7-12.5 50.37-54.27 95.27-54.77 95.77-2.25 2.25-2.875 5.734-1.5 8.734 1.249 3 4.021 4.766 7.271 4.766 66.25 0 115.1-31.76 140.6-51.39 32.63 12.25 69.02 19.39 107.4 19.39 141.4 0 255.1-93.13 255.1-207.1S397.4 31.1 256 31.1zm-128.9 240c-17.75 0-32-14.25-32-31.1s14.25-32 32-32 32 14.25 32 32-13.4 31.1-32 31.1zm128.9 0c-17.75 0-31.1-14.25-31.1-31.1s14.25-32 31.1-32 31.1 14.25 31.1 32-13.3 31.1-31.1 31.1zm127.1 0c-17.75 0-32-14.25-32-31.1s14.25-32 32-32 32 14.25 32 32-13.4 31.1-32 31.1z" />
            </svg>
        )
    }
)
const CommentDotsIcon = SVGIcon
CommentDotsIcon.displayName = 'CommentDots'
export default CommentDotsIcon