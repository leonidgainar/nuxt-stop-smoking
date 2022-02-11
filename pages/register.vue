<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <h1>Register</h1>

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

      <validation-provider
        v-slot="{ errors }"
        name="Password"
        rules="required|min:8"
      >
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :error-messages="errors"
          label="Password"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="Confirm password"
        :rules="{ required: true, min: 8, is_the_same: [password] }"
      >
        <v-text-field
          v-model="confirmPassword"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showConfirmPassword ? 'text' : 'password'"
          :error-messages="errors"
          label="Confirm password"
          @click:append="showConfirmPassword = !showConfirmPassword"
        ></v-text-field>
      </validation-provider>

      <v-btn type="submit" class="mt-4" color="primary" :disabled="invalid">
        Register
      </v-btn>

      <p class="mt-4">
        Have already an account?
        <nuxt-link class="black--text font-weight-bold" to="/login">
          Login here
        </nuxt-link>
      </p>
    </form>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'

extend('is_the_same', {
  validate: (value, { comparedValue }) => {
    if (!value || !value.length) {
      return true
    }

    if (comparedValue !== value) {
      return false
    }
    return true
  },
  params: ['comparedValue'],
  message: 'Passwords must be the same',
})

export default {
  name: 'RegisterPage',

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  layout: 'login',

  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    }
  },

  methods: {
    async submit() {
      await this.$axios
        .post('/api/auth/register', {
          email: this.email,
          password: this.password,
        })
        .then(async () => {
          await this.auth()
        })
        .catch(() => {
          this.$toast.error('User with this email already exists!')
        })
    },

    async auth() {
      await this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.$toast.success('Registration successfull!')
            this.email = ''
            this.password = ''
            this.confirmPassword = ''
            this.$refs.observer.reset()
          }
        })
    },
  },
}
</script>
