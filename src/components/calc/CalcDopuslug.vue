<template>
  <div class="row pt-2">
    <!---->
    <div class="col-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="selectCategory"
        v-model="categoryId"
      >
        <option v-for="catS in categoryArray" :key="catS.id" :value="catS.id">
          {{ catS.title }}
        </option>
      </select>
    </div>

    <div class="col-3 pe-0">
      <!-- <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="runCalc"
        v-model="rabotaSelectId"
      >
        <option v-for="sir in rabotas" :key="sir.id" :value="sir.id">
          {{ sir.title }}
        </option>
      </select> -->
    </div>

    <div class="col-12 col-md-6">
      <div class="row">
        <!-- <div class="col-5">
          <KolichBut :rabotaAmount="rabotaAmount" />
        </div>
        <div class="col-3">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="elementSize"
            @input="runCalc"
            :disabled="!categoryId || !rabotaSelectId"
          />
        </div> -->
        <div class="col-2 text-end">
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
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    ButtonTrash
  },
  props: ['type', 'id'],
  emits: ['calc-price', 'remove-calc'],
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
      return this.categoryArray.find(item => item.id === this.categoryId)
    },
    elementSumma() {
      let size = this.elementSize
      size = size.replace(/,/g, '.')
      return 42 // Math.ceil(this.element.price * size)
    }
  },
  methods: {
    runCalc() {
      const size = this.elementSize.replace('.', ',')
      const message =
        this.categoryTitle +
        ', ' +
        size +
        ' ' +
        this.element.ed +
        ' x ' +
        this.element.price +
        ' ₽ = ' +
        this.elementSumma +
        ' ₽'
      this.$emit('calc-price', {
        type: this.type,
        id: this.id,
        sum: this.elementSumma,
        message
      })
    }
  }
}
</script>