import { fetchPeopleList } from '@/api/api';

export default {
	// db 에서 사람목록 불러오라
	FETCH_PEOPLE({ commit }) {
		fetchPeopleList()
			.then((res) => {
				console.log(res);
				commit('SET_PEOPLE', res);
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
