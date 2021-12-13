import { lazy } from '@loadable/component'

export const authRoutes = [
    {
        path: '/signin',
        exact: true,
        loader: lazy(() => import('../AuthPage/SignInPage/index'))
    }, {
        path: '/signup',
        exact: true,
        loader: lazy(() => import('../AuthPage/SignUpPage/index'))
    }, {
        path: '/verifymail',
        exact: true,
        loader: lazy(() => import('../AuthPage/MailPage/index'))
    }
]

export const privateRoutes = [
    {
        path: '/',
        exact: true,
        loader: lazy(() => import('../Home/index'))
    }, {
        path: '/chat/:id',
        exact: true,
        loader: lazy(() => import('../Chat/index'))
    }, {
        path: '/group-creator',
        exact: true,
        loader: lazy(() => import('../GroupCreator/index'))
    }, {
        path: '/profile/:id',
        exact: true,
        loader: lazy(() => import('../Profile/index'))
    }, {
        path: '/friends',
        exact: true,
        loader: lazy(() => import('../Friends/index'))
    }, {
        path: '/notifications',
        exact: true,
        loader: lazy(() => import('../Notifications/index'))
    }, {
        path: '/settings',
        exact: true,
        loader: lazy(() => import('../Setting/index'))
    }
]