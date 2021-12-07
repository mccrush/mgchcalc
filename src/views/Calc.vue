<template>
  <div class="row pt-2">
    <div class="col-12 d-flex justify-content-between">
      <h4 class="m-0">Стоимость сырья</h4>
      <div class="form-check form-switch pt-1">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="siryoEnable"
          :checked="siryoEnable"
          @change="siryoEnable = !siryoEnable"
        />
        <label class="form-check-label" for="siryoEnable">Считать</label>
      </div>
    </div>
  </div>
  <CalcSiryo v-show="siryoEnable" @siryo-price="siryoPrice" />
  <CalcRabota @rabota-price="rabotaPrice" />
  <div class="row pt-2">
    <div class="col-12 d-flex justify-content-between border-top p-3">
      <div></div>
      <div>Итого: {{ sumItogo }}</div>
    </div>
  </div>
</template>

<script>
import CalcSiryo from '@/components/calc/CalcSiryo'
import CalcRabota from '@/components/calc/CalcRabota'

export default {
  components: {
    CalcSiryo,
    CalcRabota
  },
  data() {
    return {
      siryoEnable: true,
      siryoSum: 0,
      rabotaSum: 0
    }
  },
  computed: {
    sumItogo() {
      if (this.siryoEnable) {
        return this.siryoSum + this.rabotaSum
      } else {
        return this.rabotaSum
      }
    }
  },
  methods: {
    siryoPrice({ sum }) {
      this.siryoSum = sum
    },
    rabotaPrice({ sum }) {
      this.rabotaSum = sum
    }
  }
}
</script>