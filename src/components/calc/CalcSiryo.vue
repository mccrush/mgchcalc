<template>
  <div class="row pt-2 pb-2">
    <!---->
    <div class="col-3 pe-0">
      Группа сырья<br />
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

    <div class="col-3 pe-0">
      Сырье<br />
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

    <div class="col-3 text-center pe-0">
      Ед. / стоимость<br />
      <small>{{ siryo.ed }} / {{ siryo.price }}</small>
    </div>
    <div class="col-1 ps-0 pe-0">
      Размеры<br />
      <input
        type="text"
        class="form-control form-control-sm"
        v-model="siryoSize"
        @input="runCalc"
      />
    </div>
    <div class="col-2 text-end">
      Сумма<br />
      {{ siryoSumma }}
    </div>
    <!---->
  </div>
</template>

<script>
export default {
  emits: ['siryo-price'],
  data() {
    return {
      categorySiryoId: '',
      siryoSelectId: '',
      siryoSize: ''
    }
  },
  computed: {
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
      let size = this.siryoSize
      size = size.replace(/,/g, '.')
      return Math.ceil(this.siryo.price * size)
    }
  },
  methods: {
    selectCatSiryo() {
      this.siryoSelectId = ''
      this.siryoSize = ''
    },
    runCalc() {
      const message =
        this.siryo.title +
        ' ' +
        this.siryoSize +
        ' ' +
        this.siryo.ed +
        ' x ' +
        this.siryo.price +
        ' = ' +
        this.siryoSumma
      this.$emit('siryo-price', { sum: this.siryoSumma, message })
    }
  }
}
</script>