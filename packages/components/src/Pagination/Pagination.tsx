import { AngleLeft, AngleRight } from '@pzh-ui/icons'
import { useMemo } from 'react'
import ResponsivePagination, {
    ResponsivePaginationProps,
    srOnlySpanLabel,
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
            labelBehaviour={srOnlySpanLabel({
                a11yActiveLabel: '(huidige pagina)',
            })}
            nextLabel={<AngleRight size={18} />}
            ariaNextLabel="Volgende pagina"
            nextClassName="mr-0 min-w-10 min-h-10"
            previousLabel={<AngleLeft size={18} />}
            ariaPreviousLabel="Vorige pagina"
            previousClassName="min-w-10 min-h-10 ml-0"
            className={cn(
                'text-pzh-blue-500 flex items-center justify-center font-bold',
                className
            )}
            disabledItemClassName="text-pzh-gray-400 pointer-events-none"
            pageLinkClassName="w-full h-10 leading-10 flex items-center justify-center rounded focus:outline-none focus:ring-2 focus:ring-pzh-focus ring-offset-2"
            pageItemClassName="min-w-10 min-h-10 h-10 rounded mx-1"
            activeItemClassName="[&_a]:border [&_a]:border-pzh-blue-500"
            {...rest}
            total={pageCount}
        />
    )
}
