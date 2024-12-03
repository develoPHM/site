<template>
  <div></div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const inputId = ref('')
    const inputName = ref('')
    const inputNumber = ref('')
    const saveData = async () => {
      if (
        typeof inputNumber.value !== 'number' &&
        typeof inputName.value !== 'string'
      ) {
        alert('이름은 문자, 번호는 숫자만 입력')
        clearInput()
      }
    }
    const deleteData = async data => {
      if (confirm('정말 삭제할거야?')) {
        try {
          await store.dispatch('DELETE_PEOPLE', data)
        } catch (err) {
          console.log(err)
        }
      }
    }
    const check = data => {
      inputId.value = data[0]
      inputName.value = data[1]
      inputNumber.value = data[2]
    }
    const clearInput = () => {
      inputId.value = ''
      inputName.value = ''
      inputNumber.value = ''
    }
    const updateDate = async () => {
      await store.dispatch('UPDATE_PEOPLE', {
        id: inputId.value,
        name: inputName.value,
        number: inputNumber.value,
      })
      clearInput()
    }
    const fetchData = () => {
      store.dispatch('FETCH_PEOPLE')
    }
    const People = computed(() => {
      return store.state.people
    })
    const routeName = computed(() => {
      return route.name
    })
    onMounted(() => {
      fetchData()
    })
    watch(
      () => route.name,
      () => {
        clearInput()
      },
    )
    return (
      store,
      route,
      inputId,
      inputName,
      inputNumber,
      routeName,
      saveData,
      deleteData,
      check,
      updateDate,
      fetchData,
      People
    )
  },
}
</script>

<style scoped></style>
