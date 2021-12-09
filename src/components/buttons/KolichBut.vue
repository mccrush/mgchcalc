<template>
  <div class="btn-group btn-group-sm" role="group" aria-label="Kolich">
    <button
      type="button"
      class="btn btn-primary"
      :class="{ active: rabotaAmount === 'priceS' }"
    >
      &lt;100
    </button>
    <button
      type="button"
      class="btn btn-primary"
      :class="{ active: rabotaAmount === 'priceM' }"
    >
      &gt;100
    </button>
    <button
      type="button"
      class="btn btn-primary"
      :class="{ active: rabotaAmount === 'priceL' }"
    >
      &gt;500
    </button>
  </div>
</template>

<script>
export default {
  props: ['rabotaAmount']
}
</script>