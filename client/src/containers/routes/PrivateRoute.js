import React, { Suspense } from 'react'
import Loading from '../../components/Loading'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { isAuthenticated } = useSelector(state => state.auth)

    return (
        <Route
            {...rest}
            render={
                props => ( 
                    isAuthenticated
                        ? <Suspense fallback={<Loading />}>
                            <Component {...props} />
                        </Suspense>
                        : <Redirect to="/signin" />
                )
            }
        />
    )
}

export default PrivateRoute
