<template>
  <div>
    <div class="table-container">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="ID" min-width="50">
          <template #default="scope">
            <el-input v-model="scope.row.id" size="small"></el-input> <!-- 可编辑的 ID 输入框 -->
          </template>
        </el-table-column>
        <el-table-column prop="code" label="代码" min-width="120">
          <template #default="scope">
            <el-input v-model="scope.row.code" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="120">
          <template #default="scope">
            <el-input v-model="scope.row.name" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="记录日期" min-width="120">
          <template #default="scope">
            <el-input v-model="scope.row.date" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="buyPrice" label="成本价" min-width="120">
          <template #default="scope">
            <el-input v-model="scope.row.buyPrice" @input="calculatePrices(scope.row)" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="holdposition" label="持有数量" min-width="120">
          <template #default="scope">
            <el-input v-model="scope.row.holdposition" @input="calculateValue(scope.row)" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="holdvalue" label="持仓价值" min-width="120">
          <template #default="scope">
            <span>{{ formatValue(scope.row.holdvalue) }}</span> <!-- 显示格式化后的持仓价值 -->
          </template>
        </el-table-column>
        <el-table-column prop="sellPrice3" label="指导卖出价 3%" min-width="120"></el-table-column>
        <el-table-column prop="sellPrice5" label="指导卖出价 5%" min-width="120"></el-table-column>
        <el-table-column prop="sellPrice10" label="指导卖出价 10%" min-width="120"></el-table-column>
        <el-table-column prop="sellPrice20" label="指导卖出价 20%" min-width="120"></el-table-column>
        <el-table-column prop="sellPriceMinus5" label="指导卖出价 -5%" min-width="120"></el-table-column>
        <el-table-column prop="sellPriceMinus10" label="指导卖出价 -10%" min-width="130"></el-table-column>
        <el-table-column prop="sellPriceMinus20" label="指导卖出价 -20%" min-width="130"></el-table-column>
        <el-table-column label="操作" min-width="100">
          <template #default="scope">
            <el-button type="" @click="deleteRow(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br>
    <!-- 将新增行按钮放到表格下方 -->
    <el-button type="primary" @click="addRow">新增行</el-button>
    <el-button type="primary" @click="saveData">保存数据到本地</el-button>


  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, code: '600760', name: '中航沈飞', date: '10.12', buyPrice: 45.35, holdposition: 0 },
        { id: 2, code: '000768', name: '中航西飞', date: '10.12', buyPrice: 27.03, holdposition: 0 },
        { id: 3, code: '510300', name: '300etf', date: '10.12', buyPrice: 3.977, holdposition: 0 },
        { id: 4, code: '002896', name: '中大力德', date: '10.12', buyPrice: 28.8, holdposition: 0 },
        { id: 5, code: '002456', name: '欧菲光', date: '10.12', buyPrice: 9.28, holdposition: 0 },
      ]
    };
  },
  mounted() {
    const savedData = localStorage.getItem('homeTableData');
    if (savedData) {
      this.tableData = JSON.parse(savedData);
    }
  },
  methods: {
    // 根据拟买入价格计算指导卖出价
    calculatePrices(row) {
      const buyPrice = parseFloat(row.buyPrice);
      const holdposition = parseFloat(row.holdposition);
      if (!isNaN(buyPrice)) {
        const decimalPlaces = (row.buyPrice.toString().split('.')[1] || []).length;

        row.sellPrice3 = (buyPrice * 1.03).toFixed(decimalPlaces);
        row.sellPrice5 = (buyPrice * 1.05).toFixed(decimalPlaces);
        row.sellPrice10 = (buyPrice * 1.10).toFixed(decimalPlaces);
        row.sellPrice20 = (buyPrice * 1.20).toFixed(decimalPlaces);
        row.sellPriceMinus5 = (buyPrice * 0.95).toFixed(decimalPlaces);
        row.sellPriceMinus10 = (buyPrice * 0.90).toFixed(decimalPlaces);
        row.sellPriceMinus20 = (buyPrice * 0.80).toFixed(decimalPlaces);
      
      }
      if (!isNaN(holdposition)) {
        row.holdvalue = (buyPrice * holdposition).toFixed(0); // 不显示小数
      }

    },

    // 计算持仓价值 
    calculateValue(row) {
      const buyPrice = parseFloat(row.buyPrice);
      const holdposition = parseFloat(row.holdposition);
      if (!isNaN(buyPrice) && !isNaN(holdposition)) {
        row.holdvalue = (buyPrice * holdposition).toFixed(0); // 不显示小数
      }
    },
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



    // 格式化数字，添加千分位
    formatValue(value) {
      if (!isNaN(value)) {
        return new Intl.NumberFormat('en-US').format(value); // 使用Intl.NumberFormat格式化为千分位
      }
      return value;
    },

    // 新增一行
    addRow() {
      const newId = this.tableData.length ? Math.max(...this.tableData.map(item => item.id)) + 1 : 1;
      this.tableData.push({
        id: newId,
        code: '',
        name: '',
        date: '',
        buyPrice: 0,
        holdposition: 0,
        holdvalue: 0,
        sellPrice3: '',
        sellPrice5: '',
        sellPrice10: '',
        sellPrice20: '',
        sellPriceMinus5: '',
        sellPriceMinus10: '',
        sellPriceMinus20: ''
      });
    },

    // 删除指定行
    deleteRow(index) {
      this.tableData.splice(index, 1); // 删除指定索引的行
      this.$message({
        message: '行已删除',
        type: 'success',
      });
    },

    // 保存数据到 localStorage
    saveData() {
      this.tableData.sort((a, b) => a.id - b.id);
      localStorage.setItem('homeTableData', JSON.stringify(this.tableData));
      this.$message({
        message: '数据已保存到本地',
        type: 'success',
      });
    }
  }
};
</script>

<style>
.table-container {
  /* 根据需要添加样式 */
}
</style>
