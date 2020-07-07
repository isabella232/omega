const allPages = [

    {
        id: 'overview',
        name: 'Overview',
        path: '/'
    },

    {
        id: 'analytics',
        name: 'Analytics',
        path: '/area/analytics'
    },

    {
        id: 'automation',
        name: 'Automation & Personalization',
        path: '/area/automation-personalization'
    },

    {
        id: 'channels',
        name: 'Channels',
        path: '/area/channels'
    },

    {
        id: 'cdp',
        name: 'Customer Data Platform',
        path: '/area/cdp'
    },

    {
        id: 'eme',
        name: 'Enhanced Marketer Experience',
        path: '/area/eme'
    },

    {
        id: 'pcm',
        name: 'WebMail',
        path: '/area/webmail'
    },

    {
        id: 'nonarea',
        name: 'Non-Area Teams',
        path: '/area/other'
    }

]


const areaOrderInBackend = ['cdp', 'analytics', 'automation', 'channels', 'eme', 'pcm', 'nonarea']

export { allPages, areaOrderInBackend }
