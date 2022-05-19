<template>
  <div class="row pt-2">
    <!---->
    <div class="col-12 col-sm-6 col-md-3 pe-sm-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="updateCalc"
        v-model="categoryId"
      >
        <option v-for="catS in categoryArray" :key="catS.id" :value="catS.id">
          {{ catS.title }}
        </option>
      </select>
    </div>

    <div class="d-none d-md-block col-3 pe-0"></div>

    <div class="col-12 col-md-6 mt-2 mt-md-0">
      <div class="row">
        <div class="col-5">
          <input
            v-if="element.alias === 'prefiles' || element.alias === 'sborizdel'"
            type="text"
            class="form-control form-control-sm"
            v-model.number="element.price"
            @input="updateCalc"
            :disabled="!categoryId"
          />
          <div
            v-if="
              element.alias === 'shlifaner' || element.alias === 'obrabottorcov'
            "
            class="text-center pt-1"
          >
            <small>{{ element.ed }} / {{ element.price + ' ₽' }}</small>
          </div>
        </div>
        <div class="col-3">
          <input
            v-if="
              element.alias === 'shlifaner' || element.alias === 'obrabottorcov'
            "
            type="text"
            class="form-control form-control-sm"
            v-model="elementSize"
            @input="updateCalc"
            :disabled="!categoryId"
          />
        </div>
        <div class="col-2 text-center small pt-1">
          {{ elementSumma }}
        </div>
        <div class="col-2 text-end">
          <ButtonTrash @click="$emit('remove-calc', { type, id })" />
        </div>
      </div>
    </div>
    <!---->
  </div>
</template>

<script>
import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

export default {
  components: {
    ButtonTrash
  },
  props: ['type', 'id'],
  emits: ['update-calc', 'remove-calc'],
  data() {
    return {
      categoryId: '',
      elementSize: ''
    }
  },
  computed: {
    categoryArray() {
      return this.$store.getters.dopuslug
    },
    categoryTitle() {
      return this.categoryArray.find(item => item.id === this.categoryId).title
    },
    element() {
      return (
        this.categoryArray.find(item => item.id === this.categoryId) || {
          alias: '',
          price: 0,
          ed: ''
        }
      )
    },
    elementSumma() {
      if (
        this.element.alias === 'prefiles' ||
        this.element.alias === 'sborizdel'
      ) {
        return this.element.price
      } else if (
        this.element.alias === 'shlifaner' ||
        this.element.alias === 'obrabottorcov'
      ) {
        let size = this.elementSize
        size = size.replace(/,/g, '.')
        return Math.ceil(this.element.price * size)
      } else if (this.element.alias === 'vneochered') {
        return 'x2'
      }
    }
  },
  methods: {
    updateCalc() {
      const item = {
        type: 'task',
        id: this.id,
        groupId: '',
        elemId: this.categoryId,
        typeArray: this.type,
        title: this.categoryTitle,
        price: this.element.price,
        dlina: 0,
        shirina: 0,
        size: Number(this.elementSize.replace(/,/g, '.')),
        ed: this.element.ed,
        summa: this.elementSumma,
        orderId: ''
      }

      this.$emit('update-calc', item)
    }
  },
  watch: {
    categoryId() {
      this.elementSize = ''
    }
  }
}
</script>