<template>
  <div>
    <!-- 显示盈亏数字的区域 -->
    <div class="summary-container">
      <span>盈亏总计: ¥{{ totalProfit }}</span>
    </div>

    <div class="table-container">
      <el-table :data="paginatedData" border>
        <el-table-column prop="id" label="ID" min-width="50">
          <template #default="scope">
            <el-input v-model="scope.row.id" size="small"></el-input>
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
        <el-table-column prop="date" label="操作日期" min-width="120">
          <template #default="scope">
            <el-input v-model="scope.row.date" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="buyPrice" label="盈亏" min-width="120">
          <template #default="scope">
            <el-input v-model="scope.row.buyPrice" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="buyPrice" label="盈亏" min-width="120">
          <template #default="scope">
            <el-input v-model="scope.row.buyPrice" size="small"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="100">
          <template #default="scope">
            <el-button type="danger" @click="deleteRow(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页控件 -->
    <el-pagination
      layout="total, prev, pager, next"
      :total="tableData.length"
      :page-size="10"
      v-model:current-page="currentPage"
      @current-change="handlePageChange">
    </el-pagination>

    <br>
    <!-- 将新增行按钮放到表格下方 -->
    <el-button type="primary" @click="addRow">新增行</el-button>
    <el-button type="success" @click="saveData">保存数据到本地</el-button>
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
        // Add more rows for testing
      ],
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的行数
    };
  },
  mounted() {
    const savedData = localStorage.getItem('profitTableData');
    if (savedData) {
      this.tableData = JSON.parse(savedData);
    }
  },
  computed: {
    // 计算盈亏总和
    totalProfit() {
      const total = this.tableData.reduce((total, row) => {
        const value = parseFloat(row.buyPrice);
        return total + (isNaN(value) ? 0 : value);
      }, 0); // 计算总和

      // 使用Intl.NumberFormat格式化为千分位和百万分位
      return new Intl.NumberFormat('en-US', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
      }).format(total); // 保留两位小数
    },
    // 分页后的数据
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.tableData.slice(start, end);
    }
  },
  methods: {
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
      });
    },

    // 删除指定行
    deleteRow(index) {
      const realIndex = (this.currentPage - 1) * this.pageSize + index;
      this.tableData.splice(realIndex, 1); // 删除分页中的实际行
      this.$message({
        message: '行已删除',
        type: 'success',
      });
    },

    // 保存数据到 localStorage
    saveData() {
      this.tableData.sort((a, b) => a.id - b.id);
      localStorage.setItem('profitTableData', JSON.stringify(this.tableData));
      this.$message({
        message: '数据已保存到本地',
        type: 'success',
      });
    },

    // 页码切换时的处理
    handlePageChange(newPage) {
      this.currentPage = newPage;
    }
  }
};
</script>


<style>
.table-container {
  /* 根据需要添加样式 */
}
.summary-container {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 10px;
  color: #2c3e50;
 
}
</style>
