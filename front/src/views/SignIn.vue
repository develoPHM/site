<template>
  <div>
    <h1>로그인 하자</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="userid">아이디:</label>
        <input type="text" id="userid" v-model="userid" />
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">로그인</button>
    </form>
    <br />
    <button @click="signUpPage">회원가입</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const userid = ref('');
    const password = ref('');
    const signUpPage = () => {
      router.push('/signup');
    };
    const submitForm = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/signin', {
          id: userid.value,
          pw: password.value,
        });
        console.log(response);
        if (response.data.token) {
          const { token } = response.data;
          localStorage.setItem('token', token); // jwt
          alert('로그인 성공');
          await router.push('/home');
        }
      } catch (err) {
        console.log(err);
      }
    };

    return {
      userid,
      password,
      signUpPage,
      submitForm,
    };
  },
};
</script>
