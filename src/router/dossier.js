
import {
	// getMyDossierHook,
	// requireDossierAuth,
	requireDossierAuthRegistered,
	requireDossierAuthNoRegistered
	// requireNoDossierAuth
} from 'Libs/router-hooks';

export default [
    {
		path: '/' + process.env.VUE_APP_DOSSIER_ROUTE,
        component: () => import('Views/page/index'), // component: () => import('Views/layout/DossierLayout.vue'),
        children: [
			{
				path: '',
				redirect: 'login'
			},
			{
				path: 'login/:noDossier?',
				name: 'dossier-login',
				component: () => import('Views/dossier/Login.vue'),
				meta: {
					title: 'login',
					breadcrumb: null,
				}
			},
			{
				path: 'register',
				name: 'dossier-register',
				component: () => import('Views/dossier/Register.vue'),
				meta: {
					title: 'register',
					breadcrumb: null,
					middleware: [requireDossierAuthNoRegistered]
				}
			},
			{
				path: 'dash',
				name: 'dossier-dash',
				component: () => import('Views/dossier/Dashboard.vue'),
				meta: {
					title: 'dossier dashboard',
					breadcrumb: null,
					middleware: [requireDossierAuthRegistered]
				}
			}
		]
	}
]
