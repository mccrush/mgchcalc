<template>
  <div class="modal-body pt-2">
    <div class="row">
      <div class="col-6 pe-0">
        <input
          type="text"
          class="form-control form-control-sm disabled"
          v-model.trim="order.title"
          placeholder="Название заказа"
          @change="$emit('update-item', order)"
        />
      </div>
      <div class="col-3 pe-0">
        <!-- <select
          v-model="client"
          @change="$emit('update-order-title', client)"
          class="form-select form-select-sm"
        >
          <option
            v-for="client in clients"
            :key="client.id"
            :value="client.title"
          >
            {{ client.title }}
          </option>
        </select> -->
      </div>
      <div class="col-3">
        <select
          v-model="order.status"
          @change="$emit('update-order-status', order)"
          class="form-select form-select-sm"
        >
          <option
            v-for="status in etaps"
            :key="status.id"
            :value="status.alias"
          >
            {{ status.title }}
          </option>
        </select>
      </div>
    </div>

    <div class="row pt-2">
      <div class="col-4 pe-0">
        <div class="form-floating">
          <input
            @change="$emit('update-item', order)"
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
            @change="$emit('update-item', order)"
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
            @change="$emit('update-item', order)"
            type="datetime-local"
            id="date"
            class="form-control form-control-sm"
            v-model="order.dateFinish"
          />
          <label for="date">Завершен</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import voronkaNafrezer from '@/data/voronkaNafrezer'

export default {
  components: {},
  props: ['order', 'mod'],
  data() {
    return {}
  },
  computed: {
    etaps() {
      return voronkaNafrezer
    }
  }
}
</script>