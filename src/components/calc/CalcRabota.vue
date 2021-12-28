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
        :disabled="!categoryRabotaId"
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
            v-model="rabotaSizeOrigin"
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
      rabotaSizeOrigin: ''
    }
  },
  computed: {
    categoryRabotas() {
      return this.$store.getters.obrabotkavid
    },
    categoryTitle() {
      return this.categoryRabotas.find(
        item => item.id === this.categoryRabotaId
      ).title
    },
    rabotas() {
      return this.$store.getters.obrabotkatolshina.filter(
        item => item.categoryId === this.categoryRabotaId
      )
    },
    rabota() {
      return (
        this.$store.getters.obrabotkatolshina.find(
          item => item.id === this.rabotaSelectId
        ) || { priceS: 0, priceM: 0, priceL: 0 }
      )
    },
    rabotaSize() {
      return +this.rabotaSizeOrigin.replace(/,/g, '.')
    },
    rabotaAmount() {
      let size = this.rabotaSize
      if (size < 100) {
        return 'priceS'
      } else if (size >= 100 && +size < 500) {
        return 'priceM'
      } else if (size >= 500) {
        return 'priceL'
      } else {
        return 'priceS'
      }
    },
    rabotaPrice() {
      let size = this.rabotaSize
      if (size < 100) {
        return this.rabota.priceS
      } else if (size >= 100 && size < 500) {
        return this.rabota.priceM
      } else if (size >= 500) {
        return this.rabota.priceL
      }
    },
    rabotaSumma() {
      return Math.ceil(this.rabotaPrice * this.rabotaSize)
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
      const item = {
        type: 'nafrezer',
        id: this.id,
        groupId: this.categoryRabotaId,
        elemId: this.rabotaSelectId,
        elemType: this.type,
        elemTitle: this.categoryTitle + ' ' + this.rabota.title,
        elemPrice: this.rabota[this.rabotaAmount],
        elemDlina: 0,
        elemShirina: 0,
        elemSize: this.rabotaSize,
        elemEd: 'м.п.',
        elemSumma: this.rabotaSumma,
        orderId: ''
      }

      this.$emit('calc-price', item)
    }
  }
}
</script>