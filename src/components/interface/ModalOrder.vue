<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-xl modal-fullscreen-xl-down modal-dialog-centered
      "
    >
      <div class="modal-content border-0">
        <div class="modal-header bg-light border-0">
          <h6 class="modal-title text-muted" id="staticBackdropLabel">
            Параметры заказа
          </h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body pt-2">
          <div class="row">
            <div class="col-7 pe-0">
              <input
                type="text"
                class="form-control form-control-sm"
                v-model.trim="order.title"
                placeholder="Название заказа"
                @change="updateItem(order)"
              />
            </div>
            <div class="col-3 pe-0">
              <select
                v-model="client"
                @change="updateOrderTitle"
                class="form-select form-select-sm"
              >
                <option
                  v-for="client in clients"
                  :key="client.id"
                  :value="client.title"
                >
                  {{ client.title }}
                </option>
              </select>
            </div>
            <div class="col-2">
              <select
                v-model="order.status"
                @change="updateOrderStatus(order)"
                class="form-select form-select-sm text-white"
                :class="{
                  'bg-info': order.status === 'new',
                  'bg-warning': order.status === 'inprogress',
                  'bg-success': order.status === 'done'
                }"
              >
                <option value="new">Новый</option>
                <option value="inprogress">В работе</option>
                <option value="done">Выполнен</option>
              </select>
            </div>
          </div>

          <div class="row pt-2">
            <div class="col-4 pe-0">
              <div class="form-floating">
                <input
                  @change="updateItem(order)"
                  type="datetime-local"
                  id="date"
                  class="form-control form-control-sm"
                  v-model="order.dateCreate"
                />
                <label for="date">Создан</label>
              </div>
            </div>
            <div class="col-4">
              <div class="form-floating">
                <input
                  @change="updateItem(order)"
                  type="datetime-local"
                  id="date"
                  class="form-control form-control-sm"
                  v-model="order.dateForReady"
                />
                <label for="date">Срок сдачи</label>
              </div>
            </div>
            <div class="col-4 ps-0">
              <div class="form-floating">
                <input
                  @change="updateItem(order)"
                  type="datetime-local"
                  id="date"
                  class="form-control form-control-sm"
                  v-model="order.dateFinish"
                />
                <label for="date">Завершен</label>
              </div>
            </div>
          </div>

          <!-- -->
          <div v-if="order.siryoArray.length">
            <h6 class="mt-3">Материалы</h6>
            <ul class="list-group ist-group-numbered">
              <ModalOrderList v-for="elem in order.siryoArray" :key="elem.id">
                <template v-slot:title
                  >{{ elem.elemTitle }}, {{ elem.elemDlina }} x
                  {{ elem.elemShirina }} = {{ elem.elemSize }}
                  {{ elem.elemEd }} === {{ elem.elemOur }}</template
                >
                <template v-slot:badge>
                  <span
                    v-if="!elem.elemOur"
                    class="
                      badge
                      bg-warning
                      text-dark
                      align-self-center
                      me-2
                      p-2
                    "
                    >Дата поставки:
                    {{
                      new Date(elem.elemDateDelivery).toLocaleDateString(
                        'ru-RU'
                      )
                    }}</span
                  >
                </template>
                <template v-slot:button> </template>
              </ModalOrderList>
            </ul>
          </div>
          <!-- -->
          <div v-if="order.rabotaArray.length">
            <h6 class="mt-3">Услуги обработки</h6>
            <ul class="list-group ist-group-numbered">
              <ModalOrderList v-for="elem in order.rabotaArray" :key="elem.id">
                <template v-slot:title
                  >{{ elem.elemTitle }}, {{ elem.elemSize }}
                  {{ elem.elemEd }}</template
                >
                <template v-slot:button>
                  <select
                    v-if="mod === 'edit'"
                    v-model="elemStatus"
                    @change="
                      updateElemStatus({
                        array: 'rabotaArray',
                        id: elem.id
                      })
                    "
                    class="form-select form-select-sm text-white"
                    :class="{
                      'bg-info': elem.status === 'new',
                      'bg-warning': elem.status === 'inprogress',
                      'bg-success': elem.status === 'done'
                    }"
                  >
                    <option value="new">Новый</option>
                    <option value="inprogress">В работе</option>
                    <option value="done">Выполнен</option>
                  </select>
                </template>
              </ModalOrderList>
            </ul>
          </div>
          <!-- -->
          <div v-if="order.dopuslugArray.length">
            <h6 class="mt-3">Дополнительные услуги</h6>
            <ul class="list-group ist-group-numbered">
              <ModalOrderList
                v-for="elem in order.dopuslugArray"
                :key="elem.id"
              >
                <template v-slot:title
                  >{{ elem.elemTitle }}, {{ elem.elemSize }}
                  {{ elem.elemEd }}</template
                ><template v-slot:button> </template>
              </ModalOrderList>
            </ul>
          </div>
        </div>
        <div class="modal-footer p-2">
          <button
            v-if="mod === 'edit'"
            type="button"
            class="btn btn-outline-danger"
            @click="removeItem(order.id)"
            data-bs-dismiss="modal"
          >
            Удалить заказ
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Отмена
          </button>
          <button
            v-if="mod === 'create'"
            type="button"
            class="btn btn-success"
            data-bs-dismiss="modal"
            @click="saveItem"
          >
            Сохранить заказ и закрыть окно
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clients from '@/data/clients'
import getDateNow from '@/scripts/getDateNow'
import ButtonTrash from '@/components/buttons/ButtonTrash'
import ModalOrderList from '@/components/interface/ModalOrderList'

export default {
  components: {
    ButtonTrash,
    ModalOrderList
  },
  props: {
    order: Object,
    mod: String
  },
  data() {
    return {
      clients,
      client: '',
      elemStatus: 'new'
    }
  },
  methods: {
    // removeElement({ array, id }) {
    //   this.order[array] = this.order[array].filter(item => item.id !== id)
    // },
    updateElemStatus({ array, id }) {
      const index = this.order[array].findIndex(item => item.id === id)
      this.order[array][index].status = this.elemStatus
      const item = this.order[array][index]
      this.$store.commit('addItem', { item })
      this.$store.dispatch('addItem', { item })
      this.updateItem(this.order)
    },
    updateOrderTitle() {
      const startPos = this.order.title.indexOf('_')
      const subStr = this.order.title.slice(startPos)
      this.order.title = this.client.toUpperCase() + subStr
      if (this.order.title && this.mod === 'edit') {
        this.updateItem(this.order)
      }
    },
    updateOrderStatus(order) {
      if (order.status === 'done') {
        order.dateFinish = getDateNow
        this.updateItem(order)
      } else {
        order.dateFinish = ''
        this.updateItem(order)
      }
    },
    addFrezer({ array, id }) {
      // Сначала обновляем статус в текущем элементе
      // const index = this.order[array].findIndex(item => item.id === id)
      // console.log('this.order[array][index]:', this.order[array][index])
      // this.order[array][index].status = 'inprogress'
      // const item = this.order[array][index]
      // Затем добавляем его как задачу в БД
      //this.$store.commit('addItem', { item })
      //this.$store.dispatch('addItem', { item })
    },
    saveItem() {
      if (this.order.title) {
        console.log('save order:', this.order)
        this.$store.commit('addItem', { item: this.order })
        this.$store.dispatch('addItem', { item: this.order })
      }
    },
    updateItem(item) {
      if (item.title && this.mod === 'edit') {
        // Сначала переприсвоить массивы, и лишь потом оновлять
        this.$store.commit('updateItem', { item })
        this.$store.dispatch('updateItem', { item })
      }
    },
    removeItem(id) {
      if (confirm('Действительно удалить заказ?')) {
        this.$store.commit('removeItem', { type: 'order', id })
        this.$store.dispatch('removeItem', { type: 'order', id })
      }
    }
  }
}
</script>