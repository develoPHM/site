<template>
	<div>
		<h1>사람 테이블</h1>
		<div>
			<button @click="saveData">저장</button>
			<input v-model="dbname" placeholder="이름" />
			<input v-model="dbnumber" placeholder="번호" />
		</div>
		<br />
		{{ computedPeople }}<br />
		<DataGrid :data="computedPeople" style="width: 500px">
			<GridColumn field="id" title="아이디" width="10%"></GridColumn>
			<GridColumn field="name" title="이름" width="30%"></GridColumn>
			<GridColumn field="number" title="번호"></GridColumn>
		</DataGrid>
	</div>
</template>

<script>
import axios from 'axios';
import { computed } from 'vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
	setup() {
		const store = useStore();
		const dbname = ref('');
		const dbnumber = ref('');
		// 저장 버튼
		const saveData = async () => {
			try {
				const response = await axios.post('http://localhost:3000/api/save', {
					name: dbname.value,
					number: dbnumber.value,
				});
				console.log(response);
				alert(response.data.message);
				dbname.value = '';
				dbnumber.value = '';
				// 데이터 저장 후 바로 최신 데이터를 가져옵니다.
				fetchData();
			} catch (error) {
				console.log(error);
			}
		};
		// api 호출
		const fetchData = () => {
			store.dispatch('FETCH_PEOPLE');
		};
		const computedPeople = computed(() => {
			return store.state.people;
		});

		// 컴포넌트가 마운트될 때 자동으로 데이터를 가져옵니다.
		onMounted(() => {
			fetchData();
		});

		return {
			dbname,
			dbnumber,
			fetchData,
			computedPeople,
			saveData,
		};
	},
};
</script>

<style scoped></style>
