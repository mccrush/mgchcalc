<template>
  <div>
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
          <div class="col-4">Ед. / стоим.</div>
          <div class="col-4">Размеры</div>
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
      @calc-price="calculationPrice"
      @remove-calc="removeCalc"
    />
    <BlockAddCalc @add-new-calc="addNewCalc" type="siryoArray" />
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
          <div class="col-3">Разм. м.п.</div>
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
      @calc-price="calculationPrice"
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
            <div class="col-3">Размер</div>
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
        @calc-price="calculationPrice"
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
import createCalc from '@/scripts/createCalc'
import createOrder from '@/scripts/createOrder'

import CalcSiryo from '@/components/calc/CalcSiryo'
import CalcRabota from '@/components/calc/CalcRabota'
import CalcDopuslug from '@/components/calc/CalcDopuslug'
import BlockAddCalc from '@/components/calc/BlockAddCalc'
import BlockShowSum from '@/components/calc/BlockShowSum'

export default {
  components: {
    CalcSiryo,
    CalcRabota,
    CalcDopuslug,
    BlockAddCalc,
    BlockShowSum
  },
  emits: ['edit-order'],
  data() {
    return {
      siryoSum: 0,
      rabotaSum: 0,
      dopuslugSum: 0,
      siryoMessage: '',
      rabotaMessage: '',
      dopuslugMessage: '',
      siryoArray: [createCalc()],
      rabotaArray: [createCalc()],
      dopuslugArray: [createCalc()],
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
          sumSiryo += item.elemSumma
        })
      }

      if (this.rabotaArray.length) {
        this.rabotaArray.forEach(item => {
          sumRabota += item.elemSumma
        })
      }

      if (this.dopuslugArray.length) {
        this.dopuslugArray.forEach(item => {
          if (item.elemSumma === 'x2') {
            x2 = true
          } else {
            sumDopuslug += item.elemSumma
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
        if (item.elemSumma === 'x2') {
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
    formattingSum(sum) {
      sum += ''
      if (sum.length > 4) {
        return (
          sum.slice(0, sum.length - 3) + ' ' + sum.slice(sum.length - 3) + ' ₽'
        )
      } else {
        return sum + ' ₽'
      }
    },
    formattingMessage(item) {
      if (item.elemTitle) {
        return (
          item.elemTitle +
          ', ' +
          item.elemSize +
          ' ' +
          item.elemEd +
          ' x ' +
          item.elemPrice +
          ' ₽ = ' +
          this.formattingSum(item.elemSumma) +
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
        this.dopuslugArray
      )

      this.$emit('edit-order', { order, mod: 'create' })

      // Всем элементам массивов присвоить orderId
      // const listOfTypes = ['siryoArray', 'rabotaArray', 'dopuslugArray']

      // for (let i = 0; i < listOfTypes.length; i++) {
      //   if (this[listOfTypes[i]].length) {
      //     this[listOfTypes[i]].forEach((item, idx, array) => {
      //       array[idx].orderId = order.id
      //     })
      //   }
      // }

      // console.log('this.siryoArray:', this.siryoArray)
      // console.log('this.rabotaArray:', this.rabotaArray)
      // console.log('this.dopuslugArray:', this.dopuslugArray)

      // Каждую задачу (каждый элемент массива) сохранить в БД
      // Заказ сохранить в БД
      // А в модальном окне Заказа, данные уже брать из Vuex (из БД)
      // В модалке Задачи можно изменять, обновляя уже в БД????????????
    },
    removeCalc({ type, id }) {
      this[type] = this[type].filter(item => item.id !== id)
    },
    addNewCalc({ type }) {
      this[type].push(createCalc())
    },
    calculationPrice(item) {
      let index = this[item.elemType].findIndex(elem => elem.id === item.id)
      this[item.elemType][index] = item
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

<style scoped>
.form-check-input:checked {
  background-color: #fd0d5f;
  border-color: #fd0d5f;
}
</style>