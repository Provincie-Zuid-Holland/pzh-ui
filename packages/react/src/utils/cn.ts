import { createCn } from 'cn/config'

export const cn = createCn({
    // use the `extend` key in case you want to extend instead of override
    override: {
        classGroups: {
            'font-size': [
                'text-xs',
                'text-s',
                'text-m',
                'text-l',
                'text-heading-xs',
                'text-heading-s',
                'text-heading-m',
                'text-heading-l',
                'text-heading-xl',
                'text-heading-xxl',
                'text-heading-xxxl',
            ],
        },
    },
})
