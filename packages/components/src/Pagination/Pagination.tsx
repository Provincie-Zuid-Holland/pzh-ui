import { useMemo } from 'react'
import ReactPaginate, { ReactPaginateProps } from 'react-paginate'

import { AngleLeft, AngleRight } from '@pzh-ui/icons'

export interface PaginationProps extends Omit<ReactPaginateProps, 'pageCount'> {
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
    ...rest
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
            breakLinkClassName="w-10 h-10 flex items-center justify-center focus:outline-none focus:ring focus:ring-pzh-blue-dark ring-offset-2 rounded"
            nextLabel={<AngleRight size={18} />}
            nextLinkClassName="w-10 h-10 flex items-center justify-center focus:outline-none focus:ring focus:ring-pzh-blue-dark ring-offset-2 rounded"
            onPageChange={handleClick}
            pageRangeDisplayed={5}
            previousLabel={<AngleLeft size={18} />}
            previousLinkClassName="w-10 h-10 flex items-center justify-center focus:outline-none focus:ring focus:ring-pzh-blue-dark ring-offset-2 rounded"
            renderOnZeroPageCount={null}
            className="text-pzh-blue flex items-center gap-2 font-bold"
            disabledClassName="text-pzh-gray-400 pointer-events-none"
            pageLinkClassName="w-full h-full pt-1 flex items-center justify-center rounded focus:outline-none focus:ring focus:ring-pzh-blue-dark ring-offset-2"
            pageClassName="w-10 h-10 rounded"
            activeClassName="border border-pzh-blue"
            {...rest}
            pageCount={pageCount}
        />
    )
}
