<template>
  <div class="modal-body pt-2">
    <div class="row">
      <div class="col-12 col-md-5 pe-md-0">
        <div class="form-floating">
          <input
            type="text"
            class="form-control form-control-sm"
            id="nafrezerTitle"
            disabled="true"
            v-model.trim="item.title"
            placeholder="Название заказа"
            @change="$emit('update-item', item)"
          />
          <label for="nafrezerTitle">Название работы</label>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-4 d-flex mt-2 mt-md-0 pe-md-0">
        <form class="form-floating">
          <input
            type="text"
            class="form-control"
            id="client"
            placeholder="Заказчик не указан"
            :value="item.client"
            readonly
          />
          <label for="client">Заказчик</label>
        </form>
      </div>
      <div class="col-12 col-sm-6 col-md-3 mt-2 mt-md-0">
        <div class="form-floating">
          <select
            v-model="item.status"
            @change="$emit('update-item-status', item)"
            class="form-select"
            id="nafrezerStatus"
          >
            <option
              v-for="status in voronkaNafrezer"
              :key="status.id"
              :value="status.alias"
            >
              {{ status.title }}
            </option>
          </select>
          <label for="nafrezerStatus">Статус</label>
        </div>
      </div>
    </div>

    <div class="row pt-2">
      <div class="col-12 col-md-4 pe-md-0">
        <div class="form-floating">
          <input
            @change="$emit('update-item', item)"
            type="datetime-local"
            id="date"
            class="form-control form-control-sm"
            v-model="item.dateCreate"
          />
          <label for="date">Создан</label>
        </div>
      </div>
      <div class="col-12 col-md-4 mt-2 mt-md-0">
        <div class="form-floating">
          <input
            @change="$emit('update-item', item)"
            type="datetime-local"
            id="date"
            class="form-control form-control-sm"
            v-model="item.dateForReady"
          />
          <label for="date">Срок сдачи</label>
        </div>
      </div>
      <div class="col-12 col-md-4 mt-2 mt-md-0 ps-md-0">
        <div class="form-floating">
          <input
            @change="$emit('update-item-datefinish', item)"
            type="datetime-local"
            id="date"
            class="form-control form-control-sm"
            v-model="item.dateFinish"
          />
          <label for="date">Завершен</label>
        </div>
      </div>
    </div>
    <!-- -->
    <div v-if="item.rabotaArray.length">
      <h6 class="mt-3">Услуги обработки</h6>
      <div class="list-group ist-group-numbered">
        <ModalBodyOrderNafrezerItem
          v-for="elem in item.rabotaArray"
          :key="elem.id"
          :item="elem"
          :type="item.type"
        />
      </div>
    </div>
    <!-- -->
    <div class="row pt-2">
      <div class="col-12 d-flex justify-content-end">
        <span class="badge bg-light text-success align-self-center p-2"
          >Итого ЗП: {{ itogoZP }} ₽</span
        >
      </div>
    </div>
    <div v-if="mod === 'edit'" class="row mt-2">
      <div class="col-7 col-sm-9 col-md-10 col-lg-2 text-end lh-lg">
        Лежит на полке:
      </div>
      <div class="col-5 col-sm-3 col-md-2">
        <select
          class="form-select form-select-sm"
          v-model.number="item.polka"
          @change="$emit('update-item-polka', item)"
        >
          <option :value="0">---</option>
          <option v-for="num in 10" :key="'id' + num" :value="num">
            {{ num }}
          </option>
        </select>
      </div>
    </div>
    <ModalBodyFiles :item="item" />
  </div>
</template>

<script>
import voronkaNafrezer from '@/data/voronkaNafrezer'
import ModalBodyOrderNafrezerItem from '@/components/modal/ModalBodyOrderNafrezerItem'
import ModalBodyFiles from '@/components/modal/ModalBodyFiles'

export default {
  components: {
    ModalBodyOrderNafrezerItem,
    ModalBodyFiles
  },
  props: ['item', 'mod'],
  emits: [
    'update-item',
    'update-item-status',
    'update-item-datefinish',
    'update-item-polka'
  ],
  computed: {
    itogoZP() {
      return this.item.rabotaArray
        .map(item => {
          return Math.floor(item.summa * 0.4)
        })
        .reduce((pre, next) => pre + next)
    }
  },
  data() {
    return {
      voronkaNafrezer
    }
  }
}
</script>