<template>
  <div>
    <div class="row pt-3">
      <div class="col-12 d-flex justify-content-between">
        <h5 class="m-0">Стоимость сырья</h5>
        <!-- <div class="form-check form-switch pt-1">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="siryoEnable"
            :checked="siryoEnable"
            @change="siryoEnable = !siryoEnable"
          />
          <label class="form-check-label" for="siryoEnable">Считать</label>
        </div> -->
      </div>
    </div>
    <CalcSiryo
      v-for="(sir, index) in siryoArray"
      :key="'sir' + index"
      :index="index"
      @siryo-price="siryoPrice"
    />
    <div class="row">
      <div class="col-12 d-flex justify-content-between">
        <button
          class="btn btn-sm btn-outline-light text-muted"
          @click="addSiryoCalc"
        >
          Добавить позицию
        </button>
      </div>
    </div>
    <div class="row pt-3">
      <div class="col-12 d-flex justify-content-between">
        <h5 class="m-0">Стоимость работы</h5>
      </div>
    </div>
    <CalcRabota @rabota-price="rabotaPrice" />
    <div class="row bg-light">
      <div class="col-8"></div>
      <div class="col-4 d-flex justify-content-between p-2 pe-2">
        <div></div>
        <div>
          Итого: <span class="fw-bold">{{ sumItogo }}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-9 d-flex justify-content-between p-2">
        <div></div>
        <div class="w-100">
          <textarea
            class="form-control w-100"
            rows="3"
            v-model="itogMessage"
          ></textarea>
        </div>
      </div>
      <div class="col-3 d-flex flex-column justify-content-end p-2 ps-0">
        <button
          class="btn btn-outline-dark w-100"
          @click="copyInBuffer($event)"
        >
          Копировать
        </button>
      </div>
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
      rabotaSum: 0,
      siryoMessage: '',
      rabotaMessage: '',
      siryoArray: [
        {
          sum: 0,
          message: ''
        }
      ]
    }
  },
  computed: {
    sumItogo() {
      if (this.siryoEnable) {
        return this.siryoSum + this.rabotaSum
      } else {
        return this.rabotaSum
      }
    },
    itogMessage() {
      let messageSiryo = ''
      this.siryoArray.forEach(item => {
        messageSiryo += item.message + '\n'
      })

      if (this.siryoEnable) {
        return (
          messageSiryo +
          '\n' +
          this.rabotaMessage +
          '\nИтого ' +
          this.sumItogo +
          ' ₽'
        )
      } else {
        return this.rabotaMessage + '\nИтого ' + this.sumItogo + ' ₽'
      }
    }
  },
  methods: {
    addSiryoCalc() {
      this.siryoArray.push({
        sum: 0,
        message: ''
      })
    },
    siryoPrice({ index, sum, message }) {
      let item = {
        sum,
        message
      }
      this.siryoArray[index] = item
      // this.siryoSum = sum
      // this.siryoMessage = message
    },
    rabotaPrice({ sum, message }) {
      this.rabotaSum = sum
      this.rabotaMessage = message
    },
    copyInBuffer(e) {
      const el = e.target.parentNode.previousSibling.lastChild.lastChild
      el.select()
      if (document.execCommand('copy')) {
        console.log('Результат скопирован в буфер')
      }
    }
  }
}
</script>