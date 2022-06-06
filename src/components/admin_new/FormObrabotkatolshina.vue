<template>
  <div class="row">
    <!-- Название Обработки -->
    <div class="col-6 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item')"
        />
        <label for="inputTitle">Название обработки</label>
      </form>
    </div>

    <!-- Вид обработки -->
    <div class="col-6 ps-1">
      <form @submit.prevent class="form-floating">
        <select
          class="form-select"
          id="inputVidobrabotki"
          v-model="item.categoryId"
          @change="$emit('save-item')"
        >
          <option
            v-for="obrabotkavid in obrabotkavids"
            :key="obrabotkavid.id"
            :value="obrabotkavid.id"
          >
            {{ obrabotkavid.title }}
          </option>
        </select>
        <label for="inputVidobrabotki">Вид обработки</label>
      </form>
    </div>

    <!-- Позиция -->
    <div class="col-3 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPosition"
          v-model.number="item.position"
          @blur="$emit('save-item')"
        />
        <label for="inputPosition">Позиция</label>
      </form>
    </div>

    <!-- Стоимости -->
    <div class="col-3 mt-2 ps-1 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputS"
          v-model.number="item.priceS"
          @blur="$emit('save-item')"
        />
        <label for="inputS">Цена для &lt;100</label>
      </form>
    </div>

    <div class="col-3 mt-2 ps-1 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputM"
          v-model.number="item.priceM"
          @blur="$emit('save-item')"
        />
        <label for="inputM">Цена для &gt;100</label>
      </form>
    </div>

    <div class="col-3 mt-2 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputL"
          v-model.number="item.priceL"
          @blur="$emit('save-item')"
        />
        <label for="inputL">Цена для &gt;500</label>
      </form>
    </div>

    <!-- Комментарий -->
    <div class="col-12 mt-2">
      <form class="form-floating">
        <textarea
          class="form-control form-control-sm border-0"
          id="inputDescription"
          ref="inputDescription"
          v-model.trim="item.description"
          @input="updateTextareaHeight"
          @change="$emit('save-item')"
        ></textarea>
        <label for="inputDescription">Комментарий</label>
      </form>
    </div>
  </div>
</template>


<script>
import { mixinUpdateTextareaHeight } from './../../mixins/mixinUpdateTextareaHeight'

export default {
  props: ['item'],
  emits: ['save-item'],
  mixins: [mixinUpdateTextareaHeight],
  computed: {
    obrabotkavids() {
      return this.$store.getters.obrabotkavid
    }
  }
}
</script>