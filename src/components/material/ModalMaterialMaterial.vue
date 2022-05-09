<template>
  <div class="row">
    <div class="col-12">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item', { item })"
        />
        <label for="inputTitle">Название</label>
      </form>
    </div>
    <div class="col-6 mt-2 pe-0">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputGroup"
          v-model="item.categoryId"
          @change="$emit('save-item', { item })"
        />
        <label for="inputGroup">Группа select</label>
      </form>
    </div>
    <div class="col-6 mt-2">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputEd"
          v-model.number="item.ed"
          @change="$emit('save-item', { item })"
        />
        <label for="inputEd">Единицы select</label>
      </form>
    </div>
    <div class="col-6 mt-2 pe-0">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPrice"
          v-model.number="item.price"
          @change="$emit('save-item', { item })"
        />
        <label for="inputPrice">Стоимость</label>
      </form>
    </div>
    <div class="col-6 mt-2">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPosition"
          v-model.number="item.position"
          @change="$emit('save-item', { item })"
        />
        <label for="inputPosition">Позиция</label>
      </form>
    </div>
    <div class="col-12 mt-2">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPostavshik"
          v-model.number="item.postavshik"
          @change="$emit('save-item', { item })"
        />
        <label for="inputPostavshik">Поставщик select</label>
      </form>
    </div>
    <div class="col-12 mt-2">
      <form class="form-floating">
        <textarea
          class="form-control form-control-sm"
          id="inputDescription"
          v-model.trim="item.description"
          @change="$emit('save-item', { item })"
        ></textarea>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>