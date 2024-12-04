<template>
  <div>
    <DataGrid data="test" style="width: 50em">
      <GridColumn field="id" width="2em" title="번호"></GridColumn>
      <GridColumn field="id" width="20em" title="제목"></GridColumn>
      <GridColumn field="id" width="4em" title="작성자"></GridColumn>
      <GridColumn field="id" width="4em" title="날짜"></GridColumn>
    </DataGrid>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const test = ref('');
    return {
      test,
    };
  },
};
</script>

<style scoped></style>
