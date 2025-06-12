import { GroupBase, StylesConfig } from 'react-select'
import { Option } from '../FieldSelect'

export const getSelectStyles = () =>
    ({
        control: ({
            backgroundColor,
            border,
            borderColor,
            boxShadow,
            ...css
        }) => ({
            ...css,
            '&:hover': {},
        }),
        input: css => ({
            ...css,
            margin: 0,
            padding: 0,
            lineHeight: 1,
            '> input': {
                boxShadow: 'none !important',
            },
        }),
        singleValue: ({ color, ...css }, state) => ({
            ...css,
            margin: 0,
            lineHeight: 1,
            ...(state.isDisabled && {
                opacity: 0.55,
            }),
        }),
        valueContainer: css => ({
            ...css,
            paddingBlock: 8,
            paddingInline: 16,
            minHeight: 48,
            whiteSpace: 'nowrap',
            overflowX: 'auto',
        }),
        option: (_, state) => ({
            fontFamily:
                state.isSelected || state.isFocused
                    ? 'Karbon Medium'
                    : 'Karbon Regular',
        }),
        menu: css => ({
            ...css,
            zIndex: 9999,
            marginTop: 2,
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.10)',
        }),
        indicatorsContainer: (css, state) => ({
            ...css,
            justifyContent: 'center',
            paddingRight: 8,
            ...(state.isDisabled && {
                opacity: 0.55,
            }),
        }),
        multiValue: () => ({}),
        multiValueLabel: () => ({}),
        multiValueRemove: () => ({}),
    }) as StylesConfig<Option, boolean, GroupBase<Option>>
