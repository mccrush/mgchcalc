<template>
  <div class="row mt-3">
    <div class="col-12 col-sm-6 pe-sm-0">
      <input
        type="text"
        class="form-control form-control-sm"
        placeholder="Название банка"
        v-model.trim="item.title"
      />
    </div>
    <div class="col-12 col-sm-6">
      <input
        type="text"
        class="form-control form-control-sm"
        placeholder="Адрес банка"
        v-model.trim="item.address"
      />
    </div>
    <div class="col-12 col-md-6 col-lg-2 mt-1 pe-md-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputINN"
          v-model.trim="item.inn"
        />
        <label for="inputINN">ИНН</label>
      </form>
    </div>
    <div class="col-12 col-md-6 col-lg-2 mt-1 pe-lg-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputKPP"
          v-model.trim="item.kpp"
        />
        <label for="inputKPP">КПП</label>
      </form>
    </div>
    <div class="col-12 col-md-6 col-lg-2 mt-1 pe-md-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputOGRN"
          v-model.trim="item.ogrn"
        />
        <label for="inputOGRN">ОГРН</label>
      </form>
    </div>
    <div class="col-12 col-md-6 col-lg-2 mt-1 pe-lg-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputBIC"
          v-model.trim="item.bic"
        />
        <label for="inputBIC">БИК</label>
      </form>
    </div>
    <div class="col-12 col-md-6 col-lg-2 mt-1 pe-md-0">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputRS"
          v-model.trim="item.rs"
        />
        <label for="inputRS">Р/С</label>
      </form>
    </div>
    <div class="col-12 col-md-6 col-lg-2 mt-1">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputKS"
          v-model.trim="item.ks"
        />
        <label for="inputKS">К/С</label>
      </form>
    </div>
    <div class="col-12 mt-2">
      <div class="d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-secondary me-2"
          data-bs-dismiss="modal"
        >
          Отмена
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-2"
          @click="item = {}"
        >
          Очистить поля
        </button>
        <button
          type="button"
          class="btn btn-success"
          data-bs-dismiss="modal"
          @click="$emit('add-customer', item)"
          :disabled="!item.title"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      item: {}
    }
  }
}
</script>