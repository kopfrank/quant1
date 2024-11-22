<template>
  <div>
    <el-card class="card" shadow="hover" style="">
    <div class="table-container">
     
      <el-button type="primary" @click="exportMultipleData" style="margin-top:10px;margin-right:10px;margin-bottom: 10px;">导出数据</el-button>
      <br><br>
      <span>导入数据: </span>
      <input type="file" @change="importMultipleData" accept=".json"/>
      <!-- <br><br>
      <p>数据存储位置:</p>
      <a href="https://note.youdao.com/web/#/file/WEB0497e999ea04a3e932ae5f2b392509b3/note/WEBbce895a52615b7fc25f5f6219b25ba0c/" target="_blank">https://note.youdao.com/web/#/file/WEB0497e999ea04a3e932ae5f2b392509b3/note/WEBbce895a52615b7fc25f5f6219b25ba0c/</a>
      <br><br>
      <p>我的雪球自选:</p>
      <a href="https://xueqiu.com/#/optional?t=1730444377522" target="_blank">https://xueqiu.com/#/optional?t=1730444377522</a>
      <p>我的东财自选:</p>
      <a href="https://quote.eastmoney.com/zixuan/?from=home" target="_blank">https://quote.eastmoney.com/zixuan/?from=home</a>
      <p>东财板块资金流动:</p>
      <a href="https://quote.eastmoney.com/center/hsbk.html" target="_blank">https://quote.eastmoney.com/center/hsbk.html</a>
      <p>英为财情资讯:</p>
      <a href="https://cn.investing.com/news" target="_blank">https://cn.investing.com/news</a>
      <p>华尔街日报:</p>
      <a href="https://cn.wsj.com/" target="_blank">https://cn.wsj.com/</a> -->



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
        experienceData: localStorage.getItem('experienceData'), // 其他项目
        lifeData: localStorage.getItem('lifeData'), // 其他项目
        todoData: localStorage.getItem('todoData'), // 其他项目
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
