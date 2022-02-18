<template>
  <div class="row">
    <div class="col-12 col-sm-6 pe-0">
      <input
        type="text"
        class="form-control form-control-sm"
        v-model.trim="item.name"
        @change="$emit('save-item', { item })"
        placeholder="ФИО"
      />
    </div>
    <div class="col-12 col-sm-6 mt-1 mt-sm-0 pe-0">
      <input
        type="text"
        class="form-control form-control-sm"
        v-model.trim="item.shortname"
        @change="$emit('save-item', { item })"
        placeholder="Псевдоним"
      />
    </div>
    <div class="col-12 col-sm-4 mt-1 pe-0">
      <input
        type="text"
        class="form-control form-control-sm"
        v-model.trim="item.phone"
        @change="$emit('save-item', { item })"
        placeholder="Телефон"
      />
    </div>
    <div class="col-12 col-sm-4 mt-1 pe-0">
      <input
        type="email"
        class="form-control form-control-sm"
        v-model.trim="item.email"
        @change="$emit('save-item', { item })"
        placeholder="Email"
      />
    </div>
    <div
      v-for="(cont, index) in item.companys"
      :key="cont"
      class="col-12 mt-1 pe-0"
    >
      <div class="row">
        <div class="col-12 col-sm-6 pe-sm-0">
          <select
            class="form-select form-select-sm"
            v-model="item.companys[index]"
            @change="updateCompany($event.target.value)"
          >
            <option value="">Не выбран</option>
            <option
              v-for="contact in companys"
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
            @click="removeCompany(index, cont)"
          >
            Удалить компанию
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 mt-1 pe-0">
      <button class="btn btn-sm btn-outline-success w-100" @click="addCompany">
        Добавить компанию
      </button>
    </div>
    <div
      v-for="(mess, index) in item.messengers"
      :key="mess.title"
      class="col-12 mt-1 pe-0"
    >
      <div class="row">
        <div class="col-6 col-sm-4 pe-0">
          <select
            class="form-select form-select-sm"
            v-model="mess.title"
            @change="updateMessanger(index, mess.title, mess.login)"
          >
            <option value="">Не выбран</option>
            <option
              v-for="messenger in messengers"
              :key="messenger.title"
              :value="messenger.title"
            >
              {{ messenger.title }}
            </option>
          </select>
        </div>
        <div class="col-6 col-sm-4 ps-1 pe-sm-1">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model.trim="mess.login"
            @change="updateMessanger(index, mess.title, mess.login)"
            placeholder="Login"
          />
        </div>
        <div class="col-12 col-sm-4 mt-1 mt-sm-0 ps-sm-1">
          <button
            class="btn btn-sm btn-outline-secondary w-100"
            @click="removeMessanger(index)"
          >
            Удалить мессенджер
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 mt-1 pe-0">
      <button
        class="btn btn-sm btn-outline-success w-100"
        @click="addMessenger"
      >
        Добавить мессенджер
      </button>
    </div>
    <div class="col-12 text-end mt-1 pe-0">
      <ButtonTrash @click="$emit('remove-item', item.id)" />
    </div>
  </div>
</template>


<script>
import messengers from '@/data/messengers'
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    ButtonTrash
  },
  props: ['item'],
  emits: ['save-item', 'remove-item'],
  data() {
    return {
      messengers
    }
  },
  computed: {
    companys() {
      return this.$store.getters.company
    }
  },
  methods: {
    addCompany() {
      this.item.companys.push('')
    },
    updateCompany(companyId) {
      console.log('updateCompany() companyId:', companyId)
      let company = this.$store.getters.company.find(
        item => item.id === companyId
      )

      if (!company.contacts.some(item => item === this.item.id)) {
        company.contacts.push(this.item.id)
        this.$emit('save-item', { item: company })
      }
      this.$emit('save-item', { item: this.item })
    },
    removeCompany(index, companyId) {
      console.log('removeCompany() companyId:', companyId)
      let company = this.$store.getters.company.find(
        item => item.id === companyId
      )

      const indexOfContact = company.contacts.findIndex(
        item => item === companyId
      )
      if (indexOfContact) {
        company.contacts.splice(indexOfContact, 1)
        this.$emit('save-item', { item: company })
      }

      this.item.contacts.splice(index, 1)
      this.$emit('save-item', { item: this.item })
    },
    addMessenger() {
      this.item.messengers.push({ title: '', login: '' })
    },
    updateMessanger(index, title, login) {
      this.item.messengers[index] = { title, login }
      this.$emit('save-item', { item: this.item })
    },
    removeMessanger(index) {
      this.item.messengers.splice(index, 1)
      this.$emit('save-item', { item: this.item })
    }
  }
}
</script>