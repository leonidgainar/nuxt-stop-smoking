<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <h1>Login</h1>

      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
        ></v-text-field>
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="Password" rules="required">
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :error-messages="errors"
          label="Password"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </validation-provider>

      <v-btn type="submit" class="mt-4" color="primary" :disabled="invalid">
        Login
      </v-btn>

      <p class="mt-4">
        Not registered?
        <nuxt-link class="black--text font-weight-bold" to="/register">
          Create an account
        </nuxt-link>
      </p>
    </form>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'LoginPage',

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  layout: 'login',

  data() {
    return {
      password: '',
      email: '',
      showPassword: false,
    }
  },

  methods: {
    async submit() {
      await this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((response) => {
          this.$toast.success('Login successfull!')
          if (response.status === 200) {
            this.password = ''
            this.email = ''
            this.$refs.observer.reset()
            this.$router.push('/')
          }
        })
        .catch(() => {
          this.$toast.error('Wrong username and/or password')
        })
    },
  },
}
</script>
