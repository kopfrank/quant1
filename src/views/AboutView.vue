<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="code" label="代码" width="120"></el-table-column>
    <el-table-column prop="name" label="名称" width="180"></el-table-column>
    <el-table-column prop="date" label="估算日期" width="120"></el-table-column>
    <el-table-column prop="buyPrice" label="拟买入价格" width="180">
      <template #default="scope">
        <el-input v-model="scope.row.buyPrice" @input="calculatePrices(scope.row)" size="small"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="sellPrice5" label="指导卖出价 5%" width="180"></el-table-column>
    <el-table-column prop="sellPrice10" label="指导卖出价 10%" width="180"></el-table-column>
    <el-table-column prop="sellPrice20" label="指导卖出价 20%" width="180"></el-table-column>
    <el-table-column prop="sellPriceMinus5" label="指导卖出价 -5%" width="180"></el-table-column>
    <el-table-column prop="sellPriceMinus10" label="指导卖出价 -10%" width="180"></el-table-column>
    <el-table-column prop="sellPriceMinus20" label="指导卖出价 -20%" width="180"></el-table-column>
  </el-table>
  <el-button @click="saveData">保存数据到 LocalStorage</el-button>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { code: '600760', name: '中航沈飞', date: '10.12', buyPrice: 45.35 },
        { code: '000768', name: '中航西飞', date: '10.12', buyPrice: 27.03 },
        { code: '510300', name: '300etf', date: '10.12', buyPrice: 3.977 },
        { code: '002896', name: '中大力德', date: '10.12', buyPrice: 28.8 },
        { code: '002456', name: '欧菲光', date: '10.12', buyPrice: 9.28 },
      ]
    };
  },
  mounted() {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      this.tableData = JSON.parse(savedData);
    }
  },
  methods: {
    // 根据拟买入价格计算指导卖出价
    calculatePrices(row) {
      const buyPrice = parseFloat(row.buyPrice);
      if (!isNaN(buyPrice)) {
        row.sellPrice5 = (buyPrice * 1.05).toFixed(2);
        row.sellPrice10 = (buyPrice * 1.10).toFixed(2);
        row.sellPrice20 = (buyPrice * 1.20).toFixed(2);
        row.sellPriceMinus5 = (buyPrice * 0.95).toFixed(2);
        row.sellPriceMinus10 = (buyPrice * 0.90).toFixed(2);
        row.sellPriceMinus20 = (buyPrice * 0.80).toFixed(2);
      }
    },
    // 保存数据到 localStorage
    saveData() {
      localStorage.setItem('tableData', JSON.stringify(this.tableData));
      this.$message({
        message: '数据已保存到 LocalStorage',
        type: 'success',
      });
    }
  }
};
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
</style>

