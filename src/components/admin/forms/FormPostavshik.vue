<template>
  <div class="row">
    <div class="col-12 col-sm-6 pe-0">
      <form @keypress.enter.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item', { item })"
          draggable="true"
        />
        <label for="inputTitle">Название</label>
      </form>
    </div>
    <div class="col-12 col-sm-6 mt-1 mt-sm-0 ps-md-1 pe-0">
      <form @keypress.enter.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputAddress"
          v-model.trim="item.address"
          @change="$emit('save-item', { item })"
          draggable="true"
        />
        <label for="inputAddress">Адрес</label>
      </form>
    </div>
    <div class="col-12 col-sm-6 mt-1 pe-0">
      <form @keypress.enter.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputPhone"
          v-model.trim="item.phone"
          @change="$emit('save-item', { item })"
          draggable="true"
        />
        <label for="inputPhone">Телефон</label>
      </form>
    </div>
    <div class="col-12 col-sm-6 mt-1 ps-md-1 pe-0">
      <form @keypress.enter.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputEmail"
          v-model.trim="item.email"
          @change="$emit('save-item', { item })"
          draggable="true"
        />
        <label for="inputEmail">Email</label>
      </form>
    </div>

    <div class="col-12 col-sm-8 col-md-11 mt-1 pe-0 pe-sm-1">
      <div class="form-floating">
        <textarea
          class="form-control"
          placeholder="Описание"
          id="inputDescription"
          v-model.trim="item.description"
          @change="$emit('save-item', { item })"
        ></textarea>
        <label for="inputDescription">Описание</label>
      </div>
    </div>

    <div class="col-12 col-sm-4 col-md-1 d-flex text-end mt-1 pe-0">
      <ButtonTrash @click="$emit('remove-item', item.id)" />
    </div>
  </div>
</template>

<script>
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    ButtonTrash
  },
  props: ['item'],
  emits: ['save-item', 'remove-item']
}
</script>