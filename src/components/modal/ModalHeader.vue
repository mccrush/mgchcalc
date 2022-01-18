<template>
  <div class="modal-header bg-light border-0">
    <h6 class="modal-title text-muted" id="staticBackdropLabel">
      <slot name="modal-title">Заголовок окна</slot>
    </h6>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="modal"
      aria-label="Close"
    ></button>
  </div>
</template>