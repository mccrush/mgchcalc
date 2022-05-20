<template>
  <div class="row">
    <div class="col-12">
      <img
        src="/images/work_icons/image.svg"
        class="w-100 border rounded"
        alt="Изображение материала"
        height="50"
      />
    </div>
    <div class="col-12 mt-2">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item')"
        />
        <label for="inputTitle">Название материала</label>
      </form>
    </div>

    <div class="col-12 mt-2">
      <form class="form-floating">
        <select
          class="form-select"
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

    <div class="col-6 mt-2 pe-1">
      <form class="form-floating">
        <select
          class="form-select"
          id="inputEd"
          v-model.number="item.ed"
          @blur="$emit('save-item')"
        >
          <option v-for="e in ed" :key="e" :value="e">{{ e }}</option>
        </select>
        <label for="inputEd">Единицы</label>
      </form>
    </div>

    <div class="col-6 mt-2 ps-1">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputNormaothoda"
          v-model.number="item.normaothoda"
          @blur="$emit('save-item')"
        />
        <label for="inputNormaothoda">Норма отхода %</label>
      </form>
    </div>

    <div class="col-6 mt-2 pe-1">
      <form class="form-floating">
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
      <form class="form-floating">
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

    <div class="col-12 mt-2">
      <form class="form-floating">
        <select
          class="form-select"
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
  </div>
</template>

<script>
import ed from './../../data/ed'

export default {
  props: ['item'],
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