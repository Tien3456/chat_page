import { useRef, useEffect } from 'react'

export const useUpdateEffect = (callback, dependencies) => {
    const firstRender = useRef(true)

    useEffect(() => {
        if(firstRender.current) {
            firstRender.current = false
            return
        }
        callback()
    }, dependencies)
    
}