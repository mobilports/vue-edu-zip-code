<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <form @submit.prevent="onFetchSettlementForZipCode()"
      class="bg-white p-8 flex flex-col space-y-4 rounded-xl shadow-md w-96">
      <input placeholder="Zip Code"
        class="w-full p-2 border rounded-md focus: outline-none focus:ring focus:ring-blue-200 transition"
        @change="onFetchSettlementForZipCode()" v-model="v$.form.zipCode.$model" />
      <input placeholder="City"
        class="w-full p-2 border rounded-md focus: outline-none focus:ring focus:ring-blue-200 transition"
        v-model="v$.form.settlement.$model" />
    </form>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { ZipCodeService } from './services/zip-code.service';
import { FetchSettlementsForZipCodeResponse } from './interfaces/fetch-settlement-for-zip-code-response';

const zipCodeService = new ZipCodeService();

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  methods: {
    onFetchSettlementForZipCode() {
      const zipCode = this.form.zipCode;

      if (zipCode) {
        zipCodeService.fetchSettlementsForZipCode(zipCode).subscribe({
          next: (response: AxiosResponse<FetchSettlementsForZipCodeResponse>) => {
            this.form.settlement = response.data.name;
          }
        })
      }
    }
  },
  data() {
    return {
      form: {
        settlement: '',
        zipCode: ''
      }
    }
  },
  validations() {
    return {
      form: {
        settlement: {
          required
        },
        zipCode: {}
      }
    }
  }
}
</script>
