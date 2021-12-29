<template>
  <li
    class="list-group-item d-flex justify-content-between align-content-center"
  >
    <!-- <input class="form-check-input me-2" type="checkbox" value="" /> -->
    <div class="pt-1">
      <slot name="title"> Название задачи </slot>
    </div>
    <div class="d-flex align-content-center">
      <slot name="badge">
        <span class="badge bg-light text-dark">-</span>
      </slot>
      <slot name="button">
        <button class="btn btn-sm btn-light text-light" disabled>-</button>
      </slot>
    </div>
  </li>
</template>