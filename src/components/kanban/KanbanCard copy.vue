<template>
  <div>
    <span class="small">{{ item.title }}</span>
    <div class="text-muted font-monospace small border-top mt-2 pt-2">
      <div>
        Создан:
        {{
          new Date(item.dateCreate).toLocaleDateString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }}
      </div>
      <div>
        Срок:&nbsp;&nbsp;
        {{
          new Date(item.dateForReady).toLocaleDateString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }}
      </div>

      <span v-if="item.polka">Полка:&nbsp;&nbsp;{{ item.polka }}</span>
      <span v-if="item.type === 'order'"
        >Сумма:&nbsp;&nbsp;<span
          class="bg-secondary rounded text-white ps-2 pe-2"
          >{{ getItogSum() }}</span
        ></span
      >
    </div>
  </div>
</template>

<script>
import { getArraySum } from '@/scripts/getArraySum'
import { formatMoney } from '@/scripts/formatMoney'

export default {
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