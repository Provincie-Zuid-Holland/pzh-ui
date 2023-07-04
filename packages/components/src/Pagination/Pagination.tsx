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
    total = 0,
    onChange,
}: PaginationProps) => {
    const [currPage, setCurrPage] = useState(initialPage)

    const pageCount = useMemo(() => Math.ceil(total / limit), [limit, total])

    const handleClick = (page: number) => {
        setCurrPage(page)
        onChange(page)
    }

    const renderPageNumbers = () => {
        const pageNumbers = []
        const dots = (
            <li key="dots" className="text-pzh-green">
                ...
            </li>
        )

        if (pageCount <= 10) {
            // Render all page numbers
            for (let i = 1; i <= pageCount; i++) {
                pageNumbers.push(
                    <li key={`page-${i}`}>
                        <button
                            type="button"
                            aria-label={
                                currPage === i
                                    ? `Pagina ${i} is de huidige pagina`
                                    : `Ga naar pagina ${i}`
                            }
                            aria-current={currPage === i ? 'page' : undefined}
                            className="flex items-center justify-center w-8 h-8 mx-1 rounded-[4px] font-bold text-pzh-green aria-[current=page]:text-pzh-white aria-[current=page]:bg-pzh-green focus:outline-none focus:ring focus:ring-pzh-blue-dark ring-offset-2"
                            onClick={() => handleClick(i)}
                            tabIndex={0}>
                            {i}
                        </button>
                    </li>
                )
            }
        } else {
            // Render page numbers with dots
            const visiblePages = 7 // Number of visible page buttons

            // Render first page button
            pageNumbers.push(
                <li key={`page-1`}>
                    <button
                        type="button"
                        aria-label={
                            currPage === 1
                                ? `Pagina 1 is de huidige pagina`
                                : `Ga naar pagina 1`
                        }
                        aria-current={currPage === 1 ? 'page' : undefined}
                        className="flex items-center justify-center w-8 h-8 mx-1 rounded-[4px] font-bold text-pzh-green aria-[current=page]:text-pzh-white aria-[current=page]:bg-pzh-green focus:outline-none focus:ring focus:ring-pzh-blue-dark ring-offset-2"
                        onClick={() => handleClick(1)}
                        tabIndex={0}>
                        1
                    </button>
                </li>
            )

            // Render dots if current page is after the first visible page
            if (currPage > visiblePages - 3) {
                pageNumbers.push(dots)
            }

            // Calculate range of page numbers to display
            const startPage =
                currPage <= visiblePages - 3 ? 2 : Math.max(currPage - 3, 2)
            const endPage =
                currPage >= pageCount - 3
                    ? pageCount - 1
                    : Math.min(currPage + 3, pageCount - 1)

            // Render page numbers within the range
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                    <li key={`page-${i}`}>
                        <button
                            type="button"
                            aria-label={
                                currPage === i
                                    ? `Pagina ${i} is de huidige pagina`
                                    : `Ga naar pagina ${i}`
                            }
                            aria-current={currPage === i ? 'page' : undefined}
                            className="flex items-center justify-center w-8 h-8 mx-1 rounded-[4px] font-bold text-pzh-green aria-[current=page]:text-pzh-white aria-[current=page]:bg-pzh-green focus:outline-none focus:ring focus:ring-pzh-blue-dark ring-offset-2"
                            onClick={() => handleClick(i)}
                            tabIndex={0}>
                            {i}
                        </button>
                    </li>
                )
            }

            // Render dots if current page is before the last visible page
            if (currPage < pageCount - 3) {
                pageNumbers.push(dots)
            }

            // Render last page button
            pageNumbers.push(
                <li key={`page-${pageCount}`}>
                    <button
                        type="button"
                        aria-label={
                            currPage === pageCount
                                ? `Pagina ${pageCount} is de huidige pagina`
                                : `Ga naar pagina ${pageCount}`
                        }
                        aria-current={
                            currPage === pageCount ? 'page' : undefined
                        }
                        className="flex items-center justify-center w-8 h-8 mx-1 rounded-[4px] font-bold text-pzh-green aria-[current=page]:text-pzh-white aria-[current=page]:bg-pzh-green focus:outline-none focus:ring focus:ring-pzh-blue-dark ring-offset-2"
                        onClick={() => handleClick(pageCount)}
                        tabIndex={0}>
                        {pageCount}
                    </button>
                </li>
            )
        }

        return pageNumbers
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
                {renderPageNumbers()}
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
