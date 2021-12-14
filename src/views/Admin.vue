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
          class="form-select form-select-sm w-100"
          aria-label="Select group resourse"
          @change="selectCategory"
          v-model="categoryId"
        >
          <option v-for="cat in categorys" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
      </div>
      <!---->
      <div class="col-3 pe-0">
        <select
          class="form-select form-select-sm w-100"
          aria-label="Select resourse"
          @change="selectElement"
          :disabled="
            razdel === 'group' || razdel === 'frezer' || razdel === 'dopuslug'
          "
          v-model="elementId"
        >
          <option v-for="elem in elements" :key="elem.id" :value="elem.id">
            {{ elem.title }}
          </option>
        </select>
      </div>
      <div class="col-3">
        <button
          class="btn btn-sm btn-outline-success w-100"
          @click="selectCreateButton('add')"
        >
          Создать +
        </button>
      </div>
    </div>
    <component :is="myForm" :type="razdel" />
    <!-- <div class="row pt-2">
      <div class="col-6 pe-0">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model.trim="item.title"
        />
      </div>
      <div class="col-3 pe-0">
        <select
          v-if="razdel === 'siryo' || razdel === 'rabota'"
          class="form-select form-select-sm w-100"
          aria-label="Select resourse"
          v-model="item.categoryId"
        >
          <option v-for="cat in categorys" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <input
          v-if="razdel === 'dopuslug'"
          type="text"
          class="form-control form-control-sm"
          placeholder="alias uslugi"
          v-model.trim="item.alias"
        />
      </div>
     
      <div
        v-if="razdel === 'siryo' || razdel === 'dopuslug'"
        class="col-1 pe-0"
      >
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="ed.izm"
          v-model.trim="item.ed"
        />
      </div>
      <div v-if="razdel === 'siryo' || razdel === 'dopuslug'" class="col-2">
        <input
          type="number"
          class="form-control form-control-sm"
          min="0"
          max="10000"
          step="10"
          v-model.number="item.price"
        />
      </div>
      
      <div v-if="razdel === 'rabota'" class="col-1 pe-0">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model.number="item.priceS"
        />
      </div>
      <div v-if="razdel === 'rabota'" class="col-1 pe-0">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model.number="item.priceM"
        />
      </div>
      <div v-if="razdel === 'rabota'" class="col-1">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model.number="item.priceL"
        />
      </div>
      
    </div> -->
    <!-- <div class="row pt-2 pb-2">
      <div class="col-9 pe-0"></div>
      <div class="col-3">
        <button
          v-if="mod === 'edit'"
          class="btn btn-sm btn-success w-100"
          @click="saveItem"
          :disabled="
            (razdel === 'rabota' && !elementId) ||
            (razdel === 'siryo' && !elementId) ||
            (razdel === 'dopuslug' && !categoryId)
          "
        >
          Сохранить
        </button>
        <button
          v-if="mod === 'add'"
          class="btn btn-sm btn-success w-100"
          @click="addItem"
        >
          Добавить в БД
        </button>
      </div>
    </div> -->
    <Footer />
  </div>
</template>

<script>
import razdels from '@/data/razdels'
import createCategory from '@/scripts/createCategory'
import createSiryo from '@/scripts/createSiryo'
import createRabota from '@/scripts/createRabota'
import createDopuslug from '@/scripts/createDopuslug'
import FormGroup from '@/components/admin/FormGroup'
import Footer from '@/components/Footer'

export default {
  components: {
    FormGroup,
    Footer
  },
  data() {
    return {
      razdels,
      mod: localStorage.getItem('cl-mod') || 'add',
      razdel: localStorage.getItem('cl-razdel') || 'group',
      categoryId: localStorage.getItem('cl-categoryId') || '',
      elementId: localStorage.getItem('cl-elementId') || '',
      item: { categoryId: this.categoryId }
    }
  },
  computed: {
    myForm() {
      switch (this.razdel) {
        case 'group':
          return 'FormGroup'

        case 'siryo':
          return 'FormSiryo'

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
    elements() {
      if (this.razdel === 'siryo') {
        return this.$store.getters.siryo.filter(
          item => item.categoryId === this.categoryId
        )
      } else if (this.razdel === 'rabota') {
        return this.$store.getters.rabota.filter(
          item => item.categoryId === this.categoryId
        )
      }
    }
  },
  methods: {
    setMod(mod) {
      this.mod = mod
      this.item = { categoryId: this.categoryId }
      localStorage.setItem('cl-mod', mod)
    },
    selectCreateButton() {
      this.elementId = ''
      localStorage.setItem('cl-elementId', this.elementId)
      this.setMod('add')
    },
    selectRazdel() {
      this.item = {}
      this.categoryId = ''
      this.elementId = ''

      localStorage.setItem('cl-razdel', this.razdel)
      localStorage.setItem('cl-categoryId', this.categoryId)
      localStorage.setItem('cl-elementId', this.elementId)
    },
    selectCategory() {
      this.setMod('edit')
      if (
        this.razdel === 'group' ||
        this.razdel === 'frezer' ||
        this.razdel === 'dopuslug'
      ) {
        this.item = this.categorys.find(item => item.id === this.categoryId)
      }
      localStorage.setItem('cl-categoryId', this.categoryId)
    },
    selectElement() {
      this.setMod('edit')
      this.item = this.elements.find(item => item.id === this.elementId)
      localStorage.setItem('cl-elementId', this.elementId)
    },

    addItem() {
      if (this.item.title) {
        let newItem
        if (this.razdel === 'group') {
          newItem = createCategory(this.item.title, 'group')
        } else if (this.razdel === 'frezer') {
          newItem = createCategory(this.item.title, 'frezer')
        } else if (this.razdel === 'dopuslug') {
          newItem = createDopuslug(
            this.item.title,
            'dopuslug',
            this.item.alias,
            this.item.ed,
            this.item.price
          )
        } else if (this.razdel === 'siryo') {
          newItem = createSiryo(
            this.item.title,
            this.categoryId,
            this.item.ed,
            this.item.price
          )
        } else if (this.razdel === 'rabota') {
          newItem = createRabota(
            this.item.title,
            this.categoryId,
            this.item.priceS,
            this.item.priceM,
            this.item.priceL
          )
        }

        this.$store.commit('addItem', { item: newItem })
        this.$store.dispatch('addItem', { item: newItem })
        this.item = { categoryId: this.categoryId }
      }
    },
    saveItem() {
      if (this.item.title) {
        this.$store.commit('updateItem', { item: this.item })
        this.$store.dispatch('updateItem', { item: this.item })
      }
    }
  }
}
</script>