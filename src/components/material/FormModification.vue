<template>
  <div class="row">
    <!-- Название Модификации -->
    <div class="col-12">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="modification.title"
          @change="$emit('update-modification')"
        />
        <label for="inputTitle">Название Модификации</label>
      </form>
    </div>

    <!-- Поставщик -->
    <div class="col-4 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <select
          class="form-select form-select-sm"
          id="inputPostavshikId"
          v-model="modification.postavshikId"
          @change="$emit('update-modification')"
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

    <!-- Единицы -->
    <div class="col-4 mt-2 ps-1 pe-1">
      <form @submit.prevent class="form-floating">
        <select
          class="form-select"
          id="inputEd"
          v-model="modification.ed"
          @change="$emit('update-modification')"
        >
          <option v-for="e in ed" :key="e" :value="e">{{ e }}</option>
        </select>
        <label for="inputEd">Единицы</label>
      </form>
    </div>

    <!-- Ширина и Высота -->
    <div class="col-2 mt-2 ps-1 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputShirina"
          v-model.number="modification.shirina"
          @blur="$emit('update-modification')"
        />
        <label for="inputShirina">Р</label>
      </form>
    </div>

    <div class="col-2 mt-2 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputVisota"
          v-model.number="modification.visota"
          @blur="$emit('update-modification')"
        />
        <label for="inputVisota">Р</label>
      </form>
    </div>

    <!-- Вес кг & Объем м2 -->
    <div class="col-4 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputVes"
          v-model.number="modification.ves"
          @blur="$emit('update-modification')"
        />
        <label for="inputVes">Вес кг</label>
      </form>
    </div>

    <div class="col-4 mt-2 ps-1 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputObjom"
          v-model.number="modification.objom"
          @blur="$emit('update-modification')"
        />
        <label for="inputObjom">Объем м2</label>
      </form>
    </div>

    <div class="col-4 mt-2 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputMetrovvliste"
          v-model.number="modification.metrovvliste"
          @blur="$emit('update-modification')"
        />
        <label for="inputMetrovvliste">В листе м2</label>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modification', 'ed'],
  emits: ['update-modification'],

  computed: {
    postavshiks() {
      return this.$store.getters.postavshik
    }
  }
}
</script>