import { useMemo } from 'react'
import ResponsivePagination, {
    ResponsivePaginationProps,
} from 'react-responsive-pagination'

import { AngleLeft, AngleRight } from '@pzh-ui/icons'

export interface PaginationProps extends ResponsivePaginationProps {
    /** Items per page */
    limit?: number
}

export const Pagination = ({
    limit = 20,
    total = 0,
    ...rest
}: PaginationProps) => {
    const pageCount = useMemo(() => Math.ceil(total / limit), [limit, total])

    return (
        <ResponsivePagination
            data-testid="pagination"
            nextLabel={<AngleRight size={18} />}
            nextClassName="w-10 h-10 flex items-center justify-center focus:outline-none focus:ring focus:ring-pzh-focus ring-offset-2 rounded"
            previousLabel={<AngleLeft size={18} />}
            previousClassName="w-10 h-10 flex items-center justify-center focus:outline-none focus:ring focus:ring-pzh-focus ring-offset-2 rounded"
            className="text-pzh-blue flex items-center gap-2 font-bold"
            disabledItemClassName="text-pzh-gray-400 pointer-events-none"
            pageLinkClassName="w-full h-full pt-1 flex items-center justify-center rounded focus:outline-none focus:ring focus:ring-pzh-focus ring-offset-2"
            pageItemClassName="w-10 h-10 rounded"
            activeItemClassName="border border-pzh-blue"
            {...rest}
            total={pageCount}
        />
    )
}
