<template>
  <div class="col-12">
    <div v-for="item in sortFilter" :key="item.id" class="row mt-4">
      <div class="col-6 pe-0">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model.trim="item.title"
          placeholder="Название банка"
          @change="saveItem(item)"
        />
      </div>
      <div class="col-6 ps-1">
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Адрес банка"
          v-model.trim="item.address"
          @change="saveItem(item)"
        />
      </div>
      <div class="col-4 mt-1 pe-0">
        <form class="form-floating">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputINN"
            v-model.trim="item.inn"
            @change="saveItem(item)"
          />
          <label for="inputINN">ИНН</label>
        </form>
      </div>
      <div class="col-4 mt-1 ps-1 pe-0">
        <form class="form-floating">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputKPP"
            v-model.trim="item.kpp"
            @change="saveItem(item)"
          />
          <label for="inputKPP">КПП</label>
        </form>
      </div>
      <div class="col-4 mt-1 ps-1">
        <form class="form-floating">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputOGRN"
            v-model.trim="item.ogrn"
            @change="saveItem(item)"
          />
          <label for="inputOGRN">ОГРН</label>
        </form>
      </div>
      <div class="col-4 mt-1 pe-0">
        <form class="form-floating">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputBIC"
            v-model.trim="item.bic"
            @change="saveItem(item)"
          />
          <label for="inputBIC">БИК</label>
        </form>
      </div>
      <div class="col-4 mt-1 ps-1 pe-0">
        <form class="form-floating">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputRS"
            v-model.trim="item.rs"
            @change="saveItem(item)"
          />
          <label for="inputRS">Р/С</label>
        </form>
      </div>
      <div class="col-3 mt-1 ps-1 pe-0">
        <form class="form-floating">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputKS"
            v-model.trim="item.ks"
            @change="saveItem(item)"
          />
          <label for="inputKS">К/С</label>
        </form>
      </div>
      <div class="col-1 d-flex mt-1 text-end">
        <ButtonTrash @click="$emit('remove-item', item.id)" />
      </div>
    </div>
  </div>
</template>


<script>
import sortMethod from '@/scripts/sortMethod'
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    ButtonTrash
  },
  props: ['type', 'categoryId', 'searchText', 'sortType'],
  emits: ['save-item', 'remove-item'],
  computed: {
    items() {
      return this.$store.getters[this.type]
    },
    searchFilter() {
      if (this.searchText) {
        return this.items.filter(item => item.title.includes(this.searchText))
      } else {
        return this.items
      }
    },
    sortFilter() {
      return sortMethod(this.searchFilter, this.sortType, 'title')
    }
  },
  methods: {
    saveItem(item) {
      this.$emit('save-item', { item })
    }
  }
}
</script>