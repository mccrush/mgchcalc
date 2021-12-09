<template>
  <div class="row pt-2 pb-2">
    <!---->
    <div class="col-12 col-sm-6 col-md-3 pe-0">
      <small class="text-muted">Группа сырья</small><br />
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
      <small class="text-muted">Сырье</small><br />
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
          <small class="text-muted">Ед. / стоимость</small><br />
          <small>{{ siryo.ed }} / {{ siryo.price }}</small>
        </div>
        <div class="col-6 d-flex justify-content-start text-center ps-0 pe-0">
          <div class="width-64px">
            <small class="text-muted">д</small><br />
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="siryoDlina"
              @input="runCalc"
            />
          </div>
          <div class="width-64px">
            <small class="text-muted">ш</small><br />
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="siryoShirina"
              @input="runCalc"
            />
          </div>
          <div class="align-self-end small pb-2">
            {{ '&nbsp;= ' + siryoSize + ' кв.м.' }}
          </div>
        </div>
        <div class="col-2 text-end">
          <small class="text-muted">Сумма</small><br />
          {{ siryoSumma }}
        </div>
      </div>
    </div>
    <!---->
  </div>
</template>

<script>
export default {
  props: ['index'],
  emits: ['siryo-price'],
  data() {
    return {
      categorySiryoId: '',
      siryoSelectId: '',
      siryoDlina: '',
      siryoShirina: '',
      siryoSize: 0
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
      let dlina = this.siryoDlina.replace(/,/g, '.')
      let shirina = this.siryoShirina.replace(/,/g, '.')
      this.siryoSize = (dlina * shirina).toFixed(1)
      return Math.ceil(this.siryo.price * this.siryoSize)
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
      this.$emit('siryo-price', {
        index: this.index,
        sum: this.siryoSumma,
        message
      })
    }
  }
}
</script>

<style scoped>
.width-64px {
  width: 64px;
}
</style>