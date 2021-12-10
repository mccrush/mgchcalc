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
      @calc-price="calculationPrice"
      @remove-calc="removeSiryo"
    />
    <div class="row pt-2 pb-2">
      <div class="col-12 d-flex justify-content-between">
        <button
          class="btn btn-sm btn-outline-light text-muted"
          @click="addNewCalc({ type: 'siryoArray' })"
        >
          Добавить позицию
        </button>
      </div>
    </div>
    <div class="row bg-light">
      <div class="col-8"></div>
      <div class="col-4 d-flex justify-content-between p-1 pe-2">
        <div></div>
        <div class="small">
          Итого сырье: <span class="fw-bold">{{ siryoSum }}</span>
        </div>
      </div>
    </div>
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
      @calc-price="calculationPrice"
      @remove-calc="removeRabota"
    />
    <div class="row pt-2 pb-2">
      <div class="col-12 d-flex justify-content-between">
        <button
          class="btn btn-sm btn-outline-light text-muted"
          @click="addNewCalc({ type: 'rabotaArray' })"
        >
          Добавить позицию
        </button>
      </div>
    </div>
    <div class="row bg-light">
      <div class="col-8"></div>
      <div class="col-4 d-flex justify-content-between p-1 pe-2">
        <div></div>
        <div class="small">
          Итого работа: <span class="fw-bold">{{ rabotaSum }}</span>
        </div>
      </div>
    </div>
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
import createCalc from '@/scripts/createCalc'
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
      siryoArray: [createCalc()],
      rabotaArray: [createCalc()]
    }
  },
  computed: {
    sumItogo() {
      let sumSiryo = 0
      let sumRabota = 0

      this.siryoArray.forEach(item => {
        sumSiryo += item.sum
      })

      this.rabotaArray.forEach(item => {
        sumRabota += item.sum
      })

      this.siryoSum = sumSiryo
      this.rabotaSum = sumRabota

      return sumSiryo + sumRabota
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

      return (
        messageSiryo + '' + messageRabota + '\nИтого ' + this.sumItogo + ' ₽'
      )
    }
  },
  methods: {
    removeSiryo(id) {
      this.siryoArray = this.siryoArray.filter(item => item.id !== id)
    },
    removeRabota(id) {
      this.rabotaArray = this.rabotaArray.filter(item => item.id !== id)
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