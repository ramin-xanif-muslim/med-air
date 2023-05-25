import { capitalizeFirstLetter } from '.'

const replaceKey = (arr) => {
    const newArr = arr.map(i => {
        if(i.includes('_')) {
            let replaced = i.replace(/_/g, " ")
            return capitalizeFirstLetter(replaced)
        }else return capitalizeFirstLetter(i)
    })

    return newArr
}

export const correctBreadcrumbItems = (keyPath) => {
    const reversed = keyPath.reverse()
    return  replaceKey(reversed)
}