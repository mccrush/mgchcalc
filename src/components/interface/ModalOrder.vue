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
          <h6 class="mt-3">Задачи Сырье</h6>
          <ul class="list-group ist-group-numbered">
            <ModalOrderList v-for="elem in order.siryoArray" :key="elem.id">
              <template v-slot:title
                >{{ elem.elemTitle }}, {{ elem.elemDlina }} x
                {{ elem.elemShirina }} = {{ elem.elemSize }}
                {{ elem.elemEd }}</template
              >
              <template v-slot:button>
                <ButtonTrash
                  @click="
                    removeElement({
                      array: 'siryoArray',
                      id: elem.id
                    })
                  "
                />
              </template>
            </ModalOrderList>
          </ul>
          <!-- -->
          <h6 class="mt-3">Задачи Работы</h6>
          <ul class="list-group ist-group-numbered">
            <ModalOrderList v-for="elem in order.rabotaArray" :key="elem.id">
              <template v-slot:title
                >{{ elem.elemTitle }}, {{ elem.elemSize }}
                {{ elem.elemEd }}</template
              >
              <template v-slot:button>
                <ButtonTrash
                  @click="
                    removeElement({
                      array: 'rabotaArray',
                      id: elem.id
                    })
                  "
                />
                <!-- <button
                  class="btn btn-sm btn-outline-info"
                  @click="addFrezer(elem)"
                >
                  На фрезер
                </button> -->
              </template>
            </ModalOrderList>
          </ul>
          <!-- -->
          <h6 class="mt-3">Задачи Допуслуг</h6>
          <ul class="list-group ist-group-numbered">
            <ModalOrderList v-for="elem in order.dopuslugArray" :key="elem.id">
              <template v-slot:title
                >{{ elem.elemTitle }}, {{ elem.elemSize }}
                {{ elem.elemEd }}</template
              ><template v-slot:button>
                <ButtonTrash
                  @click="
                    removeElement({
                      array: 'dopuslugArray',
                      id: elem.id
                    })
                  "
                />
              </template>
            </ModalOrderList>
          </ul>
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
  props: ['order', 'mod'],
  data() {
    return {
      clients,
      client: ''
    }
  },
  methods: {
    removeElement({ array, id }) {
      this.order[array] = this.order[array].filter(item => item.id !== id)
    },
    updateOrderTitle() {
      const startPos = this.order.title.indexOf('_')
      const subStr = this.order.title.slice(startPos)
      this.order.title = this.client.toUpperCase() + subStr
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
    addFrezer(item) {
      this.$store.commit('addItem', { item })
      this.$store.dispatch('addItem', { item })
    },
    saveItem() {
      if (this.order.title) {
        //console.log('save order:', this.order)
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