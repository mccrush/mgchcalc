<template>
  <div class="row">
    <!-- Закупочная цена -->
    <div class="col-6 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPrice"
          v-model.number="item.price"
          @blur="$emit('save-item')"
        />
        <label for="inputPrice">Закупочная цена</label>
      </form>
    </div>
    <div class="col-6 mt-2 pe-1"></div>

    <!-- Цена продажи -->
    <div class="col-6 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPriceOrder"
          :value="Math.ceil(item.price + (item.price * item.nacenka) / 100)"
          disabled
        />
        <label for="inputPriceOrder">Цена продажи</label>
      </form>
    </div>
    <div class="col-6 mt-2 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputNacenka"
          v-model.number="item.nacenka"
          @blur="$emit('save-item')"
        />
        <label for="inputNacenka">Наценка %</label>
      </form>
    </div>

    <!-- Минимальная цена -->
    <div class="col-6 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputMinPrice"
          :value="
            Math.ceil(item.price + (item.price * item.nacenkaMinPrice) / 100)
          "
          disabled
        />
        <label for="inputMinPrice">Минимал. цена</label>
      </form>
    </div>
    <div class="col-6 mt-2 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputNacenkaMinPrice"
          v-model.number="item.nacenkaMinPrice"
          @blur="$emit('save-item')"
        />
        <label for="inputNacenkaMinPrice">Наценка %</label>
      </form>
    </div>

    <!-- Комментарий -->
    <div class="col-12 mt-2">
      <form class="form-floating">
        <textarea
          class="textarea-height form-control form-control-sm"
          id="inputDescription"
          v-model.trim="item.description"
          @change="$emit('save-item')"
        ></textarea>
        <label for="inputDescription">Комментарий</label>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  emits: ['save-item']
}
</script>

<style scoped>
.textarea-height {
  height: 190px;
}
</style>