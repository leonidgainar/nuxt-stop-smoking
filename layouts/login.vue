<template>
  <v-app dark>
    <v-app-bar color="primary" dark fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row class="d-flex justify-center" style="height: 80vh">
          <v-col cols="11" sm="8" md="6" xl="4" align-self="center">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout',

  data() {
    return {
      title: 'Stop Smoking!',
    }
  },
}
</script>
