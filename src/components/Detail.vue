<template>
  <!-- Detail Dialog -->
  <el-dialog v-model="props.visible" :title="`Order ${props?.data[0]?.name}`" :width="width < 720 ? '90%' : '50%'"
    align-center :before-close="handleClose">
    <div v-if="props.data.length > 0">
      <span class="order-number"><strong>Number:</strong> {{ props.data[0].number }}</span>
      <br />
      <span><strong>Email:</strong> {{ props.data[0].email ? props.data[0].email : "N/A" }}</span>
      <div class="product-wrapper" v-for="product in props.data[0].items"
        :key="`order-${props.data[0].id}-product-${product.sku}`">
        <div class="name">
          <span>Name: {{ product.name }}</span>
        </div>
        <div class="sku">
          <span>SKU: {{ product.sku ? product.sku : "N/A" }}</span>
        </div>
        <div class="qty">
          <span>Qty: {{ product.quantity }}</span>
        </div>
        <div class="price">
          <span>Price: {{ product.price }} {{ props.data[0].currency }}</span>
        </div>
      </div>
      <span><strong>Total:</strong> {{ handleGetTotal(props.data[0].items) }} {{ props.data[0].currency }}</span>

      <!-- Product Form Dialog -->
      <Form :data="props.data" :visible="innerVisible" @close="(val) => innerVisible = val" @form="handleEmitForm" />
      <!-- End Product Form -->
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="success" @click="handlePaid">Paid</el-button>
        <el-button @click="handleEmitClose(false)">Close</el-button>
        <el-button type="primary" @click="innerVisible = true">
          Add
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core';
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import Form from './Form.vue';

const { width } = useWindowSize();
const props = defineProps(['data', 'visible']);
const emit = defineEmits(['close', 'form']);
const innerVisible = ref(false);

const handlePaid = () => {
  ElMessage.success('Payment accepted Successfully!');
};

const handleEmitClose = (val) => {
  emit('close', val);
};

const handleEmitForm = (val) => {
  emit('form', val);
};

const handleClose = (done) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      emit('close', done());
    })
    .catch((error) => {
      console.log(error)
    });
};

const handleGetTotal = (products) => {
  return products.reduce((total, current) => {
    return total + current.quantity * current.price;
  }, 0);
};
</script>

<style>
.order-number {
  display: flex;
  justify-content: flex-end;
}

.product-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "name sku"
    "qty prices";
  margin: 1rem 0;
  border: solid 1px black;
  color: black;
}

.product-wrapper div {
  border: solid 1px black;
  padding: 5px;
}

.name {
  grid-area: name;
}

.sku {
  grid-area: sku;
}

.qty {
  grid-area: qty;
}

.prices {
  grid-area: prices;
}
</style>