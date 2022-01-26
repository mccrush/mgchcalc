<template>
  <div class="modal-body pt-2">
    <div class="row">
      <div class="col-6 pe-0">
        <div class="form-floating">
          <input
            type="text"
            class="form-control form-control-sm"
            id="orderTitle"
            v-model.trim="order.title"
            placeholder="Название заказа"
            @change="$emit('update-object', order)"
          />
          <label for="orderTitle">Название заказа</label>
        </div>
      </div>
      <div class="col-3 pe-0">
        <div class="form-floating">
          <select
            v-model="client"
            @change="$emit('update-order-title', client)"
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
            v-model="order.status"
            @change="$emit('update-order-status', order)"
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
            @change="$emit('update-object', order)"
            type="datetime-local"
            id="date"
            class="form-control form-control-sm"
            v-model="order.dateCreate"
          />
          <label for="date">Создан</label>
        </div>
      </div>
      <div class="col-4">
        <div class="form-floating">
          <input
            @change="$emit('update-object', order)"
            type="datetime-local"
            id="date"
            class="form-control form-control-sm"
            v-model="order.dateForReady"
          />
          <label for="date">Срок сдачи</label>
        </div>
      </div>
      <div class="col-4 ps-0">
        <div class="form-floating">
          <input
            @change="$emit('update-object-datefinish', order)"
            type="datetime-local"
            id="date"
            class="form-control form-control-sm"
            v-model="order.dateFinish"
          />
          <label for="date">Завершен</label>
        </div>
      </div>
    </div>

    <!-- -->
    <div v-if="order.siryoArray.length">
      <h6 class="mt-3">Материалы</h6>
      <ul class="list-group ist-group-numbered">
        <ModalBodyOrderList v-for="elem in order.siryoArray" :key="elem.id">
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
    <!-- order.rabotaArray -->
    <!-- <div v-if="order.rabotaArray.length || nafrezer.length"> -->
    <div>
      <h6 class="mt-3">Услуги обработки</h6>
      <div class="list-group ist-group-numbered">
        <ModalBodyOrderNafrezerItem
          v-for="item in order.rabotaArray"
          :key="item.id"
          :item="item"
          @change="selectItem(item)"
        />
      </div>
      <div class="row pt-2">
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-3">
          <button
            class="btn btn-sm btn-info w-100"
            :class="{ disabled: !rabotaArrayTZ.length }"
            @click="createTZ"
          >
            Создать ТЗ
          </button>
        </div>
      </div>
    </div>
    <!-- -->
    <div v-if="order.dopuslugArray.length">
      <h6 class="mt-3">Дополнительные услуги</h6>
      <ul class="list-group ist-group-numbered">
        <ModalBodyOrderList v-for="elem in order.dopuslugArray" :key="elem.id">
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
  props: ['order', 'mod'],
  emits: [
    'update-object',
    'update-order-title',
    'update-order-status',
    'update-object-datefinish',
    'create-tz'
  ],
  data() {
    return {
      voronkaOrders,
      clients,
      client: this.order.client,
      rabotaArrayTZ: []
    }
  },
  computed: {
    nafrezer() {
      return []
      if (this.$store.getters.nafrezer.length) {
        return this.$store.getters.nafrezer.filter(
          item => item.orderId === this.order.id
        )
      }
    }
  },
  methods: {
    createTZ() {
      this.$emit('create-tz', this.rabotaArrayTZ)
    },
    selectItem(item) {
      if (!this.rabotaArrayTZ.find(elem => elem.id === item.id)) {
        this.rabotaArrayTZ.push(item)
      } else {
        this.rabotaArrayTZ = this.rabotaArrayTZ.filter(
          elem => elem.id != item.id
        )
      }

      console.log('Select elements:', this.rabotaArrayTZ)
    }
  }
}
</script>