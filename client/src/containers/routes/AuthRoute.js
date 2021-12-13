import React, { Suspense } from 'react'
import Loading from '../../components/Loading'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthRoute = ({ component: Component, ...rest }) => {

    const location = useLocation
    const { isAuthenticated } = useSelector(state => state.auth)

    return (
        isAuthenticated !== null &&
            <Route
                {...rest}
                render={
                    props => (
                        isAuthenticated
                            ? <Redirect
                                to={
                                    location.state && location.state.from
                                        ? location.state.from
                                        : "/"
                                }
                            />
                            : <Suspense fallback={<Loading />}>
                                <Component {...props} />
                            </Suspense>
                    )
                }
            />
    )
}

export default AuthRoute