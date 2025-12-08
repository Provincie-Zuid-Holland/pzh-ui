import { AngleLeft, AngleRight } from '@pzh-ui/icons'
import { useEffect, useMemo, useRef } from 'react'
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
    current,
    ...rest
}: PaginationProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null)

    const pageCount = useMemo(() => Math.ceil(total / limit), [limit, total])

    useEffect(() => {
        if (typeof window === 'undefined') return
        const container = containerRef.current
        if (!container) return

        const updateAriaLabels = () => {
            const root = containerRef.current
            if (!root) return

            const links = root.querySelectorAll<HTMLAnchorElement>('a')

            links.forEach(link => {
                if (link.hasAttribute('aria-label')) return

                const text = link.textContent?.trim()
                if (!text) return

                const pageNumber = Number(text)
                if (Number.isNaN(pageNumber)) return

                link.setAttribute('aria-label', `Ga naar pagina ${pageNumber}`)
            })
        }

        const runDeferred = () => {
            window.requestAnimationFrame(updateAriaLabels)
        }

        runDeferred()

        const handleResize = () => {
            runDeferred()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [pageCount, current])

    return (
        <div ref={containerRef} data-testid="pagination">
            <ResponsivePagination
                current={current}
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
        </div>
    )
}
