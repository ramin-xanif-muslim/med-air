

export function deepCopy(data) {
    let copy = JSON.parse(JSON.stringify(data))
    return copy
}