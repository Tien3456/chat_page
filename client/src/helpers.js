import Dexie from 'dexie'

export const array = {
    removeItem: (arr, filter) => {
        const item = arr.find(item => filter(item))
        const index = arr.indexOf(item)
        arr.splice(index, 1)
    }
}