import React from 'react'
import { useWindowSize } from './hooks/useWindowSize'

export const AppContext = React.createContext()

const ProvideApp = ({ children }) => {

    const windowSize = useWindowSize()

    return (
        <AppContext.Provider
            value={{
                windowSize
            }}
        >
            { children }
        </AppContext.Provider>
    )
}

export default ProvideApp
