<template>
  <div class="row pt-3">
    <div class="col-12 d-flex justify-content-between">
      <h5 class="m-0">Стоимость работы</h5>
    </div>
  </div>
  <div class="row pt-2 pb-2">
    <!---->
    <div class="col-3 pe-0">
      <small class="text-muted">Группа работы</small><br />
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
      <small class="text-muted">Работа (толщина)</small><br />
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
    <div class="col-3 text-center ps-0 pe-0">
      <small class="text-muted">Колич.</small><br />
      <div class="btn-group btn-group-sm" role="group" aria-label="Kolich">
        <button
          type="button"
          class="btn btn-primary"
          :class="{ active: rabotaAmount === 'priceS' }"
          @click="setRabotaAmount('priceS')"
        >
          &lt;100
        </button>
        <button
          type="button"
          class="btn btn-primary"
          :class="{ active: rabotaAmount === 'priceM' }"
          @click="setRabotaAmount('priceM')"
        >
          &gt;100
        </button>
        <button
          type="button"
          class="btn btn-primary"
          :class="{ active: rabotaAmount === 'priceL' }"
          @click="setRabotaAmount('priceL')"
        >
          &gt;500
        </button>
      </div>
    </div>
    <div class="col-1 ps-0 pe-0">
      <small class="text-muted">Размеры</small><br />
      <input
        type="text"
        class="form-control form-control-sm"
        v-model="rabotaSize"
        @input="runCalc"
      />
    </div>
    <div class="col-2 text-end">
      <small class="text-muted">Сумма</small><br />
      {{ rabotaSumma }}
    </div>
    <!---->
  </div>
</template>

<script>
export default {
  emits: ['rabota-price'],
  data() {
    return {
      categoryRabotaId: '',
      rabotaSelectId: '',
      rabotaAmount: 'priceS',
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
    rabotaSumma() {
      let size = this.rabotaSize
      size = size.replace(/,/g, '.')
      //const price = this.rabota[this.rabotaAmount] || 0
      //return Math.ceil(price * size)
      return Math.ceil(this.rabota[this.rabotaAmount] * size)
    }
  },
  methods: {
    selectCatRabota() {
      this.rabotaSelectId = ''
      this.rabotaSize = ''
    },
    setRabotaAmount(priceType) {
      this.rabotaAmount = priceType
      this.runCalc()
    },
    runCalc() {
      const message =
        this.categoryTitle +
        ' ' +
        this.rabotaSize +
        ' мм ' +
        ' x ' +
        this.rabota[this.rabotaAmount] +
        ' = ' +
        this.rabotaSumma
      this.$emit('rabota-price', { sum: this.rabotaSumma, message })
    }
  }
}
</script>