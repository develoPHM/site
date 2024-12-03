<template>
  <div>
    <div>
      <button v-if="routeName === 'people'" @click="saveData">추가</button>
      <button v-else @click="updateData">저장</button>
      <input
        v-if="routeName === 'people_update'"
        v-model="inputId"
        disabled
        placeholder="고유값"
      />
      <input v-model="inputName" placeholder="이름" />
      <input v-model="inputNumber" placeholder="번호" />
    </div>
    <br />
    <DataGrid :data="People" style="width: 500px">
      <GridColumn field="id" width="4em" title="고유값"></GridColumn>
      <GridColumn field="name" title="이름"></GridColumn>
      <GridColumn field="number" title="번호"></GridColumn>
      <GridColumn title="" width="4em">
        <template #cell="props">
          <button
            v-if="routeName === 'people'"
            @click="deleteData(props.row.id)"
          >
            삭제
          </button>
          <button
            v-if="routeName === 'people_update'"
            @click="check([props.row.id, props.row.name, props.row.number])"
          >
            수정
          </button>
        </template>
      </GridColumn>
    </DataGrid>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const inputId = ref('')
    const inputName = ref('')
    const inputNumber = ref('')
    // 데이터 저장
    const saveData = async () => {
      if (
        typeof inputNumber.value !== 'number' &&
        typeof inputName.value !== 'string'
      ) {
        alert('이름은 문자, 번호는 숫자만 입력해라')
        clearInput()
      } else {
        await store.dispatch('SAVE_PEOPLE', {
          name: inputName.value,
          number: inputNumber.value,
        })
        clearInput()
      }
    }
    // 삭제 함수
    const deleteData = async data => {
      if (confirm('정말 삭제하겠습니까?')) {
        try {
          await store.dispatch('DELETE_PEOPLE', data)
        } catch (err) {
          console.log(err)
        }
      }
    }
    // 수정버튼
    const check = data => {
      inputId.value = data[0]
      inputName.value = data[1]
      inputNumber.value = data[2]
    }
    // 수정저장 버튼
    const updateData = async () => {
      await store.dispatch('UPDATE_PEOPLE', {
        id: inputId.value,
        name: inputName.value,
        number: inputNumber.value,
      })
      clearInput()
    }
    // 목록 불러오는 함수 호출
    const fetchData = () => {
      store.dispatch('FETCH_PEOPLE')
    }
    const People = computed(() => {
      return store.state.people
    })

    // input 초기화
    const clearInput = () => {
      inputId.value = ''
      inputName.value = ''
      inputNumber.value = ''
    }
    const routeName = computed(() => {
      return route.name
    })
    // 컴포넌트가 마운트될 때 자동으로 데이터를 가져옴.
    onMounted(() => {
      fetchData()
    })
    // route가 변경될 때마다 clearInput 함수 실행
    watch(
      () => route.name,
      () => {
        clearInput()
      },
    )
    return {
      inputId,
      inputName,
      inputNumber,
      fetchData,
      People,
      saveData,
      deleteData,
      clearInput,
      routeName,
      check,
      updateData,
    }
  },
}
</script>

<style scoped></style>
