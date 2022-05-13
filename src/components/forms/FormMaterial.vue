<template>
  <div class="row">
    <div class="col-12">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item')"
        />
        <label for="inputTitle">Название</label>
      </form>
    </div>
    <div class="col-6 mt-2 pe-0">
      <form class="form-floating">
        <select
          class="form-select"
          id="inputGroup"
          v-model="item.categoryId"
          @change="$emit('save-item')"
        >
          <option v-for="group in groups" :key="group.id" :value="group.id">
            {{ group.title }}
          </option>
        </select>
        <label for="inputGroup">Группа</label>
      </form>
    </div>
    <div class="col-6 mt-2">
      <form class="form-floating">
        <select
          class="form-select"
          id="inputEd"
          v-model.number="item.ed"
          @blur="$emit('save-item')"
        >
          <option v-for="e in ed" :key="e" :value="e">{{ e }}</option>
        </select>
        <label for="inputEd">Единицы</label>
      </form>
    </div>
    <div class="col-6 mt-2 pe-0">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPrice"
          v-model.number="item.price"
          @blur="$emit('save-item')"
        />
        <label for="inputPrice">Стоимость</label>
      </form>
    </div>
    <div class="col-6 mt-2">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPosition"
          v-model.number="item.position"
          @blur="$emit('save-item')"
        />
        <label for="inputPosition">Позиция</label>
      </form>
    </div>
    <div class="col-12 mt-2">
      <form class="form-floating">
        <textarea
          class="form-control form-control-sm"
          id="inputDescription"
          v-model.trim="item.description"
          @change="$emit('save-item')"
        ></textarea>
        <label for="inputDescription">Комментарий</label>
      </form>
    </div>
    <!-- История поступлений -->
    <div class="col-12 mt-2">
      <button class="btn btn-sm btn-outline-success" @click="addNewPostuplenie">
        Добавить поступление
      </button>
      <ui v-if="item.postuplenie.length" class="list-group">
        <li
          v-for="postup in item.postuplenie"
          :key="postup.id"
          class="list-group-item lh-1 p-1 ps-2"
        >
          {{ postup.dateCreate }} {{ postup.obyom }} {{ postup.cena }}
          {{ postup.summa }} {{ getPostavshik(postup.postavshikId) }}
        </li>
      </ui>
      <p v-else>Поступлений еще не было</p>
    </div>
  </div>
</template>

<script>
import ed from './../../data/ed'
import Postuplenie from './../../classes/postuplenieClass'

export default {
  props: ['item'],
  emits: ['save-item'],
  data() {
    return {
      ed
    }
  },
  computed: {
    groups() {
      return this.$store.getters.materialvid
    },
    postavshiki() {
      return this.$store.getters.postavshik
    }
  },
  methods: {
    getPostavshik(id) {
      return this.postavshiki.find(item => item.id === id).title
    },
    addNewPostuplenie() {
      const postuplenie = Object.assign({}, new Postuplenie())
      console.log('new postuplenie: ', postuplenie)
      //this.item.postuplenie.push(postuplenie)
    }
  }
}
</script>