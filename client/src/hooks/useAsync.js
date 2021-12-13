import { useState, useEffect } from 'react'

export const useAsync = (asyncFunction, immediate = true) => {

    const [isLoading, setLoading] = useState(false)
    const [value, setValue] = useState(null)

    const execute = () => {
        asyncFunction()
            .then(data => setValue(data))
    }

    useEffect(() => {
        if(immediate) {
            execute()
        }
    }, [])

    return {
        isLoading,
        value,
        execute
    }
}