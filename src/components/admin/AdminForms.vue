<template>
  <div class="row">
    <div class="col-12 pt-2">
      <div
        v-for="(item, index) in sortFilter"
        :key="item.id"
        class="row pt-3 pb-3"
        :class="{ 'bg-light': index % 2 === 0 }"
        draggable="true"
        @dragstart="dragStart($event, item)"
        @dragover="dragOver($event)"
        @dragleave="dragLeave($event)"
        @drop="dropItem($event, item, index)"
        @dragover.prevent
      >
        <component
          :is="myForm"
          :item="item"
          :categoryId="categoryId"
          :categorys="categorys"
          @save-item="saveItem"
          @remove-item="removeItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import sortMethod from '@/scripts/sortMethod'

import FormMaterialvid from '@/components/admin/forms/FormMaterialVid'
import FormMaterial from '@/components/admin/forms/FormMaterial'
import FormObrabotkavid from '@/components/admin/forms/FormObrabotkaVid'
import FormObrabotkatolshina from '@/components/admin/forms/FormObrabotkaTolshina'
import FormDopuslug from '@/components/admin/forms/FormDopuslug'
import FormCustomer from '@/components/admin/forms/FormCustomer'

export default {
  components: {
    FormMaterialvid,
    FormMaterial,
    FormObrabotkavid,
    FormObrabotkatolshina,
    FormDopuslug,
    FormCustomer
  },
  props: ['type', 'categoryId', 'searchText', 'sortType'],
  emits: ['save-item', 'remove-item'],
  computed: {
    myForm() {
      const form =
        'Form' +
        this.type.substring(0, 1).toUpperCase() +
        this.type.substring(1)
      return form
    },
    categorys() {
      if (this.type === 'material') {
        return this.$store.getters.materialvid
      } else if (this.type === 'obrabotkatolshina') {
        return this.$store.getters.obrabotkavid
      }
    },
    items() {
      if (this.type === 'obrabotkatolshina' || this.type === 'material') {
        return this.$store.getters[this.type].filter(
          item => item.categoryId === this.categoryId
        )
      } else {
        return this.$store.getters[this.type]
      }
    },
    searchFilter() {
      if (this.searchText) {
        return this.items.filter(item =>
          item.title.toUpperCase().includes(this.searchText.toUpperCase())
        )
      } else {
        return this.items
      }
    },
    sortFilter() {
      return sortMethod(this.searchFilter, this.sortType, 'position')
    }
  },
  methods: {
    dragStart(e, item) {
      e.dataTransfer.setData('itemId', item.id)
      // console.log(e.currentTarget.classList)
      // if (e.currentTarget.classList.contains('drag-button')) {
      //   e.dataTransfer.setData('itemId', item.id)
      // } else {
      //   e.preventDefault()
      // }
    },
    dragOver(e) {
      e.currentTarget.classList.remove('bg-light')
      e.currentTarget.classList.add('bg-secondary')
    },
    dragLeave(e) {
      e.currentTarget.classList.remove('bg-secondary')
    },
    dropItem(e, item, index) {
      e.currentTarget.classList.remove('bg-secondary')
      if (index % 2 === 0) e.currentTarget.classList.add('bg-light')

      const itemId = e.dataTransfer.getData('itemId')

      if (item.id !== itemId) {
        const newItemPos = item.position

        const itemIndex = this.items.findIndex(item => item.id === itemId)
        let element = this.items[itemIndex]
        element.position = newItemPos
        this.saveItem({ item: element })

        // Пока не до конца ясно, почему надо делать так,
        // почему не обновляются данные через computed
        this.items.splice(itemIndex, 1)
        this.items.splice(index, 0, element)

        if (itemIndex > index) {
          this.upArrayIndexes(index, newItemPos, this.items)
        } else {
          this.downArrayIndexes(index, this.items)
        }
      }
    },
    upArrayIndexes(index, newPos, array) {
      let element
      for (let i = index + 1; i < array.length; i++) {
        newPos = +newPos + 1
        element = array[i]
        element.position = newPos
        this.saveItem({ item: element })
        //console.log('new elem up pos:', element)
      }
    },
    downArrayIndexes(index, array) {
      let element
      for (let i = 0; i < index; i++) {
        element = array[i]
        element.position = i + 1
        this.saveItem({ item: element })
        //console.log('new elem down pos:', element)
      }
    },
    saveItem({ item }) {
      this.$emit('save-item', { item })
    },
    removeItem(id) {
      this.$emit('remove-item', id)
    }
  }
}
</script>

<style>
.drag-button,
.position-block {
  width: 24px;
}
</style>