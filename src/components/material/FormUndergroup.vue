<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-start align-items-center mt-2 mt-md-0">
        <!-- <ButtonBack /> -->
        <h4 v-if="item" class="m-0 ms-2">{{ item.title }}</h4>
      </div>
      <hr class="mt-2" />
    </div>

    <!-- Название подгруппы -->
    <div class="col-12">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item')"
        />
        <label for="inputTitle">Название подгруппы</label>
      </form>
    </div>

    <!-- Группа -->
    <div class="col-6 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <select
          class="form-select"
          id="inputGroup"
          v-model="item.groupId"
          @change="$emit('save-item')"
        >
          <option v-for="group in groups" :key="group.id" :value="group.id">
            {{ group.title }}
          </option>
        </select>
        <label for="inputGroup">Группа</label>
      </form>
    </div>

    <!-- Позиция -->
    <div class="col-6 mt-2 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.number="item.position"
          @blur="$emit('save-item')"
        />
        <label for="inputTitle">Позиция</label>
      </form>
    </div>

    <!-- Комментарий -->
    <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <textarea
          class="form-control form-control-sm"
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
import ButtonBack from './../elements/buttons/ButtonBack.vue'

export default {
  components: {
    ButtonBack
  },
  props: ['item'],
  emits: ['save-item'],
  computed: {
    groups() {
      return this.$store.getters.group
    }
  }
}
</script>