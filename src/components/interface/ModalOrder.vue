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
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="order.title"
            placeholder="Название заказа"
          />
          <hr />
          Сырье
          <div
            v-for="siryo in order.siryoArray"
            :key="siryo.id"
            class="border mt-1 p-1"
          >
            {{ siryo.title }} - {{ siryo.size }}
            <button
              class="btn btn-sm btn-warning"
              title="Отправить в производство"
            >
              В производство
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Отмена
          </button>
          <button type="button" class="btn btn-primary">Сохранить заказ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['order']
}
</script>