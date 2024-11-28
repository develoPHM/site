import axios from 'axios';

// 사람 목록 조회
const fetchPeopleList = async () => {
	return axios
		.get('http://localhost:3000/api/find')
		.then((res) => res.data)
		.catch((err) => console.log(err));
};
// 사람 데이터 저장
const savePeople = async (data) => {
	return axios.post('http://localhost:3000/api/save', data);
};

// 사람 데이터 삭제
const deletePeople = async (data) => {
	return axios.delete(`http://localhost:3000/api/delete/${data}`);
};

export { fetchPeopleList, savePeople, deletePeople };
