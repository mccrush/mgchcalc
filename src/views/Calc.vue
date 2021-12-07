<template>
  <div class="row pt-2 border">
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
  <CalcSiryo v-if="siryoEnable" @siryo-price="siryoPrice" />
  <div class="row pt-2 pb-2 border">
    <div class="col-12 d-flex justify-content-between">
      <div></div>
      <div>Итого: {{ sumItogo }}</div>
    </div>
  </div>
</template>

<script>
import CalcSiryo from '@/components/calc/CalcSiryo'

export default {
  components: {
    CalcSiryo
  },
  data() {
    return {
      siryoEnable: true,
      siryoSum: 0
    }
  },
  computed: {
    sumItogo() {
      return this.siryoSum
    }
  },
  methods: {
    siryoPrice(sum) {
      this.siryoSum = sum
    }
  }
}
</script>