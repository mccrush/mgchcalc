<template>
  <div class="row">
    <div class="col-12">
      <ul class="list-group">
        <li
          v-for="adminItem in sortMethod(adminItems, 'asc', 'position')"
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
              @click.stop="removeAdminItem(adminItem.type, adminItem.id)"
              class="my-btn-hide border-0"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mixinSortMethod } from './../../mixins/mixinSortMethod'

import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

export default {
  components: {
    ButtonTrash
  },
  mixins: [mixinSortMethod],
  computed: {
    adminRazdel() {
      return this.$store.getters.adminRazdel
    },

    adminItems() {
      if (this.adminRazdel !== 'obrabotkatolshina') {
        return this.$store.getters[this.adminRazdel]
      } else {
        return this.$store.getters[this.adminRazdel].filter(
          item => item.categoryId === this.categoryId
        )
      }
    },

    adminItemId() {
      return this.$store.getters.adminItemId
    },

    categoryId() {
      return this.$store.getters.categoryId
    }
  },
  methods: {
    setAdminItemId(id) {
      this.$store.commit('setAdminValue', {
        type: 'adminItemId',
        value: id
      })
    },

    removeAdminItem(type, id) {
      if (confirm('Точно удалить?')) {
        if (this.adminRazdel === 'obrabotkavid') {
          // То сначала удалить всех его детей obrabotkatolshina
          const childArray = this.$store.getters.obrabotkatolshina.filter(
            item => item.categoryId === id
          )
          console.log('В подгруппе столько детей:', childArray.length)
          // Перебирать массив детей и удалять каждый через forEach
          if (childArray.length) {
            childArray.forEach(item => {
              this.$store.dispatch('removeItem', {
                type: item.type,
                id: item.id
              })
            })
          }
        }
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