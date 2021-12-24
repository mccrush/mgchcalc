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
            <div class="col-10 pe-0">
              <input
                type="text"
                class="form-control form-control-sm"
                v-model.trim="order.title"
                placeholder="Название заказа"
                @change="updateItem(order)"
              />
            </div>
            <div class="col-2">
              <select
                v-model="order.status"
                @change="updateItem(order)"
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

          <!-- -->
          <h6 class="mt-3">Задачи Сырье</h6>
          <ul class="list-group ist-group-numbered">
            <li
              v-for="elem in order.siryoArray"
              :key="elem.id"
              class="list-group-item d-flex"
            >
              <input class="form-check-input me-2" type="checkbox" value="" />
              <div>
                {{ elem.elemTitle }} - {{ elem.elemSize }} {{ elem.elemEd }}
              </div>
            </li>
          </ul>
          <!-- -->
          <h6 class="mt-3">Задачи Работы</h6>
          <div
            v-for="elem in order.rabotaArray"
            :key="elem.id"
            class="row mt-1 p-1"
          >
            <div class="col-12 col-md-8 col-lg-9">
              {{ elem.elemTitle }} - {{ elem.elemSize }}
            </div>
          </div>
          <!-- -->
          <h6 class="mt-3">Задачи Допуслуг</h6>
          <div
            v-for="elem in order.dopuslugArray"
            :key="elem.id"
            class="row mt-1 p-1"
          >
            <div class="col-12 col-md-8 col-lg-9">
              {{ elem.elemTitle }} - {{ elem.elemSize }}
            </div>
          </div>
        </div>
        <div class="modal-footer p-2">
          <button
            v-if="mod === 'edit'"
            type="button"
            class="btn btn-outline-danger"
            @click="removeItem(order.id)"
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
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    ButtonTrash
  },
  props: ['order', 'mod'],
  methods: {
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