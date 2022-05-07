<template>
  <div class="width-960 bg-white shadow-sm rounded-3 mt-4 m-auto p-3">
    <!-- <div class="row">
      <div class="col-12 col-md-4 col-lg-2">Группа</div>
      <div class="col-12 col-md-8 col-lg-10">Материал</div>
    </div> -->
    <div class="row">
      <div class="col-12 col-md-4 col-lg-3">
        <ListMaterialGroups
          v-model:groupId="groupId"
          v-model:groupNacenka="groupNacenka"
          v-model:groupOthody="groupOthody"
        />
      </div>
      <div class="col-12 col-md-8 col-lg-9 ps-md-0">
        <span class="small"
          >Наценка группы: {{ groupNacenka }}%, норма отхода:
          {{ groupOthody }}%</span
        >
        <hr class="mt-2" />
        <ListMaterials :materials="materials" :groupNacenka="groupNacenka" />
      </div>
    </div>
  </div>
</template>

<script>
import ListMaterialGroups from './../components/material/ListMaterialGroups.vue'
import ListMaterials from './../components/material/ListMaterials.vue'

export default {
  components: {
    ListMaterialGroups,
    ListMaterials
  },
  data() {
    return {
      groupId: null,
      groupNacenka: 0,
      groupOthody: 0
    }
  },
  computed: {
    materials() {
      // console.log('this.groupId = ', this.groupId)
      if (this.groupId) {
        return this.$store.getters.material.filter(
          item => item.categoryId === this.groupId
        )
      } else {
        return []
      }
    }
  }
}
</script>