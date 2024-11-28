<template>
	<div>
		<h1>로그인 하자</h1>
		<form @submit.prevent="submitForm">
			<div>
				<label for="username">아이디:</label>
				<input type="text" id="username" v-model="username" />
			</div>
			<div>
				<label for="password">비밀번호:</label>
				<input type="password" id="password" v-model="password" />
			</div>
			<button type="submit">로그인</button>
		</form>
		<br />
		<button @click="signUp">회원가입</button>
	</div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
	setup() {
		const router = useRouter();
		const username = ref('');
		const password = ref('');
		const signUp = () => {
			router.push('/signup');
		};
		return {
			username,
			password,
			signUp,
		};
	},
};
</script>
