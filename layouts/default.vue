<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" dark fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: ['auth'],

  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-smoking',
          title: 'Smoked cigarettes',
          to: '/cigarettes',
        },
        {
          icon: 'mdi-cash-multiple',
          title: 'Money spent',
          to: '/money',
        },
        {
          icon: 'mdi-view-list',
          title: 'Cigarettes brands',
          to: '/cigarettes/brands',
        },
      ],
      title: 'Stop Smoking!',
    }
  },
}
</script>
