import { AngleLeft, AngleRight } from '@pzh-ui/icons'
import { useMemo } from 'react'
import ReactPaginate from 'react-paginate'

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
    initialPage,
    limit = 20,
    total = 0,
    onChange,
}: PaginationProps) => {
    const pageCount = useMemo(() => Math.ceil(total / limit), [limit, total])

    const handleClick = ({ selected }: { selected: number }) => {
        onChange(selected + 1)
    }

    return (
        <ReactPaginate
            data-testid="pagination"
            initialPage={initialPage}
            breakLabel="..."
            breakClassName="mx-1 text-pzh-green"
            nextLabel={<AngleRight size={18} />}
            nextClassName="w-8 h-8 -mt-0.5 flex items-center justify-center text-pzh-green"
            onPageChange={handleClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<AngleLeft size={18} />}
            previousClassName="w-8 h-8 -mt-0.5 flex items-center justify-center text-pzh-green"
            renderOnZeroPageCount={null}
            className="flex items-center font-bold"
            disabledClassName="text-pzh-gray-400 pointer-events-none"
            pageLinkClassName="w-full h-full flex items-center justify-center rounded-[4px] focus:outline-none focus:ring focus:ring-pzh-blue-dark ring-offset-2"
            pageClassName="w-8 h-8 mx-1 rounded-[4px] text-pzh-green"
            activeClassName="text-pzh-white bg-pzh-green"
        />
    )
}
