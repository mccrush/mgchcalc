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
      >
        <option v-for="sir in siryos" :key="sir.id" :value="sir.id">
          {{ sir.title }}
        </option>
      </select>
    </div>

    <div class="col-12 col-md-6 mt-2 mt-md-0">
      <div class="row">
        <div class="col-4 text-center pt-1 pe-0">
          <small>{{ siryo.ed }} / {{ siryoPrice + ' ₽' }}</small>
        </div>
        <div class="col-4 d-flex justify-content-start text-center">
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
        <div class="col-2 text-center small pt-1">
          {{ siryoSumma }}
        </div>
        <div class="col-2 text-end">
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
      siryoSize10: 0
    }
  },
  computed: {
    siryoProcent() {
      if (this.$store.getters.procent.length) {
        return this.$store.getters.procent[0].value / 100
      }
    },
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
      //const size = this.siryoSize10.replace('.', ',')
      // const message =
      //   this.siryo.title +
      //   ', ' +
      //   size +
      //   ' ' +
      //   this.siryo.ed +
      //   ' x ' +
      //   this.siryoPrice +
      //   ' ₽ = ' +
      //   this.siryoSumma +
      //   ' ₽'

      // this.$emit('calc-price', {
      //   type: this.type,
      //   id: this.id,
      //   title: this.siryo.title,
      //   size:
      //     this.siryoDlina10 +
      //     ' x ' +
      //     this.siryoShirina10 +
      //     ' = ' +
      //     size +
      //     ' ' +
      //     this.siryo.ed,
      //   sum: this.siryoSumma,
      //   message
      // })

      const item = {
        type: 'task',
        id: this.id,
        groupId: this.categorySiryoId,
        elemId: this.siryoSelectId,
        elemType: this.type,
        elemDlina: this.siryoDlina10,
        elemShirina: this.siryoShirina10,
        elemSize: this.siryoSize10,
        elemEd: this.siryo.ed,
        elemSumma: this.siryoSumma,
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