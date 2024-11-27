import { createRouter, createWebHistory } from 'vue-router';
import PeopleGrid from '@/views/PeopleGrid.vue';
import PageOne from '@/views/PageOne.vue';

// 라우트 정의
const routes = [
	{
		path: '/',
		name: 'Home',
		redirect: '/people',
	},
	{
		path: '/people',
		name: 'people',
		component: PeopleGrid,
	},
	{
		path: '/1',
		name: 'Home',
		component: PageOne,
	},
];

// 라우터 생성
const router = createRouter({
	history: createWebHistory(), // HTML5 모드
	routes,
});

export default router;
