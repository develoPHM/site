import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import HomePage from '@/views/HomePage.vue';
import PeopleGrid from '@/components/PeopleGrid.vue';

// 라우트 정의
const routes = [
	{
		path: '/',
		name: 'login',
		component: LoginPage,
	},
	{
		path: '/home',
		name: 'home',
		component: HomePage,
		children: [
			{
				path: '/people',
				name: 'people',
				component: PeopleGrid,
			},
			{
				path: '/people_update',
				name: 'people_update',
				component: PeopleGrid,
			},
		],
	},
	{
		path: '/signup',
		name: 'sighup',
		component: SignUp,
	},
];

// 라우터 생성
const router = createRouter({
	history: createWebHistory(), // HTML5 모드
	routes,
});

export default router;
