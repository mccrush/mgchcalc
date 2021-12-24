<template>
  <div class="bg-light rounded-3 p-3">
    <div class="list-title text-center pt-0">
      <strong>{{ title }}</strong>
    </div>
    <div class="list-items">
      <div
        v-for="item in array"
        :key="item.id"
        class="item bg-white shadow-sm rounded-3 lh-1 mt-3 p-2"
      >
        <span class="">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'array']
}
</script>