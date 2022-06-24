<template>
  <div>
    <span class="small">{{ item.title }}</span>
    <div class="text-muted small border-top mt-2 pt-2">
      <div class="d-flex">
        <div class="d-flex align-items-end w-50">
          <CalendarPlus />
          <span class="ms-1">
            {{
                new Date(item.dateCreate).toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit'
                })
            }}
          </span>
        </div>
        <div class="d-flex align-items-end w-50">
          <Clock />
          <span class="ms-1">
            {{
                new Date(item.dateForReady).toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit'
                })
            }}
          </span>
        </div>
      </div>

      <div class="d-flex">
        <div v-if="item.type === 'order'" class="d-flex align-items-center w-50 mt-2">
          <Cash />
          <!-- <span class="fw-bold ms-1">{{ getItogSum() }}</span
          ><br /> -->
          <span class="fw-bold ms-1">{{ formatMoney(item.summa) }}</span>
        </div>
        <div v-if="item.polka" class="d-flex align-items-center w-50 mt-2">
          <Inbox />
          <span class="ms-2"> {{ item.polka }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatMoney } from './../../scripts/formatMoney'

import CalendarPlus from './../icons/CalendarPlus.vue'
import Clock from './../icons/Clock.vue'
import Cash from './../icons/Cash.vue'
import Inbox from './../icons/Inbox.vue'

export default {
  components: {
    CalendarPlus,
    Clock,
    Cash,
    Inbox
  },
  props: ['item'],
  methods: {
    formatMoney
  }
}
</script>
