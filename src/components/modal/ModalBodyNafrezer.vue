<template>
  <div class="modal-body pt-2">
    <div class="row">
      <div class="col-6 pe-0">
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
      <div class="col-3 pe-0"></div>
      <div class="col-3">
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
      <div class="col-4 pe-0">
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
      <div class="col-4">
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
      <div class="col-4 ps-0">
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
    <div class="row pt-2">
      <div class="col-6 pe-0">
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
      <div class="col-6">
        <form class="form-floating">
          <input
            type="text"
            class="form-control"
            id="izdelie"
            placeholder="Изделие не указано"
            :value="item.title"
            readonly
          />
          <label for="izdelie">Изделие</label>
        </form>
      </div>
    </div>
    <div class="row pt-2">
      <div class="col-3 pe-0">
        <form class="form-floating">
          <input
            type="text"
            class="form-control"
            id="size"
            placeholder="Размеры не указаны"
            :value="item.size + ' ' + item.ed"
            readonly
          />
          <label for="size">Размеры</label>
        </form>
      </div>
      <div class="col-3 pe-0">
        <form class="form-floating">
          <input
            type="text"
            class="form-control"
            id="price"
            placeholder="Цена не указана"
            :value="item.price"
            readonly
          />
          <label for="price">Цена, ₽</label>
        </form>
      </div>
      <div class="col-3 pe-0">
        <form class="form-floating">
          <input
            type="text"
            class="form-control"
            id="summa"
            placeholder="Стоимость не указана"
            :value="item.summa"
            readonly
          />
          <label for="summa">Стоимость, ₽</label>
        </form>
      </div>
      <div class="col-3">
        <form class="form-floating">
          <input
            type="text"
            class="form-control"
            id="zp"
            placeholder="ЗП не указана"
            :value="Math.floor(item.summa * 0.4)"
            readonly
          />
          <label for="zp">ЗП, ₽</label>
        </form>
      </div>
    </div>
    <div v-if="mod === 'edit'" class="row mt-2">
      <div class="col-4"></div>
      <div class="col-4"></div>
      <div class="col-2 text-end lh-lg">Лежит на полке:</div>
      <div class="col-2">
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
  </div>
</template>

<script>
import voronkaNafrezer from '@/data/voronkaNafrezer'

export default {
  props: ['item', 'mod'],
  emits: [
    'update-item',
    'update-item-status',
    'update-item-datefinish',
    'update-item-polka'
  ],
  data() {
    return {
      voronkaNafrezer
    }
  }
}
</script>