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
        v-for="formContact in sortContactForms(this.item.contacts)"
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
          <span class="label-edit-buttons">
            <button
              class="
                btn btn-sm btn-outline-light
                text-secondary
                lh-1
                p-1
                ps-1
                pe-1
              "
              title="Копировать"
            >
              &#10063;
            </button>
            <button
              class="
                btn btn-sm btn-outline-light
                text-secondary
                lh-1
                p-1
                ps-1
                pe-1
              "
              @click="updateFormContactPositionUp(formContact.id)"
            >
              &#8743;
            </button>

            <button
              class="
                btn btn-sm btn-outline-light
                text-secondary
                lh-1
                p-1
                ps-1
                pe-1
                disabled
              "
            >
              {{ formContact.position }}
            </button>

            <button
              class="
                btn btn-sm btn-outline-light
                text-secondary
                lh-1
                p-1
                ps-1
                pe-1
              "
              @click="updateFormContactPositionDown(formContact.id)"
            >
              &#8744;
            </button>

            <button
              class="
                btn btn-sm btn-outline-light
                text-secondary
                lh-1
                p-1
                ps-1
                pe-1
              "
              @click="removeFormContact(formContact.id)"
            >
              &#215;
            </button>
          </span>
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
import sortMethod from './../../scripts/sortMethod'

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
    sortContactForms(itemContacts) {
      return sortMethod(itemContacts, 'asc', 'position')
    },
    addNewContactField() {
      if (this.fieldDescription) {
        const position = this.item.contacts.length + 1
        const newContactField = Object.assign(
          {},
          new Contact(this.fieldTitle, this.fieldDescription, position)
        )

        this.item.contacts.push(newContactField)
        this.fieldTitle = 'Выберите поле'
        this.fieldDescription = ''

        this.$emit('save-item')
      }
    },
    removeFormContact(id) {
      this.item.contacts = this.item.contacts.filter(item => item.id !== id)
      this.$emit('save-item')
    },
    updateFormContactPositionUp(id) {
      const formItemIndex = this.item.contacts.findIndex(item => item.id === id)
      let formItem = this.item.contacts[formItemIndex]
      formItem.position = formItem.position - 1
      this.item.contacts[formItemIndex] = formItem
      this.$emit('save-item')
    },
    updateFormContactPositionDown(id) {
      const formItemIndex = this.item.contacts.findIndex(item => item.id === id)
      let formItem = this.item.contacts[formItemIndex]
      formItem.position = formItem.position + 1
      this.item.contacts[formItemIndex] = formItem
      this.$emit('save-item')
    }
  }
}
</script>

<style scoped>
.form-floating > span.label-edit-buttons {
  visibility: hidden;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  pointer-events: painted;
  border: 1px solid transparent;
  transform-origin: 0 0;
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.form-floating:hover > span.label-edit-buttons {
  visibility: visible;
}
</style>