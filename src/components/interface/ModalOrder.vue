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
            <div class="col-6 pe-0">
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
            <div class="col-3">
              <select
                v-model="order.status"
                @change="updateOrderStatus(order)"
                class="form-select form-select-sm"
              >
                <option
                  v-for="status in etaps"
                  :key="status.id"
                  :value="status.alias"
                >
                  {{ status.title }}
                </option>
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
                  {{ elem.elemEd }}</template
                >
                <template v-slot:badge>
                  <span
                    v-if="elem.elemOur"
                    class="badge bg-light text-dark align-self-center me-2 p-2"
                    >{{ elem.elemSumma }} ₽</span
                  >
                  <span
                    v-else
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
                <template v-slot:badge>
                  <span
                    class="badge bg-light text-dark align-self-center me-2 p-2"
                    >{{ elem.elemSumma }} ₽</span
                  >
                  <!-- <span
                    v-if="elem.elemSumma < 500"
                    class="badge bg-light text-dark align-self-center me-2 p-2"
                    >+ {{ 500 - elem.elemSumma }} ₽</span
                  > -->
                </template>
                <template v-slot:button>
                  <!-- <select
                    v-if="mod === 'edit'"
                    :value="elem.status"
                    @change="
                      updateElemStatus({
                        array: 'rabotaArray',
                        id: elem.id,
                        status: $event
                      })
                    "
                    class="form-select form-select-sm text-white"
                    :class="{
                      'bg-info': elem.status === 'new',
                      'bg-warning': elem.status === 'inprogress',
                      'bg-success': elem.status === 'done'
                    }"
                  >
                    <option value="new">Новая</option>
                    <option value="inprogress">В работе</option>
                    <option value="done">Выполнена</option>
                  </select> -->
                  <button
                    v-if="mod === 'edit'"
                    class="btn btn-sm btn-info"
                    @click="createTZ(elem)"
                  >
                    Создать ТЗ
                  </button>
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
                >
                <template v-slot:badge>
                  <span
                    class="badge bg-light text-dark align-self-center me-2 p-2"
                    >{{ elem.elemSumma }} ₽</span
                  >
                </template>
                <template v-slot:button> </template>
              </ModalOrderList>
            </ul>
          </div>
          <div class="row mt-2">
            <div class="col-4"></div>
            <div class="col-4"></div>
            <div class="col-2 text-end">Лежит на полке:</div>
            <div class="col-2">
              <select
                class="form-select form-select-sm"
                v-model.number="order.polka"
                @change="updateOrderPolka"
              >
                <option v-for="num in 10" :key="'id' + num" :value="num">
                  {{ num }}
                </option>
              </select>
            </div>
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
import orderStatus from '@/data/orderStatus'
//import voronkaOrders from '@/data/voronkaOrders'
import voronkaNafrezer from '@/data/voronkaNafrezer'
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
      client: ''
    }
  },
  computed: {
    pathname() {
      return this.$store.getters.pathname
    },
    etaps() {
      if (this.pathname === 'order') return orderStatus
      return voronkaNafrezer
    }
  },
  methods: {
    createTZ(item) {
      console.log('createTZ elem:', item)
      this.$store.commit('addItem', { item })
      this.$store.dispatch('addItem', { item })
    },
    updateOrderPolka() {
      this.order.status = 'donefrezer'
      this.updateItem(this.order)
    },
    updateElemStatus({ array, id, status }) {
      const index = this.order[array].findIndex(item => item.id === id)
      this.order[array][index].status = status.target.value
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
      if (order.status === 'success' || order.status === 'failorder') {
        order.dateFinish = getDateNow
        order.polka = ''
        this.updateItem(order)
      } else {
        order.dateFinish = ''
        this.updateItem(order)
      }
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