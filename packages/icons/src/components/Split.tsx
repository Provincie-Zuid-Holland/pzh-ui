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
                <path d="M507.3 372.7c6.25 6.25 6.25 16.38 0 22.62l-80 80c-3.1 3.08-7.2 4.68-11.3 4.68s-8.188-1.562-11.31-4.688c-6.25-6.25-6.25-16.38 0-22.62L457.4 400H333.3c-12.62 0-25-5.125-33.94-14.06L185.4 272H24c-8.844 0-16-7.156-16-16s7.156-16 16-16h161.4l113.9-113.9c9-9 21.3-14.1 34-14.1h124.1l-52.69-52.69c-6.25-6.25-6.25-16.38 0-22.62s16.38-6.25 22.62 0l80 80c6.25 6.25 6.25 16.38 0 22.62l-80 80C424.2 222.4 420.1 224 416 224s-8.188-1.562-11.31-4.688c-6.25-6.25-6.25-16.38 0-22.62L457.4 144H333.3a16.11 16.11 0 00-11.31 4.688L214.6 256l107.3 107.3c3 3 7.1 4.7 11.4 4.7h124.1l-52.69-52.69c-6.25-6.25-6.25-16.38 0-22.62s16.38-6.25 22.62 0l79.97 80.01z" />
            </svg>
        )
    }
)
const SplitIcon = SVGIcon
SplitIcon.displayName = 'Split'
export default SplitIcon
