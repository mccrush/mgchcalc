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
    <div class="col-12 col-sm-6 mt-1 mt-sm-0 ps-md-1 pe-0">
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
    <div class="col-12 col-sm-6 mt-1 pe-0">
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
    <div class="col-12 col-sm-6 mt-1 ps-md-1 pe-0">
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
    <div class="col-12 col-sm-12 mt-1 pe-0">
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
        <div class="col-12 col-sm-6 pe-sm-0">
          <select
            class="form-select form-select-sm"
            v-model="item.contacts[index]"
            @change="updateContact($event.target.value)"
          >
            <option value="">Не выбран</option>
            <option
              v-for="contact in contacts"
              :key="contact.id"
              :value="contact.id"
            >
              {{ contact.title }}
            </option>
          </select>
        </div>
        <div class="col-12 col-sm-6 mt-1 mt-sm-0 ps-sm-1">
          <button
            class="btn btn-sm btn-outline-secondary w-100"
            @click="removeContact(index, cont)"
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
    <div class="col-12 col-sm-6 col-md-4 mt-1 ps-md-3 pe-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputBIC"
          v-model.trim="item.bic"
          @change="$emit('save-item', { item })"
        />
        <label for="inputBIC">БИК</label>
      </form>
    </div>
    <div class="col-12 col-sm-6 col-md-4 mt-1 ps-md-1 pe-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputRS"
          v-model.trim="item.rs"
          @change="$emit('save-item', { item })"
        />
        <label for="inputRS">Р/С</label>
      </form>
    </div>
    <div class="col-12 col-sm-6 col-md-3 mt-1 ps-md-1 pe-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputKS"
          v-model.trim="item.ks"
          @change="$emit('save-item', { item })"
        />
        <label for="inputKS">К/С</label>
      </form>
    </div>
    <div class="col-12 col-sm-6 col-md-1 d-flex text-end mt-1 pe-0">
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
    updateContact(contactId) {
      console.log('updateContact() contactId:', contactId)
      let contact = this.$store.getters.contact.find(
        item => item.id === contactId
      )

      if (!contact.companys.some(item => item === this.item.id)) {
        contact.companys.push(this.item.id)
        this.$emit('save-item', { item: contact })
      }
      this.$emit('save-item', { item: this.item })
    },
    removeContact(index, contactId) {
      console.log('removeContact() contactId:', contactId)
      let contact = this.$store.getters.contact.find(
        item => item.id === contactId
      )

      if (contact) {
        const indexOfCompany = contact.companys.findIndex(
          item => item === contactId
        )
        if (indexOfCompany) {
          contact.companys.splice(indexOfCompany, 1)
          this.$emit('save-item', { item: contact })
        }
      }

      this.item.contacts.splice(index, 1)
      this.$emit('save-item', { item: this.item })
    }
  }
}
</script>