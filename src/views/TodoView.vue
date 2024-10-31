<template>
  <div>


    <el-card class="card" shadow="hover" style="">
      <el-input
        type="textarea"
        v-model="todo"
        rows="26"
        placeholder=""
      ></el-input>
    </el-card>

    <el-button type="primary" style="margin-top: 20px;" @click="saveData">保存数据到本地</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      experience: '',
      todo: ''
    };
  },
  mounted() {
    const savedTodo = localStorage.getItem('todoData');
    if (savedTodo) {
      this.todo = savedTodo;
    }
  },
  methods: {
    saveData() {
      localStorage.setItem('todoData', this.todo);
      this.$message({
        message: '数据已保存到本地',
        type: 'success'
      });
    }
  }
};
</script>

<style>
.card {
  padding: 0px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #ffffff;
  margin: 10px 0;
}
</style>
