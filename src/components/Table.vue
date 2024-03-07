<template>
  <div class="table-wrapper" v-if="props.data.length">
    <el-table ref="multipleTableRef" :data="computedData" style="width: 100%" :row-style="{ textAlign: 'center' }"
      table-layout="auto" :row-class-name="rowClassHelper" :header-row-class-name="headerRowClassHelper"
      highlight-current-row :header-cell-style="{ background: '#009879', textAlign: 'center' }">
      <el-table-column v-for="column in tableColums" :key="`column-${column}`" :property="column" :label="column" />
      <el-table-column fixed="right" label="Operations" width="120" :key="`operations-column`">
        <template #default="scope">
          <el-button :key="`button-${scope.$index}`" link type="primary" size="small" @click="handleDetail(scope.row)">
            Detail
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-else>
    <span>Not data available at the moment</span>
  </div>

  <detail :data="dialogData" :visible="dialogVisible" @close="handleDialog" @form="handleForm" />
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElTable } from 'element-plus';
import Detail from './Detail.vue';

const props = defineProps(['data']);
const dialogVisible = ref(false);
const orders = ref([...props.data]);
const tableColums = ref([]);
const dialogData = ref([]);

const handleForm = (form) => {
  orders.value.map((order) => {
    if (order.id === form.id) {
      const aux = order;
      aux.items.push({ ...form.data });
      return aux;
    } else {
      return order;
    }
  });
};

const handleDialog = (val) => {
  dialogVisible.value = val;
};

const handleDetail = (val) => {
  dialogVisible.value = true;
  const object = props.data.filter(order => order.id === val.id);
  dialogData.value = [...object];
};

const tableData = orders?.value?.map(element => {
  return {
    id: element.id,
    number: element.number,
    fullfillment: element.fulfillmentStatus.ecartapi,
    total: element.totals.total,
    status: element.status.financial,
    items: element.items.length,
  };
});

const computedData = computed(() => {
  return orders?.value?.map(element => {
    return {
      id: element.id,
      number: element.number,
      fullfillment: element.fulfillmentStatus.ecartapi,
      total: element.totals.total,
      status: element.status.financial,
      items: element.items.length
    };
  });
});

tableColums.value = [...Object.keys(tableData !== undefined && tableData.length > 0 ? tableData[0] : {})];

const headerRowClassHelper = ({ row, rowIndex }) => {
  return 'table-header';
};

const rowClassHelper = ({ row, rowIndex }) => {
  let classes = 'row-border table-row';
  if (rowIndex % 2 !== 0 && rowIndex !== 0) classes += ' odd-row';

  return classes;
}
</script>

<style>
.table-wrapper {
  width: 85%;
  display: flex;
  margin: auto;
}

.cell {
  padding: 12px 15px;
  text-transform: capitalize;
  text-align: center
}

.table-row:hover {
  font-weight: bold;
  color: #009879;
}

.row-border {
  border-bottom: thin solid #dddddd;
}

.row-border:last-of-type {
  border-bottom: 2px solid #009879;
}

.table-header {
  color: #ffffff;
  text-align: center;
}

.table-header th:first-of-type {
  border-radius: 10px 0 0 0;
}

.table-header th:last-of-type {
  border-radius: 0 10px 0 0;
}

.odd-row {
  background: #f3f3f3 !important;
}

.el-table__body {
  border-radius: 10px 10px 0 0;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
</style>