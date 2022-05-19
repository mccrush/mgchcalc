<template>
  <div class="row bg-light rounded-bottom mt-2 pt-1 pb-1">
    <div class="col-12 text-end">
      <span class="badge bg-secondary">
        <a
          class="text-white small"
          href="https://github.com/mccrush/mgchcalc/releases"
          target="_blank"
          title="Посмотреть историю изменений"
          >Версия v{{ version }}</a
        >
      </span>
    </div>
  </div>
</template>

<script>
import { version } from './../../../package.json'
export default {
  data() {
    return {
      version
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>