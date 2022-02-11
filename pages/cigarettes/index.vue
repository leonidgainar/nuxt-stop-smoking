<template>
  <v-row class="d-flex justify-center text-center mt-4">
    <v-col cols="12" sm="8" md="6">
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <v-date-picker
            v-model="date"
            full-width
            color="brown"
            :max="maxDate"
          ></v-date-picker>

          <validation-provider
            v-slot="{ errors }"
            name="amount"
            rules="required|min_value:1"
          >
            <v-text-field
              v-model="amount"
              type="number"
              :error-messages="errors"
              label="Number of smoked cigarettes"
              color="brown"
              class="px-4"
            ></v-text-field>
          </validation-provider>
          <v-btn
            type="submit"
            class="mt-4 white--text"
            color="brown"
            :disabled="invalid"
          >
            Add cigarettes
          </v-btn>
        </form>
      </validation-observer>
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <DataTable
        title="Cigarettes amount"
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
  name: 'CigarettesPage',
  components: {
    ValidationProvider,
    ValidationObserver,
    DataTable,
  },
  data() {
    return {
      maxDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      amount: 0,
      records: [],
      headers: [
        {
          text: 'Date',
          value: 'date',
        },
        { text: 'Amount', value: 'amount' },
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
        .post('/api/cigarette', {
          date: this.date,
          amount: this.amount,
        })
        .then(async () => {
          this.$toast.success('Cigarettes amount added successfull!')
          await this.getRecords()
          this.date = this.maxDate
          this.amount = 0
          this.$refs.observer.reset()
        })
        .catch(() => {
          this.$toast.error('Something went wrong on adding cigarettes amount')
        })
    },

    async getRecords() {
      await this.$axios
        .get('/api/cigarette')
        .then((response) => {
          this.records = response.data
        })
        .catch(() => {
          this.$toast.error('Something went wrong on getting data')
        })
    },

    async onDeleteItem(id) {
      await this.$axios
        .delete(`/api/cigarette/${id}`)
        .then(async () => {
          this.$toast.success('Cigarette amount deleted successfull!')
          await this.getRecords()
        })
        .catch(() => {
          this.$toast.error('Something went wrong on deleting data')
        })
    },
  },
}
</script>
