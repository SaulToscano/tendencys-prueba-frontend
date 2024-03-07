<template>
  <el-dialog class="form-dialog" v-model="props.visible" :width="width < 720 ? '70%' : '50%'" align-center
    title="Add Product Form" append-to-body>
    <el-form :rules="rules" ref="ruleFormRef" :model="productForm" label-position="top">
      <div class="form-fields-wrapper">
        <el-form-item label="Name" prop="name">
          <el-input type="text" name="name" id="formName" required v-model="productForm.name" />
        </el-form-item>
        <el-form-item label="SKU" prop="sku">
          <el-input type="text" name="sku" id="formSKU" required v-model="productForm.sku" />
        </el-form-item>
        <el-form-item label="Quantity" prop="quantity">
          <el-input type="text" name="quantity" id="formQuantity" required v-model.number="productForm.quantity" />
        </el-form-item>
        <el-form-item label="Price" prop="price">
          <el-input type="text" name="price" id="formPrice" required v-model.number="productForm.price" />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose(false)">Close</el-button>
        <el-button type="primary" @click="handleAddProduct">Add</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core';
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';

const { width } = useWindowSize();
const props = defineProps(['data', 'visible']);
const emit = defineEmits(['close', 'form']);

const ruleFormRef = ref();
const productForm = ref({
  name: '',
  sku: '',
  quantity: '',
  price: '',
});

const rules = reactive({
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 3, message: 'Length should be more than 3', trigger: 'blur' },
  ],
  sku: [
    { required: true, message: 'Please input SKU', trigger: 'blur' },
    { min: 3, message: 'Length should be more than 3', trigger: 'blur' },
  ],
  quantity: [
    { required: true, message: 'Quantity is required', trigger: 'blur' },
    { type: 'number', message: 'Quantity must be a number', trigger: 'blur' },
  ],
  price: [
    { required: true, message: 'Price is required', trigger: 'blur' },
    { type: 'number', message: 'Price must be a number', trigger: 'blur' },
  ],
});

const handleClose = (val) => {
  handleCleanForm();
  emit('close', val);
};

const handleCleanForm = () => {
  productForm.value = {
    name: '',
    sku: '',
    quantity: 0,
    price: 0,
  }
};

const handleAddProduct = () => {
  if (handleCheckForm()) {
    const aux = {
      id: props?.data[0]?.id,
      data: { ...productForm.value }
    };

    emit('form', aux);
    emit('close', false);
    handleCleanForm();
    ElMessage.success('Product added successfully!');
  }
  else {
    ElMessage.error('Error, please fill the form');
  }
}

const handleCheckForm = () => {
  if (!productForm.value.name) return false;
  if (!productForm.value.sku) return false;
  if (typeof productForm.value.quantity !== 'number') return false;
  if (typeof productForm.value.price !== 'number') return false;

  return true;
}
</script>

<style>
.form-dialog {
  background-image: url('../assets/form-background.jpg');
}

.form-dialog header>span {
  color: black;
}

.form-fields-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.form-fields-wrapper input {
  border: none;
  outline: none;
  display: inline-block;
  height: 34px;
  vertical-align: middle;
  bottom: 14px;
  right: 9px;
  border-radius: 22px;
  width: 70%;
  box-sizing: border-box;
  padding: 0 18px;
}

.form-fields-input {
  border: none;
  outline: none;
  display: inline-block;
  height: 34px;
  vertical-align: middle;
  bottom: 14px;
  right: 9px;
  border-radius: 22px;
  width: 70%;
  box-sizing: border-box;
  padding: 0 18px;
}
</style>