<template>
  <div>
    <div class="row pt-2">
      <div class="col-3 pe-0">
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
      <div class="col-3 pe-0">
        <select
          v-if="razdel === 'siryo' || razdel === 'rabota'"
          class="form-select form-select-sm w-100"
          aria-label="Select group resourse"
          @change="selectCategory"
          v-model="categoryId"
        >
          <option v-for="cat in categorys" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <div v-if="razdel === 'group'" class="d-flex">
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
      <div class="col-1 pe-0">
        <ButtonSort @sort="sortStart" />
      </div>
      <div class="col-3 pe-0">
        <InputSearch v-model:search="searchText" />
      </div>
      <div class="col-2">
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

import FormGroup from '@/components/admin/FormGroup'
import FormSiryo from '@/components/admin/FormSiryo'
import FormFrezer from '@/components/admin/FormFrezer'
import FormRabota from '@/components/admin/FormRabota'
import FormDopuslug from '@/components/admin/FormDopuslug'
import Footer from '@/components/Footer'

export default {
  components: {
    InputSearch,
    ButtonSort,
    ButtonAdd,
    FormGroup,
    FormSiryo,
    FormFrezer,
    FormRabota,
    FormDopuslug,
    Footer
  },
  data() {
    return {
      razdels,
      searchText: '',
      sortType: 'asc',
      razdel: localStorage.getItem('cl-razdel') || 'group',
      categoryId: localStorage.getItem('cl-categoryId') || '',
      procent: 0
    }
  },
  computed: {
    myForm() {
      switch (this.razdel) {
        case 'group':
          return 'FormGroup'
        case 'siryo':
          return 'FormSiryo'
        case 'frezer':
          return 'FormFrezer'
        case 'rabota':
          return 'FormRabota'
        case 'dopuslug':
          return 'FormDopuslug'
        default:
          return 'group'
      }
    },
    categorys() {
      if (this.razdel === 'group' || this.razdel === 'siryo') {
        return this.$store.getters.group
      } else if (this.razdel === 'frezer' || this.razdel === 'rabota') {
        return this.$store.getters.frezer
      } else if (this.razdel === 'dopuslug') {
        return this.$store.getters.dopuslug
      }
    },
    siryoProcent() {
      return this.$store.getters.procent[0].value
    }
  },
  mounted() {
    this.procent = this.siryoProcent
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