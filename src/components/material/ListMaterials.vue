<template>
  <ul class="list-group">
    <li
      v-for="material in materials"
      :key="material.id"
      class="
        list-group-item
        d-sm-flex
        justify-content-between
        align-items-center
        lh-1
        p-1
        ps-3
        pe-2
      "
    >
      <span class="small">{{ material.title }}</span>
      <div class="d-flex align-items-center mt-1 mt-sm-0">
        <span class="badge text-dark me-2">
          {{ material.ed }}
        </span>
        <span class="badge text-dark border border-success me-2">
          {{ material.price }}
        </span>
        <span class="badge text-dark border border-warning me-2">{{
          Math.ceil(material.price + (material.price * groupNacenka) / 100)
        }}</span>
        <ButtonEdit class="my-btn-hide border-0 me-1 disabled" />
        <ButtonTrash
          class="my-btn-hide border-0"
          @click="removeMaterial(material.type, material.id)"
        />
      </div>
    </li>
  </ul>
</template>

<script>
import ButtonEdit from './../buttons/ButtonEdit.vue'
import ButtonTrash from './../buttons/ButtonTrash.vue'
export default {
  components: {
    ButtonEdit,
    ButtonTrash
  },
  props: ['materials', 'groupNacenka'],
  methods: {
    removeMaterial(type, id) {
      if (confirm('Действительно удалить?')) {
        this.$store.dispatch('removeItem', { type, id })
      }
    }
  }
}
</script>