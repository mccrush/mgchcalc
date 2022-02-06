<template>
  <div>
    <div class="row pt-2">
      <div class="col-12 col-sm-6 col-md-3 pe-sm-0">
        <select
          class="form-select form-select-sm w-100"
          aria-label="Select group resourse"
          v-model="razdel"
          @change="selectRazdel"
        >
          <option
            v-for="razdel in razdels"
            :key="razdel.alias"
            :value="razdel.alias"
          >
            {{ razdel.title }}
          </option>
        </select>
      </div>
      <!---->
      <div class="col-12 col-sm-6 col-md-2 col-lg-3 mt-2 mt-sm-0 pe-md-0">
        <select
          v-if="razdel === 'material' || razdel === 'obrabotkatolshina'"
          class="form-select form-select-sm w-100"
          aria-label="Select group resourse"
          @change="selectCategory"
          v-model="categoryId"
        >
          <option v-for="cat in categorys" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <div v-if="razdel === 'materialvid'" class="d-flex">
          <div class="small text-end w-75 me-2 pt-1">Процент наценки</div>
          <div class="w-25">
            <input
              type="number"
              min="0"
              max="200"
              step="5"
              class="form-control form-control-sm"
              v-model.number="procent"
              @change="saveProcent"
            />
          </div>
        </div>
      </div>
      <!---->
      <div class="col-3 col-sm-4 col-md-2 col-lg-1 mt-2 mt-md-0 pe-0">
        <ButtonSort @sort="sortStart" />
      </div>
      <div class="col-9 col-sm-4 col-md-3 mt-2 mt-md-0 pe-sm-0">
        <InputSearch v-model:search="searchText" />
      </div>
      <div class="col-12 col-sm-4 col-md-2 mt-2 mt-md-0">
        <ButtonAdd @click="addItem" />
      </div>
    </div>
    <component
      :is="myForm"
      :type="razdel"
      :categoryId="categoryId"
      :searchText="searchText"
      :sortType="sortType"
      @save-item="saveItem"
      @remove-item="removeItem"
    />
    <Footer />
  </div>
</template>

<script>
import razdels from '@/data/razdels'
import createItem from '@/scripts/createItem'

import InputSearch from '@/components/inputs/InputSearch'
import ButtonSort from '@/components/buttons/ButtonSort'
import ButtonAdd from '@/components/buttons/ButtonAdd'

import FormMaterialVid from '@/components/admin/FormMaterialVid'
import FormMaterial from '@/components/admin/FormMaterial'
import FormObrabotkaVid from '@/components/admin/FormObrabotkaVid'
import FormObrabotkaTolshina from '@/components/admin/FormObrabotkaTolshina'
import FormDopuslug from '@/components/admin/FormDopuslug'
import FormCustomer from '@/components/admin/FormCustomer'
import Footer from '@/components/interface/Footer'

export default {
  components: {
    InputSearch,
    ButtonSort,
    ButtonAdd,
    FormMaterialVid,
    FormMaterial,
    FormObrabotkaVid,
    FormObrabotkaTolshina,
    FormDopuslug,
    FormCustomer,
    Footer
  },
  data() {
    return {
      razdels,
      searchText: '',
      sortType: 'asc',
      razdel: localStorage.getItem('cl-razdel') || 'materialvid',
      categoryId: localStorage.getItem('cl-categoryId') || '',
      procent: 0
    }
  },
  computed: {
    myForm() {
      switch (this.razdel) {
        case 'materialvid':
          return 'FormMaterialVid'
        case 'material':
          return 'FormMaterial'
        case 'obrabotkavid':
          return 'FormObrabotkaVid'
        case 'obrabotkatolshina':
          return 'FormObrabotkaTolshina'
        case 'dopuslug':
          return 'FormDopuslug'
        case 'customer':
          return 'FormCustomer'
        default:
          return 'FormMaterialVid'
      }
    },
    categorys() {
      if (this.razdel === 'materialvid' || this.razdel === 'material') {
        return this.$store.getters.materialvid
      } else if (
        this.razdel === 'obrabotkavid' ||
        this.razdel === 'obrabotkatolshina'
      ) {
        return this.$store.getters.obrabotkavid
      } else if (this.razdel === 'dopuslug') {
        return this.$store.getters.dopuslug
      } else if (this.razdel === 'customer') {
        return this.$store.getters.customer
      }
    },
    siryoProcent() {
      if (this.$store.getters.procent.length) {
        return this.$store.getters.procent[0].value
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.procent = this.siryoProcent
    }, 1000)
  },
  methods: {
    selectRazdel() {
      this.categoryId = ''
      localStorage.setItem('cl-razdel', this.razdel)
      localStorage.setItem('cl-categoryId', this.categoryId)
    },
    selectCategory() {
      localStorage.setItem('cl-categoryId', this.categoryId)
    },
    addItem() {
      const newItem = createItem(this.razdel, this.categoryId)
      this.$store.commit('addItem', { item: newItem })
      this.$store.dispatch('addItem', { item: newItem })
    },
    saveItem({ item }) {
      if (item.title) {
        this.$store.commit('updateItem', { item })
        this.$store.dispatch('updateItem', { item })
      }
    },
    removeItem(id) {
      this.$store.commit('removeItem', { type: this.razdel, id })
      this.$store.dispatch('removeItem', { type: this.razdel, id })
    },
    sortStart(sort) {
      this.sortType = sort
    },
    saveProcent() {
      const item = { type: 'procent', id: '1639495120848', value: this.procent }
      this.$store.commit('updateItem', { item })
      this.$store.dispatch('updateItem', { item })
    }
  }
}
</script>