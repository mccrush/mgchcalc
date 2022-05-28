<template>
  <div class="row pt-2">
    <!---->
    <div class="col-12 col-sm-6 col-md-3 pe-sm-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="selectCatSiryo"
        v-model="categorySiryoId"
      >
        <option
          v-for="catS in categorySiryosSort"
          :key="catS.id"
          :value="catS.id"
        >
          {{ catS.title }}
        </option>
      </select>
    </div>

    <div class="col-12 col-sm-6 col-md-3 mt-2 mt-sm-0 pe-md-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="updateCalc"
        v-model="siryoSelectId"
        :disabled="!categorySiryoId"
      >
        <option v-for="sir in siryosSort" :key="sir.id" :value="sir.id">
          {{ sir.title }}
        </option>
      </select>
    </div>

    <div class="col-12 col-md-6 mt-2 mt-md-0">
      <div class="row">
        <div class="col-4 col-sm-3 text-center pt-1 pe-0">
          <small>{{ siryo.ed }} / {{ siryoPrice }}</small>
        </div>
        <div class="col-4 col-sm-3 col-md-2 text-center small ps-1 pe-0">
          <input
            class="form-check-input mt-2 me-2"
            type="checkbox"
            role="switch"
            :checked="elemOur"
            @change="setElemOur"
          />
          <button
            class="btn btn-sm btn-outline-light text-muted dropdown-toggle"
            id="dropdownSelectDate"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
            :disabled="elemOur"
          >
            D
          </button>
          <div
            class="dropdown-menu border-0 shadow-sm ps-2 pe-2"
            aria-labelledby="dropdownSelectDate"
          >
            <input
              type="datetime-local"
              class="form-control form-control-sm"
              v-model="elemDateDelivery"
              @change="updateCalc"
            />
          </div>
        </div>
        <div
          class="
            col-4 col-sm-3
            d-flex
            justify-content-start
            text-center
            ps-1
            pe-md-0
          "
        >
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="siryoDlina"
            @input="updateCalc"
            :disabled="!categorySiryoId || !siryoSelectId"
          />
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="siryoShirina"
            @input="updateCalc"
            :disabled="!categorySiryoId || !siryoSelectId"
          />
        </div>
        <div class="col-6 col-sm-1 col-md-2 text-center small pt-2 pt-sm-1">
          {{ siryoSumma }} <span class="d-sm-none">₽</span>
        </div>
        <div class="col-6 col-sm-2 text-end pt-2 pt-sm-0">
          <ButtonTrash @click="$emit('remove-calc', { type, id })" />
        </div>
      </div>
    </div>
    <!---->
  </div>
</template>

<script>
import 'bootstrap/js/dist/dropdown'
import sortMethod from './../../scripts/sortMethod'

import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

export default {
  components: {
    ButtonTrash
  },
  props: ['type', 'id', 'enableProcent'],
  emits: ['update-calc', 'remove-calc'],
  data() {
    return {
      categorySiryoId: '',
      siryoSelectId: '',
      siryoDlina: '',
      siryoShirina: '',
      siryoSize10: 0,
      elemOur: true,
      elemDateDelivery: ''
    }
  },
  computed: {
    categorySiryos() {
      return this.$store.getters.undergroup
    },
    categorySiryosSort() {
      return sortMethod(this.categorySiryos, 'asc', 'title')
    },
    siryos() {
      return this.$store.getters.material.filter(
        item => item.undergroupId === this.categorySiryoId
      )
    },
    siryosSort() {
      return sortMethod(this.siryos, 'asc', 'position')
    },
    siryo() {
      return (
        this.$store.getters.material.find(
          item => item.id === this.siryoSelectId
        ) || { ed: 'кв.м.', price: 0 }
      )
    },
    siryoDlina10() {
      let dlina = this.siryoDlina.replace(/,/g, '.')
      return dlina
    },
    siryoShirina10() {
      let shirina = this.siryoShirina.replace(/,/g, '.')
      return shirina
    },
    siryoPrice() {
      if (this.enableProcent) {
        return Math.ceil(
          this.siryo.price + (this.siryo.price * this.siryo.nacenka) / 100
        )
      } else {
        return this.siryo.price
      }
    },
    siryoSumma() {
      let siryoSize = this.siryoDlina10 * this.siryoShirina10
      siryoSize += siryoSize * 0.1
      this.siryoSize10 = siryoSize.toFixed(2)
      return Math.ceil(this.siryoPrice * this.siryoSize10)
    }
  },
  methods: {
    setElemOur() {
      this.elemOur = !this.elemOur
      this.updateCalc()
    },
    selectCatSiryo() {
      this.siryoSelectId = ''
      this.siryoSize10 = 0
    },
    updateCalc() {
      const item = {
        type: 'task',
        id: this.id,
        groupId: this.categorySiryoId,
        undergroupId: this.categorySiryoId,
        elemId: this.siryoSelectId,
        typeArray: this.type,
        title: this.siryo.title,
        price: this.siryoPrice,
        dlina: this.siryoDlina10,
        shirina: this.siryoShirina10,
        size: this.siryoSize10,
        ed: this.siryo.ed,
        summa: this.siryoSumma,
        our: this.elemOur,
        dateDelivery: this.elemDateDelivery,
        orderId: ''
      }

      this.$emit('update-calc', item)
    }
  },
  watch: {
    enableProcent() {
      this.updateCalc()
    }
  }
}
</script>