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
        <div
          v-if="item.type === 'order'"
          class="d-flex align-items-center w-50 mt-2"
        >
          <Cash />
          <span class="fw-bold ms-1">{{ getItogSum() }}</span>
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
import { getArraySum } from '@/scripts/getArraySum'
import { formatMoney } from '@/scripts/formatMoney'

import CalendarPlus from '@/components/icons/CalendarPlus.vue'
import Clock from '@/components/icons/Clock.vue'
import Cash from '@/components/icons/Cash.vue'
import Inbox from '@/components/icons/Inbox.vue'

export default {
  components: {
    CalendarPlus,
    Clock,
    Cash,
    Inbox
  },
  props: ['item'],
  methods: {
    getItogSum() {
      let sum = 0
      let prioritet = false
      if (this.item.siryoArray) {
        sum += getArraySum(this.item.siryoArray)
      }
      if (this.item.rabotaArray) {
        sum += getArraySum(this.item.rabotaArray)
      }
      if (this.item.dopuslugArray) {
        sum += getArraySum(this.item.dopuslugArray)

        if (this.item.dopuslugArray.some(ss => ss === 'x2')) {
          prioritet = true
        }
      }

      if (prioritet) {
        return formatMoney(sum * 2)
      } else {
        return formatMoney(sum)
      }
    }
  }
}
</script>

<style scoped>
</style>