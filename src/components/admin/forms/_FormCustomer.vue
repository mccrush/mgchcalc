<template>
  <div class="row">
    <div class="col-12 col-sm-6 pe-sm-0">
      <input
        type="text"
        class="form-control form-control-sm"
        v-model.trim="item.title"
        placeholder="Название банка"
        @change="$emit('save-item', { item })"
      />
    </div>
    <div class="col-12 col-sm-6 mt-1 mt-sm-0 ps-sm-1">
      <input
        type="text"
        class="form-control form-control-sm"
        placeholder="Адрес банка"
        v-model.trim="item.address"
        @change="$emit('save-item', { item })"
      />
    </div>
    <div class="col-12 col-sm-6 col-md-4 mt-1 pe-sm-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputINN"
          v-model.trim="item.inn"
          @change="$emit('save-item', { item })"
        />
        <label for="inputINN">ИНН</label>
      </form>
    </div>
    <div class="col-12 col-sm-6 col-md-4 mt-1 ps-sm-1 pe-md-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputKPP"
          v-model.trim="item.kpp"
          @change="$emit('save-item', { item })"
        />
        <label for="inputKPP">КПП</label>
      </form>
    </div>
    <div class="col-12 col-sm-6 col-md-4 mt-1 ps-md-1 pe-sm-0 pe-md-3">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputOGRN"
          v-model.trim="item.ogrn"
          @change="$emit('save-item', { item })"
        />
        <label for="inputOGRN">ОГРН</label>
      </form>
    </div>
    <div class="col-12 col-sm-6 col-md-4 mt-1 ps-sm-1 ps-md-3 pe-md-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputBIC"
          v-model.trim="item.bic"
          @change="$emit('save-item', { item })"
        />
        <label for="inputBIC">БИК</label>
      </form>
    </div>
    <div class="col-12 col-sm-6 col-md-4 mt-1 ps-md-1 pe-sm-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputRS"
          v-model.trim="item.rs"
          @change="$emit('save-item', { item })"
        />
        <label for="inputRS">Р/С</label>
      </form>
    </div>
    <div class="col-10 col-sm-5 col-md-3 mt-1 ps-sm-1 pe-1">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputKS"
          v-model.trim="item.ks"
          @change="$emit('save-item', { item })"
        />
        <label for="inputKS">К/С</label>
      </form>
    </div>
    <div class="col-2 col-sm-1 col-md-1 d-flex text-end mt-1 ps-0">
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