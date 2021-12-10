<template>
  <div class="row pt-2">
    <!---->
    <div class="col-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="selectCatRabota"
        v-model="categoryRabotaId"
      >
        <option v-for="catS in categoryRabotas" :key="catS.id" :value="catS.id">
          {{ catS.title }}
        </option>
      </select>
    </div>

    <div class="col-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="runCalc"
        v-model="rabotaSelectId"
      >
        <option v-for="sir in rabotas" :key="sir.id" :value="sir.id">
          {{ sir.title }}
        </option>
      </select>
    </div>

    <div class="col-12 col-md-6">
      <div class="row">
        <div class="col-5">
          <KolichBut :rabotaAmount="rabotaAmount" />
        </div>
        <div class="col-3">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="rabotaSize"
            @input="runCalc"
            :disabled="!categoryRabotaId || !rabotaSelectId"
          />
        </div>
        <div class="col-2 text-end">
          {{ rabotaSumma }}
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
import KolichBut from '@/components/buttons/KolichBut'

export default {
  components: {
    ButtonTrash,
    KolichBut
  },
  props: ['type', 'id'],
  emits: ['calc-price', 'remove-calc'],
  data() {
    return {
      categoryRabotaId: '',
      rabotaSelectId: '',
      rabotaSize: ''
    }
  },
  computed: {
    categoryRabotas() {
      return this.$store.getters.frezer
    },
    categoryTitle() {
      return this.categoryRabotas.find(
        item => item.id === this.categoryRabotaId
      ).title
    },
    rabotas() {
      return this.$store.getters.rabota.filter(
        item => item.categoryId === this.categoryRabotaId
      )
    },
    rabota() {
      return (
        this.$store.getters.rabota.find(
          item => item.id === this.rabotaSelectId
        ) || { priceS: 0, priceM: 0, priceL: 0 }
      )
    },
    rabotaAmount() {
      if (+this.rabotaSize < 100) {
        return 'priceS'
      } else if (+this.rabotaSize >= 100 && +this.rabotaSize < 500) {
        return 'priceM'
      } else if (+this.rabotaSize >= 500) {
        return 'priceL'
      } else {
        return 'priceS'
      }
    },
    rabotaPrice() {
      if (+this.rabotaSize < 100) {
        return this.rabota.priceS
      } else if (+this.rabotaSize >= 100 && +this.rabotaSize < 500) {
        return this.rabota.priceM
      } else if (+this.rabotaSize >= 500) {
        return this.rabota.priceL
      }
    },
    rabotaSumma() {
      let size = this.rabotaSize
      size = size.replace(/,/g, '.')
      return Math.ceil(this.rabotaPrice * size)
    }
  },
  methods: {
    selectCatRabota() {
      this.rabotaSelectId = ''
    },
    setRabotaAmount(priceType) {
      this.rabotaAmount = priceType
      this.runCalc()
    },
    runCalc() {
      const size = this.rabotaSize.replace('.', ',')
      const message =
        this.categoryTitle +
        ' ' +
        this.rabota.title +
        ', ' +
        size +
        ' м.п.' +
        ' x ' +
        this.rabota[this.rabotaAmount] +
        ' ₽ = ' +
        this.rabotaSumma +
        ' ₽'
      this.$emit('calc-price', {
        type: this.type,
        id: this.id,
        sum: this.rabotaSumma,
        message
      })
    }
  }
}
</script>