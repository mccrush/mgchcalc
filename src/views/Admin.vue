<template>
  <div class="row pt-2">
    <div class="col-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
      >
        <option selected>Категория</option>
        <option value="1">Группа сырья</option>
        <option value="2">Сырье</option>
        <option value="3">Работа</option>
      </select>
    </div>
    <!---->
    <div class="col-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
      >
        <option selected>Группа сырья</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <!---->
    <div class="col-3 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select resourse"
      >
        <option selected>Сырье</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <div class="col-3">
      <button class="btn btn-sm btn-outline-success w-100" @click="meth">
        Добавить
      </button>
    </div>
  </div>
  <div class="row pt-2 pb-2">
    <div class="col-6 pe-0">
      <input type="text" class="form-control" />
    </div>
    <div class="col-3 pe-0">
      <select class="form-select w-100" aria-label="Select resourse">
        <option selected>Группа</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <div class="col-1 pe-0">
      <input type="text" class="form-control" />
    </div>
    <div class="col-2">
      <input type="text" class="form-control" />
    </div>
  </div>
</template>

<script>
import createSiryo from '@/scripts/createSiryo'

export default {}
</script>