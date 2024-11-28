import { createRouter, createWebHistory } from 'vue-router';
import PeopleGrid from '@/views/PeopleGrid.vue';
import LoginPage from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';

// 라우트 정의
const routes = [
	{
		path: '/',
		name: 'login',
		component: LoginPage,
	},
	{
		path: '/people',
		name: 'people',
		component: PeopleGrid,
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
