<template>
  <div class="row">
    <div class="col-12">
      <img
        src="/images/work_icons/image.svg"
        class="w-100 border rounded"
        alt="Изображение материала"
        height="119"
      />
    </div>

    <!-- Название материала -->
    <!-- <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item')"
        />
        <label for="inputTitle">Название материала</label>
      </form>
    </div> -->

    <!-- Подгруппа -->
    <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <select
          class="form-select form-select-sm"
          id="inputUndergroup"
          v-model="item.undergroupId"
          @change="$emit('save-item')"
        >
          <option
            v-for="undergroup in undergroups"
            :key="undergroup.id"
            :value="undergroup.id"
          >
            {{ undergroup.title }}
          </option>
        </select>
        <label for="inputUndergroup">Подгруппа</label>
      </form>
    </div>

    <!-- Единицы & Нор. отх. % -->
    <div class="col-6 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <select
          class="form-select form-select-sm"
          id="inputEd"
          v-model="item.ed"
          @change="$emit('save-item')"
        >
          <option v-for="e in ed" :key="e" :value="e">{{ e }}</option>
        </select>
        <label for="inputEd">Единицы</label>
      </form>
    </div>

    <div class="col-6 mt-2 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputNormaothoda"
          v-model.number="item.normaothoda"
          @blur="$emit('save-item')"
        />
        <label for="inputNormaothoda">Нор.отх.%</label>
      </form>
    </div>

    <!-- Вес кг & Объем м2 -->
    <div class="col-6 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputVes"
          v-model.number="item.ves"
          @blur="$emit('save-item')"
        />
        <label for="inputVes">Вес кг</label>
      </form>
    </div>

    <div class="col-6 mt-2 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputObjom"
          v-model.number="item.objom"
          @blur="$emit('save-item')"
        />
        <label for="inputObjom">Объем м2</label>
      </form>
    </div>

    <!-- Основной поставщик -->
    <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <select
          class="form-select form-select-sm"
          id="inputPostavshikId"
          v-model="item.postavchikId"
          @change="$emit('save-item')"
        >
          <option
            v-for="postavshik in postavshiks"
            :key="postavshik.id"
            :value="postavshik.id"
          >
            {{ postavshik.title }}
          </option>
        </select>
        <label for="inputPostavshikId">Основной поставщик</label>
      </form>
    </div>

    <!-- Минимальный остаток склада -->
    <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputMinOstatokSklada"
          v-model.number="item.minOstatokSklada"
          @blur="$emit('save-item')"
        />
        <label for="inputMinOstatokSklada">Минимал. остаток склада</label>
      </form>
    </div>
  </div>
</template>

<script>
import ed from './../../data/ed'

export default {
  props: ['item'],
  emits: ['save-item'],
  data() {
    return {
      ed
    }
  },
  computed: {
    undergroups() {
      return this.$store.getters.undergroup
    },
    postavshiks() {
      return this.$store.getters.postavshik
    }
  }
}
</script>