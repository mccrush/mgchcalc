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
    </div>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style scoped>
</style>