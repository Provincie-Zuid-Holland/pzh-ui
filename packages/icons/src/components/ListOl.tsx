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
                <path d="M55.1 56.04c0-13.26 11.64-24 24-24h32c14.2 0 24 10.74 24 24V176h16c14.2 0 24 10.8 24 24 0 13.3-9.8 24-24 24h-80c-12.36 0-24-10.7-24-24 0-13.2 11.64-24 24-24h16V80.04h-8c-12.36 0-24-10.75-24-24zm63.6 285.16c-6.6-7.4-18.3-6.9-24.05 1.2l-11.12 15.5c-7.7 10.8-22.69 13.3-33.48 5.6-10.79-7.7-13.28-22.7-5.58-33.4l11.12-15.6c23.74-33.3 72.31-35.7 99.21-4.9 21.3 23.5 20.8 60.9-1.1 84.7L118.8 432H152c13.3 0 24 10.7 24 24s-10.7 24-24 24H64c-9.53 0-18.16-5.6-21.98-14.4-3.83-8.7-2.12-18.9 4.34-25.9l72.04-78c5.3-5.8 5.4-14.6.3-20.5zM512 64c17.7 0 32 14.33 32 32 0 17.7-14.3 32-32 32H256c-17.7 0-32-14.3-32-32 0-17.67 14.3-32 32-32h256zm0 160c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32s14.3-32 32-32h256zm0 160c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32s14.3-32 32-32h256z" />
            </svg>
        )
    }
)
const ListOlIcon = SVGIcon
ListOlIcon.displayName = 'ListOl'
export default ListOlIcon
