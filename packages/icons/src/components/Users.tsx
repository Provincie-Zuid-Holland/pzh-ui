import { SVGProps, forwardRef } from 'react'

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
                viewBox="0 0 640 512"
                ref={svgRef}
                {...props}>
                <path d="M144 160a80 80 0 100-160 80 80 0 100 160zm368 0a80 80 0 100-160 80 80 0 100 160zM0 298.7C0 310.4 9.6 320 21.3 320h214.1c-26.6-23.5-43.3-57.8-43.3-96 0-7.6.7-15 1.9-22.3-13.6-6.3-28.7-9.7-44.6-9.7h-42.7C47.8 192 0 239.8 0 298.7zM405.3 320h213.4c11.8 0 21.3-9.6 21.3-21.3 0-58.9-47.8-106.7-106.7-106.7h-42.6c-15.9 0-31 3.5-44.6 9.7 1.3 7.2 1.9 14.7 1.9 22.3 0 38.2-16.8 72.5-43.3 96h.7zM320 176a48 48 0 110 96 48 48 0 110-96zm0 144a96 96 0 100-192 96 96 0 100 192zm-58.7 80h117.4c39.8 0 73.2 27.2 82.6 64H178.7c9.5-36.8 42.9-64 82.6-64zm0-48C187.7 352 128 411.7 128 485.3c0 14.7 11.9 26.7 26.7 26.7h330.6c14.7 0 26.7-11.9 26.7-26.7 0-73.6-59.7-133.3-133.3-133.3H261.3z" />
            </svg>
        )
    }
)
const UsersIcon = SVGIcon
UsersIcon.displayName = 'Users'
export default UsersIcon
