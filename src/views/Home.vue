<template>
  <div>
    <template v-if="data.length > 0">
      <Table :data="data" />
    </template>

    <template v-else>
      <Loader />
    </template>
  </div>
</template>

<script setup>
import Table from '../components/Table.vue';
import Loader from '../components/Loader.vue';
import axios from 'axios';
import { ref } from 'vue';

const data = ref([]);

async function fetchData() {
  try {
    const response = await axios.get(`https://eshop-deve.herokuapp.com/api/v2/orders`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': import.meta.env.VITE_Authorization
      }
    });

    if (response.data?.success) {
      data.value = response.data.orders;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
</script>
