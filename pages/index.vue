<template>
  <v-container>
    <v-row class="d-flex justify-center mt-4">
      <v-col cols="12" sm="8" md="6">
        <v-card outlined height="100%">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{ today }}
              </div>
              <div class="text-h5 mb-1">
                Cigarettes smoked today: {{ todayCigaretteAmount }}
              </div>
            </v-list-item-content>

            <v-list-item-avatar dark size="80" color="brown">
              <v-icon color="white" size="60">mdi-smoking</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text @click="addCigarettes(1)">
              Add +1
            </v-btn>
            <v-btn outlined rounded text @click="addCigarettes(3)">
              Add +3
            </v-btn>
            <v-btn outlined rounded text @click="addCigarettes(5)">
              Add +5
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-card outlined height="100%">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{ today }}
              </div>
              <div class="text-h5 mb-1">
                Money spent today: {{ todayMoneyAmount }}
              </div>
            </v-list-item-content>

            <v-list-item-avatar size="80" color="blue-grey">
              <v-icon color="white" size="60">mdi-cash</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              v-for="price in brandsPrice"
              :key="price"
              outlined
              rounded
              text
              @click="addMoney(price)"
            >
              Add +{{ price }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center mt-4">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto text-center">
          <v-card-text>
            <div class="text-h5">
              Cigarettes smoked this week: {{ cigarettesCurrentWeek }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto text-center">
          <v-card-text>
            <div class="text-h5">
              Money spent this week: {{ moneyCurrentWeek }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center mt-4">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto text-center">
          <v-card-text>
            <div class="text-h5">
              Cigarettes smoked total: {{ cigarettesAmountTotal }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto text-center">
          <v-card-text>
            <div class="text-h5">Money spent total: {{ moneyAmountTotal }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { startOfWeek, addDays, eachDayOfInterval } from 'date-fns'

export default {
  name: 'IndexPage',

  data: () => ({
    today: new Date().toISOString().substring(0, 10),
    currentWeek: null,
    cigarettesCurrentWeek: 0,
    moneyCurrentWeek: 0,
    todayCigaretteAmount: 0,
    todayMoneyAmount: 0,
    cigarettesAmountTotal: 0,
    moneyAmountTotal: 0,
    brandsPrice: [],
  }),

  created() {
    this.currentWeek = this.getCurrentWeekDates()

    this.getCigarettesStats()

    this.getMoneyStats()

    this.getBrandsPrice()
  },

  methods: {
    getCurrentWeekDates() {
      const start = startOfWeek(new Date(), { weekStartsOn: 1 })
      const end = addDays(start, 6)
      return eachDayOfInterval({ start, end })
    },

    async getMoneyAmountForToday() {
      await this.$axios.get(`/api/money/${this.today}`).then((response) => {
        this.todayMoneyAmount = response.data.amount || 0
      })
    },

    getMoneyAmountForCurrentWeek(interval) {
      interval.forEach(async (day) => {
        day = day.toISOString().substring(0, 10)
        await this.$axios.get(`/api/money/${day}`).then((response) => {
          this.moneyCurrentWeek = 0
          this.moneyCurrentWeek += response.data.amount || 0
        })
      })
    },

    async getMoneyAmountTotal() {
      await this.$axios.get('/api/money').then((response) => {
        this.moneyAmountTotal = 0
        response.data.forEach(({ amount }) => {
          this.moneyAmountTotal += parseFloat(amount)
        })
      })
    },

    async addMoney(amount) {
      await this.$axios
        .post('/api/money', {
          date: this.today,
          amount,
        })
        .then(() => {
          this.$toast.success('Money amount added successfull!')
          this.getMoneyStats()
        })
        .catch(() => {
          this.$toast.error('Something went wrong on adding money amount')
        })
    },

    getMoneyStats() {
      this.getMoneyAmountForToday()
      this.getMoneyAmountForCurrentWeek(this.currentWeek)
      this.getMoneyAmountTotal()
    },

    async getCigarettesAmountForToday() {
      await this.$axios.get(`/api/cigarette/${this.today}`).then((response) => {
        this.todayCigaretteAmount = response.data.amount || 0
      })
    },

    getCigarettesAmountForCurrentWeek(interval) {
      interval.forEach(async (day) => {
        day = day.toISOString().substring(0, 10)
        await this.$axios.get(`/api/cigarette/${day}`).then((response) => {
          this.cigarettesCurrentWeek = 0
          this.cigarettesCurrentWeek += response.data.amount || 0
        })
      })
    },

    async getCigarettesAmountTotal() {
      await this.$axios.get('/api/cigarette').then((response) => {
        this.cigarettesAmountTotal = 0
        response.data.forEach(({ amount }) => {
          this.cigarettesAmountTotal += parseInt(amount)
        })
      })
    },

    getCigarettesStats() {
      this.getCigarettesAmountForToday()
      this.getCigarettesAmountForCurrentWeek(this.currentWeek)
      this.getCigarettesAmountTotal()
    },

    async getBrandsPrice() {
      const brandsArray = []

      await this.$axios.get('/api/cigaretteBrand').then((response) => {
        response.data.forEach(({ price }) => {
          brandsArray.push(price)
        })
      })

      this.brandsPrice = new Set([...brandsArray])
    },

    async addCigarettes(amount) {
      await this.$axios
        .post('/api/cigarette', {
          date: this.today,
          amount,
        })
        .then(() => {
          this.$toast.success('Cigarettes amount added successfull!')
          this.getCigarettesStats()
        })
        .catch(() => {
          this.$toast.error('Something went wrong on adding money amount')
        })
    },
  },
}
</script>
