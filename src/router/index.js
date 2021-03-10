import Router from 'vue-router'

//routes
import dossierRoutes from './dossier';
import secretaryRoutes from './secretary';

let mainRoute = [
	{
		path: '',
		redirect: '/' + process.env.VUE_APP_DOSSIER_ROUTE
	},
	{
		path: '*',
        redirect: '/pages/error-404'
	},
	{
		path: '/pages',
        component: () => import('Views/layout/SecretaryLayout.vue'),
        children: [
			{
				path: 'error-404',
				name: 'page-error-404',
				component: () => import('Views/error/Error404.vue'),
				meta: {
					rule: 'editor'
				}
			}
		]
	}
]

const routes = mainRoute.concat(
	dossierRoutes,
	secretaryRoutes
)

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.matched.some(m => m.meta.scrollToTop)) {
        position.x = 0;
        position.y = 0;
      }
      return position;
    }
}
 

const createRouter =  () => { 
	const router = new Router({
		mode: 'history',
		scrollBehavior,
		routes: routes
	})
	function nextFactory(context, middleware, index) {
		const subsequentMiddleware = middleware[index];
		if (!subsequentMiddleware) return context.next;
		return (...parameters) => {
		context.next(...parameters);
		const nextMiddleware = nextFactory(context, middleware, index + 1);
		subsequentMiddleware({ ...context, next: nextMiddleware });
		};
	}
	router.beforeEach((to, from, next) => {
		if (to.meta.middleware) {
			const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
			const context = {
				from,
				next,
				router,
				to,
			};
			const nextMiddleware = nextFactory(context, middleware, 1);
			return middleware[0]({ ...context, next: nextMiddleware });
		}
		return next();
	});

	return router;
}

export {
	createRouter
};
