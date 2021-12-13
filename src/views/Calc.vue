<template>
  <div>
    <div class="row pt-3">
      <div class="col-12 d-flex justify-content-between">
        <h5 class="m-0">Стоимость сырья</h5>
      </div>
    </div>
    <div class="row small text-center text-muted pt-2">
      <div class="col-3">Группа сырья</div>
      <div class="col-3">Сырье</div>
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
      type="siryoArray"
      @calc-price="calculationPrice"
      @remove-calc="removeCalc"
    />
    <BlockAddCalc @add-new-calc="addNewCalc" type="siryoArray" />
    <BlockShowSum title="сырье" :sum="siryoSum" />
    <!-- -->
    <div class="row pt-3">
      <div class="col-12 d-flex justify-content-between">
        <h5 class="m-0">Стоимость работы</h5>
      </div>
    </div>
    <div class="row small text-center text-muted pt-2">
      <div class="col-3">Группа работы</div>
      <div class="col-3">Работа (толщина)</div>
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
    <BlockShowSum title="работа" :sum="rabotaSum" />
    <!-- -->
    <div>
      <div class="row pt-3">
        <div class="col-12 d-flex justify-content-between">
          <h5 class="m-0">Дополнительные услуги</h5>
        </div>
      </div>
      <div class="row small text-center text-muted pt-2">
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
      <BlockShowSum title="допуслуги" :sum="dopuslugSum" />
    </div>
    <!-- -->
    <div class="row bg-secondary">
      <div class="col-8"></div>
      <div class="col-4 d-flex justify-content-between p-1 pe-2">
        <div></div>
        <div class="small text-light">
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
            rows="5"
            v-model="itogMessage"
          ></textarea>
        </div>
      </div>
      <div class="col-3 d-flex flex-column justify-content-end p-2 ps-0">
        <button class="btn btn-sm btn-success w-100 mb-2" @click="saveOrder">
          Сохранить заказ
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
      dopuslugArray: [createCalc()]
    }
  },
  computed: {
    sumItogo() {
      let sumSiryo = 0
      let sumRabota = 0
      let sumDopuslug = 0
      let x2 = false

      this.siryoArray.forEach(item => {
        sumSiryo += item.sum
      })

      this.rabotaArray.forEach(item => {
        sumRabota += item.sum
      })

      this.dopuslugArray.forEach(item => {
        if (item.sum === 'x2') {
          x2 = true
        } else {
          sumDopuslug += item.sum
        }
      })

      this.siryoSum = sumSiryo
      this.rabotaSum = sumRabota
      this.dopuslugSum = sumDopuslug

      if (x2) {
        return (sumSiryo + sumRabota + sumDopuslug) * 2
      } else {
        return sumSiryo + sumRabota + sumDopuslug
      }
    },
    itogMessage() {
      let messageSiryo = ''
      this.siryoArray.forEach(item => {
        messageSiryo += item.message + '\n'
      })

      let messageRabota = ''
      this.rabotaArray.forEach(item => {
        messageRabota += item.message + '\n'
      })

      let messageDopuslug = ''
      this.dopuslugArray.forEach(item => {
        messageDopuslug += item.message + '\n'
      })

      return (
        messageSiryo +
        '' +
        messageRabota +
        messageDopuslug +
        '\nИтого ' +
        this.sumItogo +
        ' ₽'
      )
    }
  },
  methods: {
    saveOrder() {},
    removeCalc({ type, id }) {
      this[type] = this[type].filter(item => item.id !== id)
    },
    addNewCalc({ type }) {
      this[type].push(createCalc())
    },
    calculationPrice({ type, id, sum, message }) {
      let item = {
        id,
        sum,
        message
      }
      let index = this[type].findIndex(item => item.id === id)
      this[type][index] = item
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