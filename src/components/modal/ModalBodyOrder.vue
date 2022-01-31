<template>
  <div class="modal-body pt-2">
    <div class="row">
      <div class="col-6 pe-0">
        <div class="form-floating">
          <input
            type="text"
            class="form-control form-control-sm"
            id="itemTitle"
            v-model.trim="item.title"
            placeholder="Название заказа"
            @change="$emit('update-item', item)"
          />
          <label for="itemTitle">Название заказа</label>
        </div>
      </div>
      <div class="col-3 pe-0">
        <div class="form-floating">
          <select
            v-model="client"
            @change="$emit('update-item-title', client)"
            class="form-select"
            id="selectClient"
          >
            <option
              v-for="client in clients"
              :key="client.id"
              :value="client.title"
            >
              {{ client.title }}
            </option>
          </select>
          <label for="selectClient">Заказчик</label>
        </div>
      </div>
      <div class="col-3">
        <div class="form-floating">
          <select
            v-model="item.status"
            @change="$emit('update-item-status', item)"
            class="form-select"
            id="statusOrder"
          >
            <option
              v-for="status in voronkaOrders"
              :key="status.id"
              :value="status.alias"
            >
              {{ status.title }}
            </option>
          </select>
          <label for="statusOrder">Статус</label>
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

    <!-- -->
    <div v-if="item.siryoArray.length">
      <h6 class="mt-3">Материалы</h6>
      <ul class="list-group ist-group-numbered">
        <ModalBodyOrderList v-for="elem in item.siryoArray" :key="elem.id">
          <template v-slot:title
            >{{ elem.title }}, {{ elem.dlina }} x {{ elem.shirina }} =
            {{ elem.size }} {{ elem.ed }}</template
          >
          <template v-slot:badge>
            <span
              v-if="elem.our"
              class="badge bg-light text-dark align-self-center me-2 p-2"
              >{{ elem.summa }} ₽</span
            >
            <span
              v-else
              class="badge bg-warning text-dark align-self-center me-2 p-2"
              >Дата поставки:
              {{
                new Date(elem.dateDelivery).toLocaleDateString('ru-RU')
              }}</span
            >
          </template>
          <template v-slot:button> </template>
        </ModalBodyOrderList>
      </ul>
    </div>
    <div v-if="item.rabotaArray.length">
      <h6 class="mt-3">Услуги обработки</h6>
      <div class="list-group ist-group-numbered">
        <ModalBodyOrderNafrezerItem
          v-for="elem in item.rabotaArray"
          :key="elem.id"
          :item="elem"
          :mod="mod"
          @change="selectRabotaItem(elem)"
        />
      </div>
      <div v-if="mod === 'edit'" class="row pt-2">
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-3">
          <button
            class="btn btn-sm btn-info w-100"
            data-bs-dismiss="modal"
            :class="{ disabled: !rabotaArrayTZ.length }"
            @click="createTZ"
          >
            Создать ТЗ
          </button>
        </div>
      </div>
    </div>
    <!-- -->
    <div v-if="item.dopuslugArray">
      <h6 class="mt-3">Дополнительные услуги</h6>
      <ul class="list-group ist-group-numbered">
        <ModalBodyOrderList v-for="elem in item.dopuslugArray" :key="elem.id">
          <template v-slot:title
            >{{ elem.title }}, {{ elem.size }} {{ elem.ed }}</template
          >
          <template v-slot:badge>
            <span class="badge bg-light text-dark align-self-center me-2 p-2"
              >{{ elem.summa }} ₽</span
            >
          </template>
          <template v-slot:button> </template>
        </ModalBodyOrderList>
      </ul>
    </div>
  </div>
</template>

<script>
import voronkaOrders from '@/data/voronkaOrders'
import clients from '@/data/clients'
import ModalBodyOrderNafrezerItem from '@/components/modal/ModalBodyOrderNafrezerItem'
import ModalBodyOrderList from '@/components/modal/ModalBodyOrderList'

export default {
  components: {
    ModalBodyOrderNafrezerItem,
    ModalBodyOrderList
  },
  props: ['item', 'mod'],
  emits: [
    'update-item',
    'update-item-title',
    'update-item-status',
    'update-item-datefinish',
    'create-tz'
  ],
  data() {
    return {
      voronkaOrders,
      clients,
      client: this.item.client,
      rabotaArrayTZ: []
    }
  },
  methods: {
    createTZ() {
      this.$emit('create-tz', this.rabotaArrayTZ)
    },
    selectRabotaItem(rabota) {
      if (!this.rabotaArrayTZ.find(elem => elem.id === rabota.id)) {
        this.rabotaArrayTZ.push(rabota)
      } else {
        this.rabotaArrayTZ = this.rabotaArrayTZ.filter(
          elem => elem.id != rabota.id
        )
      }

      console.log('Select elements:', this.rabotaArrayTZ)
    }
  }
}
</script>