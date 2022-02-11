<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="calories"
    class="elevation-1 text-left"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h6">
              Are you sure you want to delete this item?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                OK
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template #no-data>
      <span>No data</span>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    records: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    dialogDelete: false,
    items: [],
    itemId: -1,
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
    records() {
      this.items = this.records
    },
  },
  methods: {
    deleteItem(item) {
      this.itemId = item.id
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$emit('delete-item', this.itemId)
      this.closeDelete()
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.itemId = -1
      })
    },
  },
}
</script>
