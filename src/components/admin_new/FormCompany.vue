<template>
  <div class="row">
    <!-- Название компании -->
    <div class="col-6 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item')"
        />
        <label for="inputTitle">Название компании</label>
      </form>
    </div>

    <div class="col-6 d-flex align-items-center justify-content-center ps-1">
      <h6>Список сотрудников</h6>
    </div>

    <div class="col-12">
      <div class="row">
        <div class="col-6 pe-1">
          <!-- Список Форм Контактов -->
          <div
            v-if="this.item.fields && this.item.fields.length"
            class="col-12"
          >
            <div
              v-for="formContact in sortContactForms(this.item.fields)"
              :key="formContact.id"
              class="mt-2"
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
        </div>

        <div class="col-6 ps-1">
          <!-- Список Сотрудников -->
          <ul class="list-group">
            <li
              v-for="sotrudnik in sotrudniks"
              :key="sotrudnik.id"
              class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                small
                lh-1
                p-1
                ps-2
              "
            >
              <span>{{ sotrudnik.title }}</span>
              <div>
                <ButtonTrash
                  @click.stop="removeSotrudnik(sotrudnik.type, sotrudnik.id)"
                  class="my-btn-hide border-0"
                />
              </div>
            </li>
          </ul>

          <!-- Добавление нового Сотрудника (контакта) -->
          <div class="col-12 mt-2">
            <div class="input-group input-group-sm">
              <select
                v-model="newSotrudnikId"
                class="form-select rounded-0 rounded-top w-100"
              >
                <option selected>Выберите сотрудника</option>
                <option
                  v-for="contact in contacts"
                  :key="'key' + contact"
                  :value="contact.id"
                >
                  {{ contact.title }}
                </option>
              </select>
              <button
                class="btn btn-outline-success rounded-0 rounded-bottom w-100"
                type="button"
                @click="addNewSotrudnik"
              >
                Добавить сотрудника
              </button>
            </div>
          </div>
        </div>
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
import { fieldsCompany } from './../../data/fieldsCompany'
import FieldClass from './../../classes/fieldClass'
import sortMethod from './../../scripts/sortMethod'

import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

export default {
  components: { ButtonTrash },
  props: ['item'],
  emits: ['save-item'],
  data() {
    return {
      fieldsContact: fieldsContact.concat(fieldsCompany),
      fieldTitle: 'Выберите тип поля',
      fieldDescription: '',
      newSotrudnikId: ''
    }
  },
  computed: {
    contacts() {
      return this.$store.getters.contact
    },
    sotrudniks() {
      return this.contacts.filter(item => item.companyId === this.item.id)
    }
  },
  mounted() {
    this.updateTextareaHeight()
  },
  methods: {
    sortContactForms(itemContacts) {
      return sortMethod(itemContacts, 'asc', 'position')
    },

    // Методы работы с Сотрудниками
    addNewSotrudnik() {
      const id = this.newSotrudnikId
      const newSotrudnik = this.contacts.find(item => item.id === id) || null
      newSotrudnik.companyId = this.item.id
      this.$store.dispatch('updateItem', { item: newSotrudnik })
    },

    // Методы добавления Полей
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