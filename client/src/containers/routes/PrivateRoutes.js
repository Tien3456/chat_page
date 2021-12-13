import React, { useEffect } from 'react'
import Layout from '../Layout/index'
import PrivateRoute from './PrivateRoute'
import { useHistory } from 'react-router-dom'
import { privateRoutes } from './routes'
import { useSelector } from 'react-redux'

const PrivateRoutes = () => {

    const history = useHistory()
    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if(isAuthenticated !== null && !isAuthenticated) {
            history.push({
                pathname: "/signin",
                state: {
                    from: window.location.href.replace(window.location.origin, "")
                }
            })
        }
    }, [isAuthenticated])

    return (
        isAuthenticated &&
            <Layout>
                {
                    privateRoutes.map(route => (
                        <PrivateRoute
                            key={ route.path }
                            path={ route.path }
                            exact={ true }
                            component={ route.loader }
                        />
                    ))
                }
            </Layout>
    )
}

export default PrivateRoutes
