<template>
  <div class="row pt-2">
    <div class="col-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        v-model="category"
        @change="setCategoty"
      >
        <option selected>Категория</option>
        <option value="group">Категория Группы</option>
        <option value="siryo">Категория Сырье</option>
        <option value="rabota">Категория Работа</option>
      </select>
    </div>
    <!---->
    <div class="col-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="setMod('edit')"
      >
        <option selected>Группа сырья</option>
        <option v-for="gr in groups" :key="gr.id" :value="gr.id">
          {{ gr.title }}
        </option>
      </select>
    </div>
    <!---->
    <div class="col-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select resourse"
        @change="setMod('edit')"
        :disabled="category === 'group'"
      >
        <option selected>Сырье</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <div class="col-3">
      <button
        class="btn btn-sm btn-outline-success w-100"
        @click="setMod('add')"
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
        v-if="category === 'siryo'"
        class="form-select form-select-sm w-100"
        aria-label="Select resourse"
      >
        <option selected>Siryo</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <div class="col-1 pe-0">
      <input
        v-if="category === 'siryo'"
        type="text"
        class="form-control form-control-sm"
      />
    </div>
    <div class="col-2">
      <input
        v-if="category === 'siryo'"
        type="text"
        class="form-control form-control-sm"
      />
    </div>
  </div>
  <div class="row pt-2 pb-2">
    <div class="col-9 pe-0"></div>
    <div class="col-3">
      <button
        v-if="mod === 'edit'"
        class="btn btn-sm btn-success w-100"
        @click="meth"
      >
        Сохранить
      </button>
      <button
        v-if="mod === 'add'"
        class="btn btn-sm btn-success w-100"
        @click="addItem"
      >
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
import createGroup from '@/scripts/createGroup'
import createSiryo from '@/scripts/createSiryo'

export default {
  data() {
    return {
      mod: localStorage.getItem('mod') || 'add',
      category: localStorage.getItem('category') || 'siryo',
      groupId: '',
      siryoId: '',
      item: {}
    }
  },
  computed: {
    groups() {
      return this.$store.getters.group
    }
  },
  methods: {
    setMod(mod) {
      this.mod = mod
      this.item = {}
      localStorage.setItem('mod', mod)
    },
    setCategoty() {
      localStorage.setItem('category', this.category)
    },
    addItem() {
      if (this.item.title) {
        if (this.category === 'siryo') {
        } else if (this.category === 'group') {
          const item = createGroup(this.item.title)
          this.$store.dispatch('addItem', { item })
          this.item = {}
        } else if (this.category === 'rabota') {
        }
      }
    },
    saveItem() {}
  }
}
</script>