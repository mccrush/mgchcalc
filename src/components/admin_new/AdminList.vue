<template>
  <div class="row">
    <div class="col-12">
      <ul class="list-group">
        <li
          v-for="adminItem in adminItems"
          :key="adminItem.id"
          class="
            cursor-pointer
            list-group-item
            d-flex
            justify-content-between
            align-items-center
            small
            lh-1
            p-1
            ps-2
          "
          :class="{ active: adminItem.id === adminItemId }"
          @click="setAdminItemId(adminItem.id)"
        >
          <span>{{ adminItem.title }}</span>
          <div>
            <ButtonTrash
              @click.stop="removeContact(adminItem.type, adminItem.id)"
              class="my-btn-hide border-0"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

export default {
  components: {
    ButtonTrash
  },
  computed: {
    adminRazdel() {
      return this.$store.getters.adminRazdel
    },

    adminItems() {
      return this.$store.getters[this.adminRazdel]
    },

    adminItemId() {
      return this.$store.getters.adminItemId
    }
  },
  methods: {
    setAdminItemId(id) {
      this.$store.commit('setAdminValue', {
        type: 'adminItemId',
        value: id
      })
    },

    removeContact(type, id) {
      if (confirm('Точно удалить?')) {
        this.$store.dispatch('removeItem', { type, id })
      }
    }
  }
}
</script>

<style scoped>
.list-group-item.active {
  color: #212529;
  background-color: #bccee4;
  border-color: #bccee4;
}

.my-btn-hide {
  visibility: hidden;
}

.list-group-item.active .my-btn-hide {
  visibility: visible;
}
</style>