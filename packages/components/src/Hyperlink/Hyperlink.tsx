import { Link } from "react-router-dom"

export interface HyperlinkProps {
    text: string
    to: string
    icon?: any
}

export const Hyperlink = ({ text, icon: Icon, to }: HyperlinkProps) => {
    return (
        <>
            <Link
                className="inline-flex items-center underline text-pzh-green hover:text-pzh-blue-dark"
                to={to}>
                <span>{text}</span>
                {Icon ? <Icon className="ml-2 mt-[1px]" /> : null}
            </Link>
        </>
    )
}