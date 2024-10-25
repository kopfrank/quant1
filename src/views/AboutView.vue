<template>
  <div>
    <div class="table-container">
      <el-table :data="currentTableData" border>
        <el-table-column prop="id" label="ID" min-width="50">
          <template #default="scope">
            <el-input v-model="scope.row.id" size="small"></el-input> <!-- 可编辑的 ID 输入框 -->
          </template>
        </el-table-column>
        <el-table-column prop="date" label="估算日期" min-width="80">
          <template #default="scope">
            <el-input v-model="scope.row.date" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="代码" min-width="80">
          <template #default="scope">
            <el-input v-model="scope.row.code" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="80">
          <template #default="scope">
            <el-input v-model="scope.row.name" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="buyPrice" label="拟买入价格" min-width="80">
          <template #default="scope">
            <el-input v-model="scope.row.buyPrice" @input="calculatePrices(scope.row)" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sellPrice3" label="卖出价 3%" min-width="80"></el-table-column>
        <el-table-column prop="sellPrice5" label="卖出价 5%" min-width="80"></el-table-column>
        <el-table-column prop="sellPrice10" label="卖出价 10%" min-width="80"></el-table-column>
        <el-table-column prop="sellPrice15" label="卖出价 15%" min-width="80"></el-table-column>
        <el-table-column prop="sellPrice20" label="卖出价 20%" min-width="80"></el-table-column>
        <el-table-column prop="sellPriceMinus5" label="卖出价 -5%" min-width="80"></el-table-column>
        <el-table-column prop="sellPriceMinus10" label="卖出价 -10%" min-width="80"></el-table-column>
        <el-table-column prop="sellPriceMinus15" label="卖出价 -15%" min-width="80"></el-table-column>
        <el-table-column prop="sellPriceMinus20" label="卖出价 -20%" min-width="80"></el-table-column>
        <el-table-column label="操作" min-width="70">
          <template #default="scope">
            <el-button type="" @click="deleteRow(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br>
    <!-- 分页组件 -->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination> -->

    <el-pagination
      layout="total, prev, pager, next"
      :total="tableData.length"
      :page-size="pageSize"
      v-model:current-page="currentPage"
      @current-change="handleCurrentChange">
    </el-pagination>

    <!-- 将新增行按钮放到表格下方 -->
    <br>
    <el-button type="primary" @click="addRow">新增行</el-button>
    <el-button type="primary" @click="saveData">保存数据到本地</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, code: '600760', name: '中航沈飞', date: '10.12', buyPrice: 45.35 },
        { id: 2, code: '000768', name: '中航西飞', date: '10.12', buyPrice: 27.03 },
        { id: 3, code: '510300', name: '300etf', date: '10.12', buyPrice: 3.977 },
        { id: 4, code: '002896', name: '中大力德', date: '10.12', buyPrice: 28.8 },
        { id: 5, code: '002456', name: '欧菲光', date: '10.12', buyPrice: 9.28 },
        // 更多数据...
      ],
      currentPage: 1,  // 当前页
      pageSize: 10,    // 每页显示条数
      buyPriceInput: '', // 买入价输入框绑定值
      sellPriceInput: '', // 卖出价输入框绑定值
      profitPercentage: 0 // 盈亏百分比结果
    };
  },
  computed: {
    // 当前页显示的数据
    currentTableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.tableData.slice(start, end);
    }
  },
  mounted() {
    const savedData = localStorage.getItem('aboutTableData');
    if (savedData) {
      this.tableData = JSON.parse(savedData);
    }
  },
  methods: {
    // 处理分页页数变化
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    // 处理每页显示条数变化
    handleSizeChange(size) {
      this.pageSize = size;
    },
    // 计算盈亏百分比
    calculateProfitPercentage() {
      const buyPrice = parseFloat(this.buyPriceInput);
      const sellPrice = parseFloat(this.sellPriceInput);

      if (!isNaN(buyPrice) && !isNaN(sellPrice) && buyPrice > 0) {
        const profit = ((sellPrice - buyPrice) / buyPrice) * 100;
        this.profitPercentage = profit.toFixed(2); // 保留两位小数
      } else {
        this.$message({
          message: '请输入有效的买入价和卖出价',
          type: 'warning',
        });
      }
    },
    // 根据拟买入价格计算指导卖出价
    calculatePrices(row) {
      const buyPrice = parseFloat(row.buyPrice);
      if (!isNaN(buyPrice)) {
        // 获取买入价格的小数位数
        const decimalPlaces = (row.buyPrice.toString().split('.')[1] || []).length;

        // 使用小数位数格式化卖出价格
        row.sellPrice3 = (buyPrice * 1.03).toFixed(decimalPlaces);
        row.sellPrice5 = (buyPrice * 1.05).toFixed(decimalPlaces);
        row.sellPrice10 = (buyPrice * 1.10).toFixed(decimalPlaces);
        row.sellPrice15 = (buyPrice * 1.15).toFixed(decimalPlaces);
        row.sellPrice20 = (buyPrice * 1.20).toFixed(decimalPlaces);
        row.sellPriceMinus5 = (buyPrice * 0.95).toFixed(decimalPlaces);
        row.sellPriceMinus10 = (buyPrice * 0.90).toFixed(decimalPlaces);
        row.sellPriceMinus15 = (buyPrice * 0.85).toFixed(decimalPlaces);
        row.sellPriceMinus20 = (buyPrice * 0.80).toFixed(decimalPlaces);
      }
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
        sellPrice3: '',
        sellPrice5: '',
        sellPrice10: '',
        sellPrice15: '',
        sellPrice20: '',
        sellPriceMinus5: '',
        sellPriceMinus10: '',
        sellPriceMinus15: '',
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
      // 排序数据
      this.tableData.sort((a, b) => a.id - b.id);
      // 保存数据到 localStorage
      localStorage.setItem('aboutTableData', JSON.stringify(this.tableData));
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
  /* 可以根据需要添加样式 */
}
.calculator-container {
  margin-top: 20px;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
}
.calculator-container .el-input__wrapper{
  margin-right:10px;
}
.calculator-container h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.result-container {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
}
</style>
