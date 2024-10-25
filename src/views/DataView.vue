<template>
  <div>
    <el-card class="card" shadow="hover" style="">
    <div class="table-container">
     
      <el-button type="primary" @click="exportMultipleData" style="margin-top:10px;margin-right:10px;margin-bottom: 10px;">导出数据</el-button>
      <br><br>
      <span>导入数据: </span>
      <input type="file" @change="importMultipleData" accept=".json"/>

  </div>

  </el-card>
</div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {
   
    // 导出数据为 JSON 文件
    exportMultipleData() {
      const data = {
        tradeTableData: localStorage.getItem('tradeTableData'),
        aboutTableData: localStorage.getItem('aboutTableData'), // 其他项目
        homeTableData: localStorage.getItem('homeTableData'),
        profitTableData: localStorage.getItem('profitTableData'), // 其他项目
        // 可以添加更多项
      };

      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'localStorageData.json'; // 文件名
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    // 导入 JSON 文件并保存到 localStorage
    importMultipleData(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = function(e) {
        const content = e.target.result;
        try {
          const parsedData = JSON.parse(content);
          for (const key in parsedData) {
            if (parsedData.hasOwnProperty(key)) {
              localStorage.setItem(key, parsedData[key]);
            }
          }
          alert('数据导入成功！');
        } catch (err) {
          alert('数据格式错误，导入失败！');
        }
      };

      if (file) {
        reader.readAsText(file);
      }
    },



   
   
  }
};
</script>

<style>
.table-container {
  /* 根据需要添加样式 */
}
</style>
