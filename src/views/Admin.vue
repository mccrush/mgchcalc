<template>
  <div class="row pt-2">
    <div class="col-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        v-model="category"
        @change="selectCategoty"
      >
        <option value="group">Категория Группы сырья</option>
        <option value="siryo">Категория Сырье</option>
        <option value="rabota">Категория Вид работ</option>
        <option value="rabotaPrice">Категория Стоимость работ</option>
      </select>
    </div>
    <!---->
    <div class="col-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        @change="selectGroup"
        v-model="groupId"
      >
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
        @change="selectSiryo"
        :disabled="category === 'group'"
        v-model="siryoId"
      >
        <option v-for="sr in siryos" :key="sr.id" :value="sr.id">
          {{ sr.title }}
        </option>
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
        v-model="item.groupId"
      >
        <option v-for="gr in groups" :key="gr.id" :value="gr.id">
          {{ gr.title }}
        </option>
      </select>
    </div>
    <div class="col-1 pe-0">
      <input
        v-if="category === 'siryo'"
        type="text"
        class="form-control form-control-sm"
        v-model.trim="item.ed"
      />
    </div>
    <div class="col-2">
      <input
        v-if="category === 'siryo'"
        type="number"
        class="form-control form-control-sm"
        v-model.number="item.price"
      />
    </div>
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
import createGroup from '@/scripts/createGroup'
import createSiryo from '@/scripts/createSiryo'

export default {
  data() {
    return {
      mod: localStorage.getItem('mod') || 'add',
      category: localStorage.getItem('category') || 'siryo',
      groupId: localStorage.getItem('groupId') || '',
      siryoId: localStorage.getItem('siryoId') || '',
      rabotaId: localStorage.getItem('rabotaId') || '',
      rabotaPriceId: localStorage.getItem('rabotaPriceId') || '',
      item: { groupId: this.groupId }
    }
  },
  computed: {
    groups() {
      if (this.category === 'group') {
        return this.$store.getters.group
      } else if (this.category === 'rabota') {
        return this.$store.getters.rabota
      }
    },
    siryos() {
      if (this.category === 'siryo') {
        return this.$store.getters.siryo.filter(
          item => item.groupId === this.groupId
        )
      } else if (this.category === 'rabotaPrice') {
        return this.$store.getters.rabotaPrice.filter(
          item => item.rabotaId === this.rabotaId
        )
      }
    }
  },
  methods: {
    setMod(mod) {
      this.mod = mod
      this.item = { groupId: this.groupId }
      localStorage.setItem('mod', mod)
    },
    selectSiryo() {
      this.setMod('edit')
      this.item = this.siryos.find(item => item.id === this.siryoId)
      localStorage.setItem('siryoId', this.siryoId)
    },
    selectGroup() {
      this.setMod('edit')
      if (this.category === 'group') {
        this.item = this.groups.find(item => item.id === this.groupId)
        localStorage.setItem('groupId', this.groupId)
      } else if (this.category === 'rabota') {
        this.item = this.groups.find(item => item.id === this.rabotaId)
        localStorage.setItem('rabotaId', this.rabotaId)
      }
    },
    selectCategoty() {
      this.item = {}
      this.siryoId = ''
      this.rabotaPriceId = ''
      localStorage.setItem('category', this.category)
      localStorage.setItem('siryoId', this.siryoId)
      localStorage.setItem('rabotaPriceId', this.rabotaPriceId)
    },
    addItem() {
      if (this.item.title) {
        if (this.category === 'siryo') {
          const item = createSiryo(
            this.item.title,
            this.groupId,
            this.item.ed,
            this.item.price
          )
          //console.log('item', item)
          this.$store.commit('addItem', { item })
          this.$store.dispatch('addItem', { item })
          this.item = {}
        } else if (this.category === 'group') {
          const item = createGroup(this.item.title)
          this.$store.dispatch('addItem', { item })
          this.item = {}
        }
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