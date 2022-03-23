// https://github.com/quilljs/quill/issues/979

export function quillDecodeIndent(text: string) {
    if (!text || text.length === 0) {
        return text
    }

    const tempEl = window.document.createElement('div')
    tempEl.setAttribute('style', 'display: none;')
    tempEl.innerHTML = text
    ;['ul', 'ol'].forEach(type => {
        // Grab each list, and work on it in turn
        Array.from(tempEl.querySelectorAll(type)).forEach(outerListEl => {
            const listChildren = Array.from(outerListEl.children).filter(
                el => el.tagName === 'LI'
            )

            let lastLiLevel = 0

            const parentElementsStack: Element[] = []
            const root = document.createElement(type)

            parentElementsStack.push(root)

            listChildren.forEach(e => {
                const currentLiLevel = getQuillListLevel(e)
                e.className = e.className.replace(
                    getIndentClass(currentLiLevel),
                    ''
                )
                e.removeAttribute('class')

                const difference = currentLiLevel - lastLiLevel
                lastLiLevel = currentLiLevel

                if (difference > 0) {
                    let currentDiff = difference

                    while (currentDiff > 0) {
                        let lastLiInCurrentLevel =
                            seekLastElement(
                                parentElementsStack
                            ).lastElementChild

                        if (!lastLiInCurrentLevel) {
                            lastLiInCurrentLevel = document.createElement('li')
                            encode_addChildToCurrentParent(
                                parentElementsStack,
                                lastLiInCurrentLevel
                            )
                        }

                        const newList = document.createElement(type)
                        lastLiInCurrentLevel.appendChild(newList)
                        parentElementsStack.push(newList)

                        currentDiff--
                    }
                }

                if (difference < 0) {
                    let currentDiff = difference

                    while (currentDiff < 0) {
                        parentElementsStack.pop()

                        currentDiff++
                    }
                }

                encode_addChildToCurrentParent(parentElementsStack, e)
            })

            outerListEl.innerHTML = root.innerHTML
        })
    })

    const newContent = tempEl.innerHTML
    tempEl.remove()
    const cleanedUpContent = quillRemoveEmptyClasses(newContent)
    return cleanedUpContent
}

function seekLastElement(list: Element[]): Element {
    return list[list.length - 1]
}

function encode_addChildToCurrentParent(
    parentStack: Element[],
    child: Element
): void {
    const currentParent = seekLastElement(parentStack)
    currentParent.appendChild(child)
}

function getQuillListLevel(el: Element) {
    const className = el.className || '0'
    return +className.replace(/[^\d]/g, '')
}

function getIndentClass(level: number) {
    return `ql-indent-${level}`
}

export function quillRemoveEmptyClasses(text: string) {
    return text.replace(/class="(?:\s*)"/g, '')
}
