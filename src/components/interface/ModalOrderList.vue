<template>
  <li
    class="
      list-group-item
      d-flex
      justify-content-between
      align-content-center
      pe-2
    "
  >
    <!-- <input class="form-check-input me-2" type="checkbox" value="" /> -->
    <div class="pt-1">
      <slot name="title"> Название задачи </slot>
    </div>
    <div class="d-flex align-content-center">
      <slot name="badge">
        <span class="">-</span>
      </slot>
      <slot name="button">
        <span class="">-</span>
      </slot>
    </div>
  </li>
</template>