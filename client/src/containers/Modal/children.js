import { lazy } from '@loadable/component'

export const children = [
    {
        childName: 'groupCreator',
        component: lazy(() => import('../GroupCreator/index'))
    }, {
        childName: 'groupMembers',
        component: lazy(() => import('../GroupChatMembers/index'))
    }, {
        childName: 'file',
        component: lazy(() => import('../File/index'))
    }, {
        childName: 'profile',
        component: lazy(() => import('../Profile/index'))
    }, {
        childName: 'friends',
        component: lazy(() => import('../Friends/index'))
    }, {
        childName: 'notifications',
        component: lazy(() => import('../Notifications/index'))
    }
]