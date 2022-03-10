const createMockMediaMatcher = matches => qs => ({
    matches: matches[qs] ?? false,
    addListener: () => {},
    removeListener: () => {},
})

beforeAll(() => {
    window.matchMedia = createMockMediaMatcher({
        '(min-width: 500px)': true,
        '(min-width: 1000px)': false,
    })
})
