<template></template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, Modal, Tooltip } from 'bootstrap'

export default {
  name: 'App',
  components: {}
}
</script>

<style>
.btn:focus,
.btn-check:focus + .btn-outline-dark,
.form-control:focus,
.form-select:focus,
.accordion-button:focus,
.navbar-toggler:focus {
  outline: 0 !important;
  box-shadow: none !important;
}

.cursor-pointer {
  cursor: pointer;
}

.my-h-100 {
  height: calc(100vh - 86px);
}
</style>
