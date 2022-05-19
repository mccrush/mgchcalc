<template>
  <div class="modal-body pt-2">
    <div class="row">
      <div class="col-12 col-md-5 pe-md-0">
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
      <div class="col-12 col-sm-6 col-md-4 mt-2 mt-md-0 pe-md-0">
        <div class="input-group h-100 mb-3">
          <input
            class="form-control"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Заказчик..."
            v-model="clientTitle"
            @change="$emit('update-item-title', clientTitle)"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon3"
            @click="clientTitle = ''"
          >
            -
          </button>
          <button
            class="btn btn-outline-success"
            type="button"
            id="button-addon2"
            @click.prevent="$emit('show-modal-customer')"
          >
            +
          </button>
        </div>
        <datalist id="datalistOptions">
          <option
            v-for="client in customers"
            :key="client.id"
            :value="client.title"
          ></option>
        </datalist>
      </div>
      <div class="col-12 col-sm-6 col-md-3 mt-2 mt-md-0">
        <div class="form-floating">
          <select
            v-model="item.status"
            @change="$emit('update-item-status', item)"
            class="form-select"
            id="statusOrder"
            :disabled="mod === 'create'"
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
    <div v-if="item.siryoArray && item.siryoArray.length">
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
              >{{ formatMoneyFromSum(elem.summa) }}</span
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
    <div v-if="item.siryoArray && item.siryoArray.length" class="row">
      <div class="col-12 text-end pt-2">
        <span class="badge bg-light text-dark align-self-center p-2"
          >Итого: {{ itogSum(item.siryoArray) }}</span
        >
      </div>
    </div>
    <!-- rabotaArray -->
    <div v-if="item.rabotaArray && item.rabotaArray.length">
      <h6 class="mt-3">Услуги обработки</h6>
      <div class="list-group ist-group-numbered">
        <ModalBodyOrderNafrezerItem
          v-for="(elem, index) in item.rabotaArray"
          :key="elem.id"
          :item="elem"
          :type="item.type"
          :mod="mod"
          :checkvalue="isChecked(elem.id)"
          @change="selectRabotaItem(elem, index)"
        />
      </div>
      <div v-if="item.rabotaArray && item.rabotaArray.length" class="row">
        <div class="col-12 text-end pt-2">
          <span class="badge bg-light text-dark align-self-center p-2"
            >Итого: {{ itogSum(item.rabotaArray) }}</span
          >
        </div>
      </div>
      <div v-if="mod === 'edit'" class="row pt-2">
        <div class="col-6 col-md-9"></div>
        <div class="col-6 col-md-3">
          <button
            class="btn btn-sm btn-outline-success w-100"
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
    <div v-if="item.dopuslugArray && item.dopuslugArray.length">
      <h6 class="mt-3">Дополнительные услуги</h6>
      <ul class="list-group ist-group-numbered">
        <ModalBodyOrderList v-for="elem in item.dopuslugArray" :key="elem.id">
          <template v-slot:title
            >{{ elem.title }}, {{ elem.size }} {{ elem.ed }}</template
          >
          <template v-slot:badge>
            <span class="badge bg-light text-dark align-self-center me-2 p-2">{{
              formatMoneyFromSum(elem.summa)
            }}</span>
          </template>
          <template v-slot:button> </template>
        </ModalBodyOrderList>
      </ul>
    </div>
    <div v-if="item.dopuslugArray && item.dopuslugArray.length" class="row">
      <div class="col-12 text-end pt-2">
        <span class="badge bg-light text-dark align-self-center p-2"
          >Итого: {{ itogSum(item.dopuslugArray) }}</span
        >
      </div>
    </div>

    <ModalBodyFiles v-if="mod === 'edit'" :item="item" />
  </div>
</template>

<script>
import voronkaOrders from './../../data/voronkaOrders'
import { getArraySum } from './../../scripts/getArraySum'
import { formatMoney } from './../../scripts/formatMoney'

import ModalBodyOrderNafrezerItem from './ModalBodyOrderNafrezerItem.vue'
import ModalBodyOrderList from './ModalBodyOrderList.vue'
import ModalBodyFiles from './ModalBodyFiles.vue'

export default {
  components: {
    ModalBodyOrderNafrezerItem,
    ModalBodyOrderList,
    ModalBodyFiles
  },
  props: ['item', 'mod'],
  emits: [
    'update-item',
    'update-item-title',
    'update-item-status',
    'update-item-datefinish',
    'create-tz',
    'show-modal-customer'
  ],
  data() {
    return {
      voronkaOrders,
      clientTitle: this.item.title ? this.item.title.split('_')[0] : '',
      //clientTitle: '',
      rabotaArrayTZ: []
    }
  },
  computed: {
    contact() {
      return this.$store.getters.contact
    },
    company() {
      return this.$store.getters.company
    },
    customers() {
      return this.contact.concat(this.company)
    }
  },
  methods: {
    formatMoneyFromSum(sum) {
      return formatMoney(sum)
    },
    itogSum(array) {
      return formatMoney(getArraySum(array))
    },
    createTZ() {
      // Обновить item в БД
      this.$store.dispatch('updateItemRT', { item: this.item })
      this.$emit('create-tz', this.rabotaArrayTZ)
      // Очистить массив this.rabotaArrayTZ
      this.rabotaArrayTZ = []
      console.log(
        'ModalBodyOrder: createTZ() this.rabotaArrayTZ:',
        this.rabotaArrayTZ
      )
    },
    isChecked(id) {
      if (this.rabotaArrayTZ.find(elem => elem.id === id)) {
        return true
      } else {
        return false
      }
    },
    selectRabotaItem(rabota, index) {
      if (this.item.type === 'order') {
        if (!this.rabotaArrayTZ.find(elem => elem.id === rabota.id)) {
          this.item.rabotaArray[index].status = 'inprogress'
          this.rabotaArrayTZ.push(rabota)
        } else {
          this.item.rabotaArray[index].status = 'newfrezer'
          this.rabotaArrayTZ = this.rabotaArrayTZ.filter(
            elem => elem.id != rabota.id
          )
        }

        console.log(
          'ModalBodyOrder: selectRabotaItem() this.rabotaArrayTZ:',
          this.rabotaArrayTZ
        )
      }
    }
  },
  watch: {
    item(n, o) {
      console.log('item is Update')
      this.clientTitle = this.item.title ? this.item.title.split('_')[0] : ''
    }
  }
}
</script>