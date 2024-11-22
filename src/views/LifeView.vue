<template>
  <div>
    <el-card class="card" shadow="hover" style="">
      <el-input
        type="textarea"
        v-model="life"
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
      life: '',
      todo: ''
    };
  },
  mounted() {
    const savedExperience = localStorage.getItem('lifeData');
    if (savedExperience) {
      this.life = savedExperience;
    }
  },
  methods: {
    saveData() {
      localStorage.setItem('lifeData', this.life);
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
