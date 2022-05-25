<template>
  <div class="row">
    <!-- Название Поставщика -->
    <div class="col-12">
      <form @submit.prevent class="form-floating">
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

    <!-- Адрес Поставщика -->
    <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputAddress"
          v-model.trim="item.address"
          @change="$emit('save-item')"
        />
        <label for="inputAddress">Адрес</label>
      </form>
    </div>

    <!-- Контакт Поставщика -->
    <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputContact"
          v-model.trim="item.contact"
          @change="$emit('save-item')"
        />
        <label for="inputContact">Контакт</label>
      </form>
    </div>

    <!-- Телефоны Поставщика -->
    <div class="col-6 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputPhone"
          v-model.trim="item.phone"
          @change="$emit('save-item')"
        />
        <label for="inputPhone">Телефон</label>
      </form>
    </div>
    <div class="col-6 mt-2 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputPhone2"
          v-model.trim="item.phone2"
          @change="$emit('save-item')"
        />
        <label for="inputPhone2">Телефон 2</label>
      </form>
    </div>

    <!-- Email Поставщика -->
    <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputEmail"
          v-model.trim="item.email"
          @change="$emit('save-item')"
        />
        <label for="inputEmail">Email</label>
      </form>
    </div>

    <!-- Whatsapp Поставщика -->
    <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputWhatsapp"
          v-model.trim="item.whatsapp"
          @change="$emit('save-item')"
        />
        <label for="inputEmail">Whatsapp</label>
      </form>
    </div>

    <!-- Список Форм Контактов -->
    <div v-if="this.item.contacts && this.item.contacts.length">
      <div
        v-for="formContact in this.item.contacts"
        :key="formContact.id"
        class="col-12 mt-2"
      >
        <form @submit.prevent class="form-floating">
          <input
            type="text"
            class="form-control form-control-sm"
            :id="'input' + formContact.title"
            v-model.trim="formContact.description"
            @change="$emit('save-item')"
          />
          <label :for="'input' + formContact.title">{{
            formContact.title
          }}</label>
        </form>
      </div>
    </div>

    <!-- Добавление нового поля контакта -->
    <div class="col-12 mt-2">
      <div class="input-group input-group-sm">
        <select
          v-model="fieldTitle"
          class="form-select rounded-0 rounded-top w-100"
        >
          <option selected>Выберите поле</option>
          <option
            v-for="field in contactFields"
            :key="'key' + field"
            :value="field"
          >
            {{ field }}
          </option>
        </select>
        <input
          type="text"
          class="form-control w-100"
          placeholder="Введите значение"
          v-model.trim="fieldDescription"
        />
        <button
          class="btn btn-outline-success rounded-0 rounded-bottom w-100"
          type="button"
          @click="addNewContactField"
        >
          Добавить поле
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { contactFields } from './../../data/contactFields'
import Contact from './../../classes/ContactClass'

export default {
  props: ['item'],
  emits: ['save-item'],
  data() {
    return {
      contactFields,
      fieldTitle: 'Выберите поле',
      fieldDescription: ''
    }
  },
  methods: {
    addNewContactField() {
      if (this.fieldDescription) {
        const newContactField = Object.assign(
          {},
          new Contact(this.fieldTitle, this.fieldDescription)
        )

        this.item.contacts.push(newContactField)
        this.fieldTitle = 'Выберите поле'
        this.fieldDescription = ''

        this.$emit('save-item')
      }
    }
  }
}
</script>