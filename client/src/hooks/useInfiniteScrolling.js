import { useState, useEffect, useRef } from 'react'
import { useUpdateEffect } from './useUpdateEffect'

export const useInfiniteScrolling = (
    type,
    offset,
    maxOffset,
    limit,
    prevLatestItemRef,
    fetchAction
) => {

    const prevOffset = useRef()

    const [isAbleToFetch, setAbleToFetch] = useState(true)

    const handleScroll = (e) => {
        if(
            offset >= limit &&
            offset < maxOffset &&
            isAbleToFetch
        ) {
            const scrollHeight = e.target.scrollHeight
            const scrollTop = e.target.scrollTop
            const clientHeight = e.target.clientHeight

            switch(type) {
                case 'scrollDown':
                    if(scrollHeight - scrollTop === clientHeight) {
                        fetchAction()
                        setAbleToFetch(false)
                    }
                    break
                case 'scrollUp':
                    if(scrollTop === 0) {
                        fetchAction()
                        setAbleToFetch(false)
                    }
                    break
                default:
                    break
            }
        }
    }

    useUpdateEffect(() => {
        setAbleToFetch(true)
        if(
            prevLatestItemRef && 
            prevLatestItemRef.current && 
            offset >= limit &&
            prevOffset.current + 1 !== offset
        ) {
            prevLatestItemRef.current.scrollIntoView({ behavior: "auto", block: "center" })
        }
        prevOffset.current = offset
    }, [offset])

    return {
        handleScroll
    }
}