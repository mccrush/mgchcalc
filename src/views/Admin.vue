<template>
  <div class="row pt-2">
    <div class="col-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        v-model="razdel"
        @change="selectRazdel"
      >
        <option value="group">Раздел Группы сырья</option>
        <option value="siryo">Раздел Сырье</option>
        <option value="frezer">Раздел Тип фрезеровки</option>
        <option value="rabota">Раздел Стоимость работы</option>
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
        :disabled="razdel === 'group' || razdel === 'frezer'"
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
  <div class="row pt-2">
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
    </div>
    <!-- -->
    <div v-if="razdel === 'siryo'" class="col-1 pe-0">
      <input
        type="text"
        class="form-control form-control-sm"
        v-model.trim="item.ed"
      />
    </div>
    <div v-if="razdel === 'siryo'" class="col-2">
      <input
        type="number"
        class="form-control form-control-sm"
        min="0"
        max="10000"
        step="10"
        v-model.number="item.price"
      />
    </div>
    <!-- -->
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
    <!-- -->
  </div>
  <div class="row pt-2 pb-2">
    <div class="col-9 pe-0"></div>
    <div class="col-3">
      <button
        v-if="mod === 'edit'"
        class="btn btn-sm btn-success w-100"
        @click="saveItem"
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
  </div>
</template>

<script>
import createCategory from '@/scripts/createCategory'
import createSiryo from '@/scripts/createSiryo'
import createRabota from '@/scripts/createRabota'

export default {
  data() {
    return {
      mod: localStorage.getItem('mod') || 'add',
      razdel: localStorage.getItem('razdel') || 'group',
      razdelId: localStorage.getItem('razdelId') || '',
      categoryId: localStorage.getItem('categoryId') || '',
      elementId: localStorage.getItem('elementId') || '',
      item: { categoryId: this.categoryId }
    }
  },
  computed: {
    categorys() {
      if (this.razdel === 'group' || this.razdel === 'siryo') {
        return this.$store.getters.group
      } else if (this.razdel === 'frezer' || this.razdel === 'rabota') {
        return this.$store.getters.frezer
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
      localStorage.setItem('mod', mod)
    },
    selectCreateButton() {
      this.elementId = ''
      localStorage.setItem('elementId', this.elementId)
      this.setMod('add')
    },
    selectRazdel() {
      this.item = {}
      this.categoryId = ''
      this.elementId = ''

      localStorage.setItem('razdel', this.razdel)
      localStorage.setItem('categoryId', this.categoryId)
      localStorage.setItem('elementId', this.elementId)
    },
    selectCategory() {
      this.setMod('edit')
      if (this.razdel === 'group' || this.razdel === 'frezer') {
        this.item = this.categorys.find(item => item.id === this.categoryId)
      }
      localStorage.setItem('categoryId', this.categoryId)
    },
    selectElement() {
      this.setMod('edit')
      this.item = this.elements.find(item => item.id === this.elementId)
      localStorage.setItem('elementId', this.elementId)
    },

    addItem() {
      if (this.item.title) {
        let newItem
        if (this.razdel === 'group') {
          newItem = createCategory(this.item.title, 'group')
        } else if (this.razdel === 'frezer') {
          newItem = createCategory(this.item.title, 'frezer')
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
        this.item = {}
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