<template>
	<div>
		<h1>사람 테이블</h1>
		<button @click="fetchData">가져오기</button><br />
		{{ computedPeople }}<br />
		<DataGrid :data="computedPeople" style="width: 500px">
			<GridColumn field="id" title="아이디" width="10%"></GridColumn>
			<GridColumn field="name" title="이름" width="30%"></GridColumn>
			<GridColumn field="number" title="번호"></GridColumn>
		</DataGrid>
	</div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
	setup() {
		const store = useStore();
		const fetchData = () => {
			store.dispatch('FETCH_PEOPLE');
		};
		const computedPeople = computed(() => {
			return store.state.people;
		});

		return {
			fetchData,
			computedPeople,
		};
	},
};
</script>

<style scoped></style>
