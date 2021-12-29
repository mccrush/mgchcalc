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
        <option v-for="catS in categorySiryos" :key="catS.id" :value="catS.id">
          {{ catS.title }}
        </option>
      </select>
    </div>

    <div class="col-12 col-sm-6 col-md-3 mt-2 mt-sm-0 pe-md-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="runCalc"
        v-model="siryoSelectId"
        :disabled="!categorySiryoId"
      >
        <option v-for="sir in siryos" :key="sir.id" :value="sir.id">
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
            @change="elemOur = !elemOur"
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
            @input="runCalc"
            :disabled="!categorySiryoId || !siryoSelectId"
          />
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="siryoShirina"
            @input="runCalc"
            :disabled="!categorySiryoId || !siryoSelectId"
          />
        </div>
        <div class="col-6 col-sm-1 col-md-2 text-center small pt-2 pt-sm-1">
          {{ siryoSumma }}
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
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    ButtonTrash
  },
  props: ['type', 'id', 'enableProcent'],
  emits: ['calc-price', 'remove-calc'],
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
    siryoProcent() {
      if (this.$store.getters.procent.length) {
        return this.$store.getters.procent[0].value / 100
      }
    },
    categorySiryos() {
      return this.$store.getters.materialvid
    },
    siryos() {
      return this.$store.getters.material.filter(
        item => item.categoryId === this.categorySiryoId
      )
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
      return +(+dlina + dlina * 0.1).toFixed(2)
    },
    siryoShirina10() {
      let shirina = this.siryoShirina.replace(/,/g, '.')
      return +(+shirina + shirina * 0.1).toFixed(2)
    },
    siryoPrice() {
      if (this.enableProcent) {
        return Math.ceil(
          this.siryo.price + this.siryo.price * this.siryoProcent
        )
      } else {
        return Math.ceil(this.siryo.price)
      }
    },
    siryoSumma() {
      this.siryoSize10 = +(this.siryoDlina10 * this.siryoShirina10).toFixed(2)
      return Math.ceil(this.siryoPrice * this.siryoSize10)
    }
  },
  methods: {
    selectCatSiryo() {
      this.siryoSelectId = ''
      this.siryoSize10 = 0
    },
    runCalc() {
      const item = {
        type: 'task',
        id: this.id,
        groupId: this.categorySiryoId,
        elemId: this.siryoSelectId,
        elemType: this.type,
        elemTitle: this.siryo.title,
        elemPrice: this.siryoPrice,
        elemDlina: this.siryoDlina10,
        elemShirina: this.siryoShirina10,
        elemSize: this.siryoSize10,
        elemEd: this.siryo.ed,
        elemSumma: this.siryoSumma,
        elemOur: this.elemOur,
        elemDateDelivery: this.elemDateDelivery,
        orderId: ''
      }

      this.$emit('calc-price', item)
    }
  },
  watch: {
    enableProcent() {
      this.runCalc()
    }
  }
}
</script>