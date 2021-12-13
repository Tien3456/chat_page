import React, { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import AuthRoute from './AuthRoute'
import PrivateRoutes from './PrivateRoutes'
import NoMatch from '../Error/404'
import { authRoutes, privateRoutes } from './routes'
import { actions } from '../../redux/auth/actions'
import { useDispatch, useSelector } from 'react-redux'

const RouteComponents = () => {
    
    const history = useHistory()
    const dispatch = useDispatch()

    const { status } = useSelector(state => state.api)

    useEffect(() => dispatch(actions.doCheckAuth()), [])

    useEffect(() => {
        if(status === 401) {
            history.push({
                pathname: '/signin',
                state: {
                    from: window.location.href.replace(window.location.origin, "")
                }
            })
        }
    }, [status])

    return (
        status === 500
            ? <div>Error</div>
            : <Switch>
            <Route exact path={ privateRoutes.map(route => route.path) }>
                <PrivateRoutes />
            </Route>
            {
                authRoutes.map(route => (
                    <AuthRoute
                        key={ route.path }
                        path={ route.path }
                        exact={ route.exact }
                        component={ route.loader }
                    />
                )) 
            }
            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
    )
}

export default RouteComponents
