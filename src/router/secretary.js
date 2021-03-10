import { 
	requireSecretaryAuth,
} from 'Libs/router-hooks';

export default [
    {
		path: '/' + process.env.VUE_APP_SECRETARY_ROUTE,
        component: () => import('Views/layout/SecretaryLayout.vue'),
        children: [
			{
				path: '',
				redirect: 'login'
			},
			{
				path: 'login',
				name: 'secretary-login',
				component: () => import('Views/secretary/Login.vue'),
				meta: {
					title: 'login',
					breadcrumb: null
				}
			},
			{
				path: 'dash',
				name: 'secretary-dash',
				component: () => import('Views/secretary/Dashboard.vue'),
				meta: {
					title: 'dash',
					breadcrumb: null,
					middleware: [requireSecretaryAuth],
					rule: 'editor'
				}
			},
			{
				path: 'dossier/new',
				name: 'secretary-dossier-new',
				component: () => import('Views/secretary/DossierNew.vue'),
				meta: {
					title: 'new dossier',
					breadcrumb: null,
					middleware: [requireSecretaryAuth]
				}
			},
			{
				path: 'dossier/:dossierId',
				name: 'secretary-dossier-detail',
				component: () => import('Views/secretary/DossierDetail.vue'),
				meta: {
					title: 'detail dossier',
					breadcrumb: null,
					middleware: [requireSecretaryAuth]
				}
			},
			{
				path: 'dossier/:dossierId/edit',
				name: 'secretary-dossier-edit',
				component: () => import('Views/secretary/DossierEdit.vue'),
				meta: {
					title: 'edit dossier',
					breadcrumb: null,
					middleware: [requireSecretaryAuth]
				}
			}
		]
	}
]
