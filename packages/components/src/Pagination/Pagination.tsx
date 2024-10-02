import { AngleLeft, AngleRight } from '@pzh-ui/icons'
import { useMemo } from 'react'
import ResponsivePagination, {
    ResponsivePaginationProps,
} from 'react-responsive-pagination'

import { cn } from '../utils'

export interface PaginationProps extends ResponsivePaginationProps {
    /** Items per page */
    limit?: number
}

export const Pagination = ({
    limit = 20,
    total = 0,
    className,
    ...rest
}: PaginationProps) => {
    const pageCount = useMemo(() => Math.ceil(total / limit), [limit, total])

    return (
        <ResponsivePagination
            data-testid="pagination"
            nextLabel={<AngleRight size={18} className="-mt-1" />}
            nextClassName="mr-0 min-w-10 min-h-10 flex items-center justify-center focus:outline-none focus:ring focus:ring-pzh-focus ring-offset-2 rounded"
            previousLabel={<AngleLeft size={18} />}
            previousClassName="min-w-10 min-h-10 ml-0 flex items-center justify-center focus:outline-none focus:ring focus:ring-pzh-focus ring-offset-2 rounded"
            className={cn(
                'text-pzh-blue flex items-center justify-center font-bold',
                className
            )}
            disabledItemClassName="text-pzh-gray-400 pointer-events-none"
            pageLinkClassName="mt-px w-full h-full leading-10 flex items-center justify-center rounded focus:outline-none focus:ring focus:ring-pzh-focus ring-offset-2"
            pageItemClassName="min-w-10 min-h-10 h-10 rounded mx-1"
            activeItemClassName="border border-pzh-blue"
            {...rest}
            total={pageCount}
        />
    )
}
