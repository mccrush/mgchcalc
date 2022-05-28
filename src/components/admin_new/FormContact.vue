<template>
  <div class="row">
    <!-- Имя Кнтакта -->
    <div class="col-6 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputContactName"
          v-model.trim="item.contactName"
          @change="$emit('save-item')"
        />
        <label for="inputContactName">Имя контакта</label>
      </form>
    </div>

    <!-- Псевдоним Кнтакта -->
    <div class="col-6 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputContactNickname"
          v-model.trim="item.contactNickname"
          @change="$emit('save-item')"
        />
        <label for="inputContactNickname">Псевдоним контакта</label>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  props: ['item']
}
</script>