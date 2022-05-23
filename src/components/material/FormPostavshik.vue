<template>
  <div class="row">
    <!-- Название Поставщика -->
    <div class="col-12">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item')"
        />
        <label for="inputTitle">Название</label>
      </form>
    </div>

    <!-- Адрес Поставщика -->
    <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputAddress"
          v-model.trim="item.address"
          @change="$emit('save-item')"
        />
        <label for="inputAddress">Адрес</label>
      </form>
    </div>

    <!-- Контакт Поставщика -->
    <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputContact"
          v-model.trim="item.contact"
          @change="$emit('save-item')"
        />
        <label for="inputContact">Контакт</label>
      </form>
    </div>

    <!-- Телефоны Поставщика -->
    <div class="col-6 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputPhone"
          v-model.trim="item.phone"
          @change="$emit('save-item')"
        />
        <label for="inputPhone">Телефон</label>
      </form>
    </div>
    <div class="col-6 mt-2 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputPhone2"
          v-model.trim="item.phone2"
          @change="$emit('save-item')"
        />
        <label for="inputPhone2">Телефон 2</label>
      </form>
    </div>

    <!-- Email Поставщика -->
    <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputEmail"
          v-model.trim="item.email"
          @change="$emit('save-item')"
        />
        <label for="inputEmail">Email</label>
      </form>
    </div>

    <!-- Whatsapp Поставщика -->
    <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputWhatsapp"
          v-model.trim="item.whatsapp"
          @change="$emit('save-item')"
        />
        <label for="inputEmail">Whatsapp</label>
      </form>
    </div>

    <!-- Telegram Поставщика -->
    <div class="col-12 mt-2">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTelegram"
          v-model.trim="item.telegram"
          @change="$emit('save-item')"
        />
        <label for="inputEmail">Telegram</label>
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