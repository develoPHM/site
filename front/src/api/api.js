import axios from 'axios';

// db 데이터 조회
function fetchPeopleList() {
	return axios
		.get('http://localhost:3000/api/find')
		.then((res) => res.data)
		.catch((err) => console.log(err));
}

export { fetchPeopleList };
