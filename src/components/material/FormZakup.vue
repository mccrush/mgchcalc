<template>
  <div class="row">
    <!-- Номер закупки -->
    <div class="col-4 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputNomer"
          v-model.trim="zakup.zakupNomer"
          @blur="$emit('update-zakup')"
        />
        <label for="inputNomer">Номер закупа</label>
      </form>
    </div>

    <!-- Номер счета -->
    <div class="col-4 mt-2 ps-1 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputNomerScheta"
          v-model.trim="zakup.nomerScheta"
          @blur="$emit('update-zakup')"
        />
        <label for="inputNomerScheta">Номер счета</label>
      </form>
    </div>

    <!-- Дата -->
    <div class="col-4 mt-2 ps-1">
      <div class="form-floating">
        <input
          type="datetime-local"
          id="inputDateCreate"
          class="form-control form-control-sm"
          v-model="zakup.dateCreate"
          @change="$emit('update-zakup')"
        />
        <label for="inputDateCreate">Дата</label>
      </div>
    </div>

    <!-- Поставщик -->
    <div class="col-3 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <select
          class="form-select form-select-sm"
          id="inputPostavshikId"
          v-model="zakup.postavshikId"
          @change="$emit('update-zakup')"
        >
          <option
            v-for="postavshik in postavshiks"
            :key="postavshik.id"
            :value="postavshik.id"
          >
            {{ postavshik.title }}
          </option>
        </select>
        <label for="inputPostavshikId">Поставщик</label>
      </form>
    </div>

    <!-- Приход в единицах -->
    <div class="col-3 mt-2 ps-1 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPrihodEdinicy"
          v-model.number="zakup.prihodEdinicy"
          @blur="$emit('update-zakup')"
        />
        <label for="inputPrihodEdinicy">Приход в ед.</label>
      </form>
    </div>

    <!-- Приход в рублях -->
    <div class="col-3 mt-2 ps-1 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPrihodRubly"
          v-model.number="zakup.prihodRubly"
          @blur="$emit('update-zakup')"
        />
        <label for="inputPrihodRubly">Приход в рублях</label>
      </form>
    </div>

    <!-- Цена -->
    <div class="col-3 mt-2 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPrice"
          v-model.number="zakup.price"
          @blur="$emit('update-zakup')"
        />
        <label for="inputPrice">Цена</label>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['zakup'],
  emits: ['update-zakup'],

  computed: {
    postavshiks() {
      return this.$store.getters.postavshik
    }
  }
}
</script>