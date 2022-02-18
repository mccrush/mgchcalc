<template>
  <div class="row">
    <div class="col-12 col-sm-6 pe-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item', { item })"
        />
        <label for="inputTitle">Название</label>
      </form>
    </div>
    <div class="col-12 col-sm-6 mt-1 mt-sm-0 pe-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputINN"
          v-model.trim="item.inn"
          @change="$emit('save-item', { item })"
        />
        <label for="inputINN">ИНН</label>
      </form>
    </div>
    <div class="col-12 col-sm-4 mt-1 pe-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputKPP"
          v-model.trim="item.kpp"
          @change="$emit('save-item', { item })"
        />
        <label for="inputKPP">КПП</label>
      </form>
    </div>
    <div class="col-12 col-sm-4 mt-1 pe-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputOGRN"
          v-model.trim="item.ogrn"
          @change="$emit('save-item', { item })"
        />
        <label for="inputOGRN">ОГРН</label>
      </form>
    </div>
    <div class="col-12 col-sm-4 mt-1 pe-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputAddress"
          v-model.trim="item.address"
          @change="$emit('save-item', { item })"
        />
        <label for="inputAddress">Адрес</label>
      </form>
    </div>
    <div
      v-for="(cont, index) in item.contacts"
      :key="cont"
      class="col-12 mt-1 pe-0"
    >
      <div class="row">
        <div class="col-12 col-sm-6 pe-0">
          <select
            class="form-select form-select-sm"
            v-model="item.contacts[index]"
            @change="$emit('save-item', { item })"
          >
            <option value="">Не выбран</option>
            <option
              v-for="contact in contacts"
              :key="contact.id"
              :value="contact.id"
            >
              {{ contact.name }}
            </option>
          </select>
        </div>
        <div class="col-12 col-sm-6 mt-1 mt-sm-0 ps-sm-1">
          <button
            class="btn btn-sm btn-outline-secondary w-100"
            @click="removeContact(index)"
          >
            Удалить контакт
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 mt-1 pe-0">
      <button class="btn btn-sm btn-outline-success w-100" @click="addContact">
        Добавить контакт
      </button>
    </div>
    <div class="col-12 text-end mt-1">
      <ButtonTrash @click="$emit('remove-item', item.id)" />
    </div>
  </div>
</template>


<script>
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    ButtonTrash
  },
  props: ['item'],
  emits: ['save-item', 'remove-item'],
  computed: {
    contacts() {
      return this.$store.getters.contact
    }
  },
  methods: {
    addContact() {
      this.item.contacts.push('')
    },
    removeContact(index) {
      this.item.contacts.splice(index, 1)
      this.$emit('save-item', { item: this.item })
    }
  }
}
</script>