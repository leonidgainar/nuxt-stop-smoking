<template>
  <v-row class="d-flex justify-center text-center mt-4">
    <v-col cols="12" sm="8" md="6">
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <validation-provider v-slot="{ errors }" name="name" rules="required">
            <v-text-field
              v-model="name"
              class="px-4"
              label="Name of cigarettes brand"
              :error-messages="errors"
              color="cyan darken-3"
              hide-details="auto"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="price"
            rules="required|min_value:1|max_value:99.99"
          >
            <v-text-field
              v-model="price"
              type="number"
              class="px-4"
              label="Price per pack"
              :error-messages="errors"
              color="cyan darken-3"
              hide-details="auto"
            ></v-text-field>
          </validation-provider>
          <v-btn
            type="submit"
            class="mt-4 white--text"
            color="cyan darken-3"
            :disabled="invalid"
          >
            Add brand
          </v-btn>
        </form>
      </validation-observer>
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <DataTable
        title="Cigarette brands"
        :headers="headers"
        :records="records"
        @delete-item="onDeleteItem"
      />
    </v-col>
  </v-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import DataTable from '../../components/DataTableComponent.vue'

export default {
  name: 'BrandPage',
  components: {
    ValidationProvider,
    ValidationObserver,
    DataTable,
  },

  data() {
    return {
      name: '',
      price: 0,
      records: [],
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        { text: 'Price', value: 'price' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },

  async created() {
    await this.getRecords()
  },

  methods: {
    async submit() {
      await this.$axios
        .post('/api/cigaretteBrand', {
          name: this.name,
          price: this.price,
        })
        .then(async () => {
          this.$toast.success('Cigarette brand added successfull!')
          await this.getRecords()
          this.name = ''
          this.price = 0
          this.$refs.observer.reset()
        })
        .catch(() => {
          this.$toast.error('Something went wrong on adding cigarette brand')
        })
    },

    async getRecords() {
      await this.$axios
        .get('/api/cigaretteBrand')
        .then((response) => {
          this.records = response.data
        })
        .catch(() => {
          this.$toast.error('Something went wrong on getting data')
        })
    },

    async onDeleteItem(id) {
      await this.$axios
        .delete(`/api/cigaretteBrand/${id}`)
        .then(async () => {
          this.$toast.success('Cigarettes brand deleted successfull!')
          await this.getRecords()
        })
        .catch(() => {
          this.$toast.error('Something went wrong on deleting data')
        })
    },
  },
}
</script>
