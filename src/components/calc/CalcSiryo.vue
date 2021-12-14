<template>
  <div class="row pt-2">
    <!---->
    <div class="col-12 col-sm-6 col-md-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="selectCatSiryo"
        v-model="categorySiryoId"
      >
        <option v-for="catS in categorySiryos" :key="catS.id" :value="catS.id">
          {{ catS.title }}
        </option>
      </select>
    </div>

    <div class="col-12 col-sm-6 col-md-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="runCalc"
        v-model="siryoSelectId"
      >
        <option v-for="sir in siryos" :key="sir.id" :value="sir.id">
          {{ sir.title }}
        </option>
      </select>
    </div>

    <div class="col-12 col-md-6">
      <div class="row">
        <div class="col-4 text-center pe-0">
          <small>{{ siryo.ed }} / {{ siryo.price + ' ₽' }}</small>
        </div>
        <div class="col-4 d-flex justify-content-start text-center">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="siryoDlina"
            @input="runCalc"
            :disabled="!categorySiryoId || !siryoSelectId"
          />
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="siryoShirina"
            @input="runCalc"
            :disabled="!categorySiryoId || !siryoSelectId"
          />
        </div>
        <div class="col-2 text-end">
          {{ siryoSumma }}
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
      categorySiryoId: '',
      siryoSelectId: '',
      siryoDlina: '',
      siryoShirina: '',
      siryoSize: 0,
      siryoSize10: 0
    }
  },
  computed: {
    siryoProcent() {
      if (this.$store.getters.procent.length) {
        return this.$store.getters.procent[0].value / 100
      }
    },
    categorySiryos() {
      return this.$store.getters.group
    },
    siryos() {
      return this.$store.getters.siryo.filter(
        item => item.categoryId === this.categorySiryoId
      )
    },
    siryo() {
      return (
        this.$store.getters.siryo.find(
          item => item.id === this.siryoSelectId
        ) || { ed: 'кв.м.', price: 0 }
      )
    },
    siryoSumma() {
      let dlina = this.siryoDlina.replace(/,/g, '.')
      let shirina = this.siryoShirina.replace(/,/g, '.')
      this.siryoSize = (dlina * shirina + dlina * shirina * 0.1).toFixed(1)
      return Math.ceil(
        this.siryo.price * this.siryoSize +
          this.siryo.price * this.siryoSize * this.siryoProcent
      )
    }
  },
  methods: {
    selectCatSiryo() {
      this.siryoSelectId = ''
      this.siryoSize = 0
    },
    runCalc() {
      const size = this.siryoSize.replace('.', ',')
      const message =
        this.siryo.title +
        ', ' +
        size +
        ' ' +
        this.siryo.ed +
        ' x ' +
        this.siryo.price +
        ' ₽ = ' +
        this.siryoSumma +
        ' ₽'
      this.$emit('calc-price', {
        type: this.type,
        id: this.id,
        sum: this.siryoSumma,
        message
      })
    }
  }
}
</script>