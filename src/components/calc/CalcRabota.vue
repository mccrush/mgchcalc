<template>
  <div class="row pt-2">
    <!---->
    <div class="col-12 col-sm-6 col-md-3 pe-sm-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="selectCatRabota"
        v-model="categoryRabotaId"
      >
        <option v-for="catS in categoryRabotas" :key="catS.id" :value="catS.id">
          {{ catS.title }}
        </option>
      </select>
    </div>

    <div class="col-12 col-sm-6 col-md-3 mt-2 mt-sm-0 pe-md-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="runCalc"
        v-model="rabotaSelectId"
      >
        <option v-for="sir in rabotas" :key="sir.id" :value="sir.id">
          {{ sir.title }}
        </option>
      </select>
    </div>

    <div class="col-12 col-md-6 mt-2 mt-md-0">
      <div class="row">
        <div class="col-6 col-md-5">
          <KolichBut :rabotaAmount="rabotaAmount" />
        </div>
        <div class="col-3 col-md-3">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="rabotaSize"
            @input="runCalc"
            :disabled="!categoryRabotaId || !rabotaSelectId"
          />
        </div>
        <div class="col-1 col-md-2 text-center small pt-1">
          {{ rabotaSumma }}
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
import KolichBut from '@/components/buttons/KolichBut'

export default {
  components: {
    ButtonTrash,
    KolichBut
  },
  props: ['type', 'id'],
  emits: ['calc-price', 'remove-calc'],
  data() {
    return {
      categoryRabotaId: '',
      rabotaSelectId: '',
      rabotaSize: ''
    }
  },
  computed: {
    categoryRabotas() {
      return this.$store.getters.frezer
    },
    categoryTitle() {
      return this.categoryRabotas.find(
        item => item.id === this.categoryRabotaId
      ).title
    },
    rabotas() {
      return this.$store.getters.rabota.filter(
        item => item.categoryId === this.categoryRabotaId
      )
    },
    rabota() {
      return (
        this.$store.getters.rabota.find(
          item => item.id === this.rabotaSelectId
        ) || { priceS: 0, priceM: 0, priceL: 0 }
      )
    },
    rabotaAmount() {
      let size = this.rabotaSize
      size = size.replace(/,/g, '.')
      if (+size < 100) {
        return 'priceS'
      } else if (+size >= 100 && +size < 500) {
        return 'priceM'
      } else if (+size >= 500) {
        return 'priceL'
      } else {
        return 'priceS'
      }
    },
    rabotaPrice() {
      let size = this.rabotaSize
      size = size.replace(/,/g, '.')
      if (+size < 100) {
        return this.rabota.priceS
      } else if (+size >= 100 && +size < 500) {
        return this.rabota.priceM
      } else if (+size >= 500) {
        return this.rabota.priceL
      }
    },
    rabotaSumma() {
      let size = this.rabotaSize
      size = size.replace(/,/g, '.')
      return Math.ceil(this.rabotaPrice * size)
    }
  },
  methods: {
    selectCatRabota() {
      this.rabotaSelectId = ''
    },
    setRabotaAmount(priceType) {
      this.rabotaAmount = priceType
      this.runCalc()
    },
    runCalc() {
      const size = this.rabotaSize.replace('.', ',')
      const message =
        this.categoryTitle +
        ' ' +
        this.rabota.title +
        ', ' +
        size +
        ' м.п.' +
        ' x ' +
        this.rabota[this.rabotaAmount] +
        ' ₽ = ' +
        this.rabotaSumma +
        ' ₽'
      // this.$emit('calc-price', {
      //   type: this.type,
      //   id: this.id,
      //   title: this.categoryTitle + ' ' + this.rabota.title,
      //   size: this.rabotaSize + ' м.п.',
      //   sum: this.rabotaSumma,
      //   message
      // })

      const item = {
        type: 'task',
        id: this.id,
        groupId: this.categoryRabotaId,
        elemId: this.rabotaSelectId,
        elemType: this.type,
        elemSize1: +this.rabotaSize.replace(/,/g, '.'),
        elemSize2: 0,
        orderId: ''
      }

      this.$emit('calc-price', item)
    }
  }
}
</script>