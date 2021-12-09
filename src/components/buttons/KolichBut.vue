<template>
  <div class="btn-group btn-group-sm" role="group" aria-label="Kolich">
    <button
      type="button"
      class="btn btn-light disabled"
      :class="{ 'btn-dark': rabotaAmount === 'priceS' }"
    >
      &lt;100
    </button>
    <button
      type="button"
      class="btn btn-light disabled"
      :class="{ 'btn-dark': rabotaAmount === 'priceM' }"
    >
      &gt;100
    </button>
    <button
      type="button"
      class="btn btn-light disabled"
      :class="{ 'btn-dark': rabotaAmount === 'priceL' }"
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