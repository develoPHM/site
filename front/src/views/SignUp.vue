<template>
	<div>
		<h1>회원가입 합시다</h1>
		<div>
			<label for="name">이름:</label>
			<input type="text" id="name" v-model="username" />
		</div>
		<div>
			<label for="username">아이디:</label>
			<input type="text" id="username" v-model="userid" />
		</div>
		<div>
			<label for="password">비밀번호:</label>
			<input type="password" id="password" v-model="password" />
		</div>
		<button @click="submitForm">제출</button>
	</div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
	setup() {
		const router = useRouter();
		const username = ref('');
		const userid = ref('');
		const password = ref('');
		const submitForm = async () => {
			try {
				await axios.post('http://localhost:3000/api/signup', {
					id: userid.value,
					pw: password.value,
					name: username.value,
					date: new Date().toISOString().split('T')[0],
				});
				alert('회원가입 완료~');
				router.push('/');
			} catch (err) {
				console.error(err);
				alert('오류발생');
			}
		};
		return { username, userid, password, submitForm };
	},
};
</script>

<style scoped></style>
