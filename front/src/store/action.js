import {
	fetchPeopleList,
	savePeople,
	deletePeople,
	updatePeople,
} from '@/api/api';

export default {
	// 목록 조회
	FETCH_PEOPLE({ commit }) {
		fetchPeopleList()
			.then((res) => {
				console.log('조회 업데이트 완료');
				commit('SET_PEOPLE', res);
			})
			.catch((err) => {
				console.log(err);
			});
	},

	// 사람 정보 저장
	SAVE_PEOPLE({ dispatch }, payload) {
		savePeople(payload)
			.then((res) => {
				alert(res.data.message);
				dispatch('FETCH_PEOPLE');
			})
			.catch((err) => {
				console.log(err);
			});
	},
	// 사람 정보 삭제
	DELETE_PEOPLE({ dispatch }, payload) {
		deletePeople(payload)
			.then((res) => {
				alert(res.data.message);
				dispatch('FETCH_PEOPLE');
			})
			.catch((err) => {
				console.log(err);
			});
	},
	// 사람 정보 수정
	UPDATE_PEOPLE({ dispatch }, payload) {
		updatePeople(payload)
			.then((res) => {
				console.log(res.data.message);
				dispatch('FETCH_PEOPLE');
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
