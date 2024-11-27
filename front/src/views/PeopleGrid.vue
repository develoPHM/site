<template>
	<div>
		<h1>사람 테이블</h1>
		<div>
			<button @click="saveData">저장</button>
			<input v-model="inputName" placeholder="이름" />
			<input v-model="inputNumber" placeholder="번호" />
		</div>
		<br />
		<DataGrid :data="People" style="width: 500px">
			<GridColumn field="id" width="4em" title="고유값"></GridColumn>
			<GridColumn field="name" title="이름"></GridColumn>
			<GridColumn field="number" title="번호"></GridColumn>
			<GridColumn title="삭제" width="4em">
				<template #cell="props">
					<button @click="deleteData(props.row.id)">삭제</button>
				</template>
			</GridColumn>
		</DataGrid>
	</div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
	setup() {
		const store = useStore();
		const inputName = ref('');
		const inputNumber = ref('');

		// 데이터 저장
		const saveData = async () => {
			if (
				typeof inputNumber.value !== 'number' &&
				typeof inputName.value !== 'string'
			) {
				alert('이름은 문자, 번호는 숫자만 입력해라');
				clearInput();
			} else {
				await store.dispatch('SAVE_PEOPLE', {
					name: inputName.value,
					number: inputNumber.value,
				});
				clearInput();
			}
		};
		// 삭제 함수
		const deleteData = async (data) => {
			if (confirm('정말 삭제하겠습니까?')) {
				try {
					await store.dispatch('DELETE_PEOPLE', data);
				} catch (err) {
					console.log(err);
				}
			}
		};
		// api 호출
		const fetchData = () => {
			store.dispatch('FETCH_PEOPLE');
		};
		const People = computed(() => {
			return store.state.people;
		});

		// input 초기화
		const clearInput = () => {
			inputName.value = '';
			inputNumber.value = '';
		};
		// 컴포넌트가 마운트될 때 자동으로 데이터를 가져옴.
		onMounted(() => {
			fetchData();
		});
		return {
			inputName,
			inputNumber,
			fetchData,
			People,
			saveData,
			deleteData,
			clearInput,
		};
	},
};
</script>

<style scoped></style>
