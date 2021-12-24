<template>
  <div
    class="modal fade"
    id="staticBackdrop"
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
          <h5 class="modal-title" id="staticBackdropLabel">
            Параметры заказа
            <span class="small text-muted"><small>от 16.12.2021</small></span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body pt-2">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model.trim="order.title"
            placeholder="Название заказа"
          />
          <!-- -->
          <h6 class="mt-3">Задачи Сырье</h6>
          <div
            v-for="elem in order.siryoArray"
            :key="elem.id"
            class="row border mt-1 p-1"
          >
            <div class="col-12 col-md-8 col-lg-9">
              {{ elem.elemTitle }} - {{ elem.elemSize }}
            </div>
            <!-- <div class="col-8 col-md-3 col-lg-2">
              <select class="form-select form-select-sm">
                <option value="new">Новая</option>
                <option value="process">В работе</option>
                <option value="done">Готово</option>
              </select>
            </div>
            <div class="col-4 col-md-1">
              <ButtonTrash />
            </div> -->
          </div>
          <!-- -->
          <h6 class="mt-3">Задачи Работы</h6>
          <div
            v-for="elem in order.rabotaArray"
            :key="elem.id"
            class="row border mt-1 p-1"
          >
            <div class="col-12 col-md-8 col-lg-9">
              {{ elem.elemTitle }} - {{ elem.elemSize }}
            </div>
            <!-- <div class="col-8 col-md-3 col-lg-2">
              <select class="form-select form-select-sm">
                <option value="new">Новая</option>
                <option value="process">В работе</option>
                <option value="done">Готово</option>
              </select>
            </div>
            <div class="col-4 col-md-1">
              <ButtonTrash />
            </div> -->
          </div>
          <!-- -->
          <h6 class="mt-3">Задачи Допуслуг</h6>
          <div
            v-for="elem in order.dopuslugArray"
            :key="elem.id"
            class="row border mt-1 p-1"
          >
            <div class="col-12 col-md-8 col-lg-9">
              {{ elem.elemTitle }} - {{ elem.elemSize }}
            </div>
            <!-- <div class="col-8 col-md-3 col-lg-2">
              <select class="form-select form-select-sm">
                <option value="new">Новая</option>
                <option value="process">В работе</option>
                <option value="done">Готово</option>
              </select>
            </div>
            <div class="col-4 col-md-1">
              <ButtonTrash />
            </div> -->
          </div>
        </div>
        <div class="modal-footer p-2">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Отмена
          </button>
          <button
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
  props: ['order'],
  methods: {
    saveItem() {
      if (this.order.title) {
        console.log('save order:', this.order)
        this.$store.commit('addItem', { item: order })
        this.$store.dispatch('addItem', { item: order })
      }
    },
    removeItem(id) {
      this.$store.commit('removeItem', { type: this.razdel, id })
      this.$store.dispatch('removeItem', { type: this.razdel, id })
    }
  }
}
</script>