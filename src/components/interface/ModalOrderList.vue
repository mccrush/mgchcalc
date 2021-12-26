<template>
  <li
    class="list-group-item d-flex justify-content-between align-content-center"
  >
    <!-- <input class="form-check-input me-2" type="checkbox" value="" /> -->
    <div class="pt-1">
      <slot name="title"> Название задачи </slot>
    </div>
    <div>
      <slot name="button">
        <button class="btn btn-sm btn-light text-light" disabled>-</button>
      </slot>
    </div>
  </li>
</template>