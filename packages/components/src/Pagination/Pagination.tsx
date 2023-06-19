import { AngleLeft, AngleRight } from '@pzh-ui/icons'
import { useMemo, useState } from 'react'

export interface PaginationProps {
    /** Initial page number */
    initialPage?: number
    /** Items per page */
    limit?: number
    /** Total amount of items */
    total?: number
    /** Handle page change */
    onChange: (page: number) => void
}

export const Pagination = ({
    initialPage = 1,
    limit = 20,
    total = 100,
    onChange,
}: PaginationProps) => {
    const [currPage, setCurrPage] = useState(initialPage)

    const pageCount = useMemo(() => Math.ceil(total / limit), [limit, total])

    const handleClick = (page: number) => {
        setCurrPage(page)
        onChange(page)
    }

    return (
        <nav
            role="navigation"
            aria-label="Paginering navigatie"
            data-testid="pagination">
            <ul className="flex items-center">
                <li>
                    <button
                        type="button"
                        aria-label="Vorige pagina"
                        disabled={currPage === 1}
                        className="flex items-center justify-center w-8 h-8 -mt-0.5 mx-1 rounded-[4px] text-pzh-green disabled:text-pzh-gray-400 disabled:pointer-events-none focus:outline-none focus:ring focus:ring-pzh-blue-dark ring-offset-2"
                        onClick={() => handleClick(currPage - 1)}
                        tabIndex={0}>
                        <AngleLeft size={18} />
                    </button>
                </li>
                {[...Array(pageCount)].map((_, index) => (
                    <li key={`page-${index + 1}`}>
                        <button
                            type="button"
                            aria-label={
                                currPage === index + 1
                                    ? `Pagina ${index + 1} is de huidge pagina`
                                    : `Ga naar pagina ${index + 1}`
                            }
                            aria-current={
                                currPage === index + 1 ? 'page' : undefined
                            }
                            className="flex items-center justify-center w-8 h-8 mx-1 rounded-[4px] font-bold text-pzh-green aria-[current=page]:text-pzh-white aria-[current=page]:bg-pzh-green focus:outline-none focus:ring focus:ring-pzh-blue-dark ring-offset-2"
                            onClick={() => handleClick(index + 1)}
                            tabIndex={0}>
                            {index + 1}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        type="button"
                        aria-label="Volgende pagina"
                        disabled={currPage === pageCount}
                        className="flex items-center justify-center w-8 h-8 -mt-0.5 mx-1 rounded-[4px] text-pzh-green disabled:text-pzh-gray-400 disabled:pointer-events-none focus:outline-none focus:ring focus:ring-pzh-blue-dark ring-offset-2"
                        onClick={() => handleClick(currPage + 1)}
                        tabIndex={0}>
                        <AngleRight size={18} />
                    </button>
                </li>
            </ul>
        </nav>
    )
}
