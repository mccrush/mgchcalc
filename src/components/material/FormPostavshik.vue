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

    <!-- Список Форм Контактов -->
    <div v-if="this.item.fields && this.item.fields.length">
      <div
        v-for="formContact in sortContactForms(this.item.fields)"
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
              @click="copyInBuffer(formContact.description)"
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
              title="Удалить поле"
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
          <option selected>Выберите тип поля</option>
          <option
            v-for="field in fieldsContact"
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

    <!-- Комментарий -->
    <div class="col-12 mt-2">
      <form class="form-floating">
        <textarea
          class="form-control form-control-sm border-0"
          id="inputDescription"
          ref="inputDescription"
          v-model.trim="item.description"
          @input="updateTextareaHeight"
          @change="$emit('save-item')"
        ></textarea>
        <label for="inputDescription">Комментарий</label>
      </form>
    </div>
  </div>
</template>


<script>
import { fieldsContact } from './../../data/fieldsContact'
import FieldClass from './../../classes/fieldClass'
import sortMethod from './../../scripts/sortMethod'

export default {
  props: ['item'],
  emits: ['save-item'],
  data() {
    return {
      fieldsContact,
      fieldTitle: 'Выберите тип поля',
      fieldDescription: ''
    }
  },
  mounted() {
    this.updateTextareaHeight()
  },
  methods: {
    sortContactForms(itemContacts) {
      return sortMethod(itemContacts, 'asc', 'position')
    },

    addNewContactField() {
      if (this.fieldDescription) {
        if (!this.item.fields) {
          this.item.fields = []
        }
        const position = this.item.fields.length + 1
        const newContactField = Object.assign(
          {},
          new FieldClass(this.fieldTitle, this.fieldDescription, position)
        )

        this.item.fields.push(newContactField)
        this.fieldTitle = 'Выберите тип поля'
        this.fieldDescription = ''

        this.$emit('save-item')
      }
    },

    removeFormContact(id) {
      this.item.fields = this.item.fields.filter(item => item.id !== id)
      this.$emit('save-item')
    },

    updateFormContactPositionUp(id) {
      const formItemIndex = this.item.fields.findIndex(item => item.id === id)
      let formItem = this.item.fields[formItemIndex]
      formItem.position = formItem.position - 1
      this.item.fields[formItemIndex] = formItem
      this.$emit('save-item')
    },

    updateFormContactPositionDown(id) {
      const formItemIndex = this.item.fields.findIndex(item => item.id === id)
      let formItem = this.item.fields[formItemIndex]
      formItem.position = formItem.position + 1
      this.item.fields[formItemIndex] = formItem
      this.$emit('save-item')
    },

    updateTextareaHeight() {
      let inputDescription = this.$refs.inputDescription
      const newHeight = inputDescription.scrollHeight
      inputDescription.style.height = newHeight + 'px'
    },

    async copyInBuffer(text) {
      try {
        await navigator.clipboard.writeText(text)
        console.log('Async: Copying to clipboard was successful!', text)
      } catch (err) {
        console.error('Async: Could not copy text: ', err)
      }
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