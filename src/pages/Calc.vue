<template>
  <div class="width-960 bg-white shadow-sm rounded-3 mt-4 m-auto p-3 pb-0">
    <div class="row pt-3">
      <div class="col-12 d-flex justify-content-start">
        <h5 class="lh-1 m-0">Материалы</h5>
        <div class="form-check form-switch ms-3">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="enableProcent"
            :checked="!enableProcent"
            @change="enableProcent = !enableProcent"
          />
          <label class="form-check-label lh-1" for="enableProcent"
            >Наценка
            {{ enableProcent ? 'включена' : 'отключена' }}
          </label>
        </div>
      </div>
    </div>
    <div class="row d-none d-md-flex small text-center text-muted pt-2">
      <div class="col-3">Группа материала</div>
      <div class="col-3">Материал</div>
      <div class="col-12 col-md-6">
        <div class="row">
          <div class="col-3">Ед. / стоим.</div>
          <div class="col-2">Наш</div>
          <div class="col-3">Размеры</div>
          <div class="col-2">Сумма</div>
          <div class="col-2">Удалить</div>
        </div>
      </div>
    </div>
    <CalcSiryo
      v-for="sir in siryoArray"
      :key="sir.id"
      :id="sir.id"
      :enableProcent="enableProcent"
      type="siryoArray"
      @update-calc="updateCalcInArray"
      @remove-calc="removeCalc"
      data-test="calc-siryo"
    />
    <BlockAddCalc
      @add-new-calc="addNewCalc"
      type="siryoArray"
      data-test="new-calc-siryo"
    />
    <BlockShowSum title="материал" :sum="formattingSum(siryoSum)" />
    <!-- -->
    <div class="row pt-3">
      <div class="col-12 d-flex justify-content-start">
        <h5 class="lh-1 m-0">Услуги обработки</h5>
        <div class="form-check form-switch ms-2">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="enableMinPrice"
            :checked="!enableMinPrice"
            @change="enableMinPrice = !enableMinPrice"
          />
          <label class="form-check-label lh-1" for="enableMinPrice"
            >Мин. стоимость
            {{ enableMinPrice ? 'включена' : 'отключена' }}</label
          >
        </div>
      </div>
    </div>
    <div class="row d-none d-md-flex small text-center text-muted pt-2">
      <div class="col-3">Вид обработки</div>
      <div class="col-3">Толщина материала</div>
      <div class="col-12 col-md-6">
        <div class="row">
          <div class="col-5">Колич.</div>
          <div class="col-3">Разм./кол.</div>
          <div class="col-2">Сумма</div>
          <div class="col-2">Удалить</div>
        </div>
      </div>
    </div>
    <CalcRabota
      v-for="rab in rabotaArray"
      :key="rab.id"
      :id="rab.id"
      type="rabotaArray"
      @update-calc="updateCalcInArray"
      @remove-calc="removeCalc"
    />
    <BlockAddCalc @add-new-calc="addNewCalc" type="rabotaArray" />
    <BlockShowSum title="обработка" :sum="formattingSum(rabotaSum)" />
    <!-- -->
    <div>
      <div class="row pt-3">
        <div class="col-12 d-flex justify-content-between">
          <h5 class="lh-1 m-0">Дополнительные услуги</h5>
        </div>
      </div>
      <div class="row d-none d-md-flex small text-center text-muted pt-2">
        <div class="col-3">Группа услуги</div>
        <div class="col-3">--</div>
        <div class="col-12 col-md-6">
          <div class="row">
            <div class="col-5">Ед. / стоим.</div>
            <div class="col-3">Разм./кол.</div>
            <div class="col-2">Сумма</div>
            <div class="col-2">Удалить</div>
          </div>
        </div>
      </div>
      <CalcDopuslug
        v-for="rab in dopuslugArray"
        :key="rab.id"
        :id="rab.id"
        type="dopuslugArray"
        @update-calc="updateCalcInArray"
        @remove-calc="removeCalc"
      />
      <BlockAddCalc @add-new-calc="addNewCalc" type="dopuslugArray" />
      <BlockShowSum title="допуслуги" :sum="formattingSum(dopuslugSum)" />
    </div>
    <!-- -->
    <div class="row bg-secondary">
      <div class="col-8"></div>
      <div class="col-4 d-flex justify-content-between p-1 pe-3 pe-md-2">
        <div></div>
        <div class="small text-light">
          Итого: <span class="fw-bold">{{ formattingSum(sumItogo) }}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-9 d-flex justify-content-between p-2">
        <div></div>
        <div class="w-100">
          <textarea
            class="form-control w-100"
            rows="5"
            v-model="itogMessage"
          ></textarea>
        </div>
      </div>
      <div
        class="
          col-12 col-md-3
          d-flex
          flex-column
          justify-content-end
          p-2
          ps-md-0
        "
      >
        <button
          class="btn btn-sm btn-success w-100 mb-2"
          @click="createNewOrder"
        >
          Создать заказ
        </button>
        <button
          class="btn btn-sm btn-outline-dark w-100"
          @click="copyInBuffer($event)"
        >
          Копировать
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import createCalc from './../scripts/createCalc'
import createOrder from './../scripts/createOrder'
import { formatMoney } from './../scripts/formatMoney'

import CalcSiryo from './../components/calc/CalcSiryo.vue'
import CalcRabota from './../components/calc/CalcRabota.vue'
import CalcDopuslug from './../components/calc/CalcDopuslug.vue'
import BlockAddCalc from './../components/calc/BlockAddCalc.vue'
import BlockShowSum from './../components/calc/BlockShowSum.vue'

export default {
  components: {
    CalcSiryo,
    CalcRabota,
    CalcDopuslug,
    BlockAddCalc,
    BlockShowSum
  },
  emits: ['show-modal'],
  data() {
    return {
      siryoSum: 0,
      rabotaSum: 0,
      dopuslugSum: 0,
      siryoMessage: '',
      rabotaMessage: '',
      dopuslugMessage: '',
      siryoArray: [],
      rabotaArray: [],
      dopuslugArray: [],
      enableProcent: true,
      enableMinPrice: true
    }
  },
  computed: {
    sumItogo() {
      let sumSiryo = 0
      let sumRabota = 0
      let sumDopuslug = 0
      let x2 = false

      if (this.siryoArray.length) {
        this.siryoArray.forEach(item => {
          sumSiryo += item.summa
        })
      }

      if (this.rabotaArray.length) {
        this.rabotaArray.forEach(item => {
          sumRabota += item.summa
        })
      }

      if (this.dopuslugArray.length) {
        this.dopuslugArray.forEach(item => {
          if (item.summa === 'x2') {
            x2 = true
          } else {
            sumDopuslug += item.summa
          }
        })
      }

      this.siryoSum = sumSiryo
      this.rabotaSum = sumRabota
      this.dopuslugSum = sumDopuslug

      if (this.enableMinPrice && sumRabota > 0 && sumRabota < 500) {
        sumRabota = 500
      }

      if (x2) {
        return (sumSiryo + sumRabota + sumDopuslug) * 2
      } else {
        return sumSiryo + sumRabota + sumDopuslug
      }
    },
    itogMessage() {
      let messageSiryo = ''
      this.siryoArray.forEach(item => {
        messageSiryo += this.formattingMessage(item)
      })

      let messageRabota = ''
      this.rabotaArray.forEach(item => {
        messageRabota += this.formattingMessage(item)
      })

      if (this.enableMinPrice && this.rabotaSum > 0 && this.rabotaSum < 500) {
        const raznost = 500 - this.rabotaSum
        messageRabota += 'Плюс до минимальной стоимости ' + raznost + ' ₽\n'
        this.rabotaSum = 500
      }

      let messageDopuslug = ''
      this.dopuslugArray.forEach(item => {
        if (item.summa === 'x2') {
          messageDopuslug +=
            'Внеочередная резка (подвинуть всех), итоговая сумма x2\n'
        } else {
          messageDopuslug += this.formattingMessage(item)
        }
      })

      return (
        messageSiryo +
        messageRabota +
        messageDopuslug +
        '\nИтого ' +
        this.formattingSum(this.sumItogo)
      )
    },
    orderNumber() {
      const num = this.$store.getters.orderNumber
      if (num < 10) {
        return '00' + num
      } else if (num < 100) {
        return '0' + num
      }
      return num
    }
  },
  methods: {
    // Здесь надо подключить готовый скрипт для форматирования
    formattingSum(sum) {
      return formatMoney(sum)
      // sum = String(sum)
      // if (sum.length > 4) {
      //   return (
      //     sum.slice(0, sum.length - 3) + ' ' + sum.slice(sum.length - 3) + ' ₽'
      //   )
      // } else {
      //   return sum + ' ₽'
      // }
    },
    formattingMessage(item) {
      if (item.title) {
        return (
          item.title +
          ', ' +
          item.size +
          ' ' +
          item.ed +
          ' x ' +
          item.price +
          ' ₽ = ' +
          this.formattingSum(item.summa) +
          '\n'
        )
      } else {
        return ''
      }
    },
    createNewOrder() {
      let order = createOrder(
        this.orderNumber,
        this.siryoArray,
        this.rabotaArray,
        this.dopuslugArray,
        this.sumItogo
      )

      this.$emit('show-modal', { modal: order, mod: 'create' })
    },
    removeCalc({ type, id }) {
      this[type] = this[type].filter(item => item.id !== id)
    },
    addNewCalc({ type }) {
      this[type].push(createCalc())
    },
    updateCalcInArray(item) {
      let index = this[item.typeArray].findIndex(elem => elem.id === item.id)
      this[item.typeArray][index] = item
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
