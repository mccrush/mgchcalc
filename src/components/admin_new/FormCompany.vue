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
              v-for="formContact in sortMethod(
                this.item.fields,
                'asc',
                'position'
              )"
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
                    @click="updatePositionFieldUp(formContact.id)"
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
                    @click="updatePositionFieldDown(formContact.id)"
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
                    @click="removeField(formContact.id)"
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
                @click="addField(item, fieldTitle, fieldDescription)"
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
                  @click.stop="removeSotrudnikFromCompany(sotrudnik.id)"
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
import { mixinFieldMethods } from './../../mixins/mixinFieldMethods'
import { mixinSortMethod } from './../../mixins/mixinSortMethod'
import { mixinUpdateTextareaHeight } from './../../mixins/mixinUpdateTextareaHeight'
import { mixinCopyInBuffer } from './../../mixins/mixinCopyInBuffer'

import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

export default {
  components: { ButtonTrash },
  props: ['item'],
  emits: ['save-item'],
  mixins: [
    mixinFieldMethods,
    mixinSortMethod,
    mixinUpdateTextareaHeight,
    mixinCopyInBuffer
  ],
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
  methods: {
    // Методы работы с Сотрудниками
    addNewSotrudnik() {
      const id = this.newSotrudnikId
      const newSotrudnik = this.contacts.find(item => item.id === id) || null
      newSotrudnik.companyId = this.item.id
      this.$store.dispatch('updateItem', { item: newSotrudnik })
    },

    removeSotrudnikFromCompany(id) {
      const sotrudnik = this.contacts.find(item => item.id === id) || null
      sotrudnik.companyId = ''
      this.$store.dispatch('updateItem', { item: sotrudnik })
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