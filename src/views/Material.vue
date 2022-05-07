<template>
  <div class="width-960 bg-white shadow-sm rounded-3 mt-4 m-auto p-3 pb-1">
    <!-- <div class="row">
      <div class="col-12 col-md-4 col-lg-2">Группа</div>
      <div class="col-12 col-md-8 col-lg-10">Материал</div>
    </div> -->
    <div class="row">
      <div class="col-12 col-md-4 col-lg-3 border">
        <ListMaterialGroups />
      </div>
      <div class="col-12 col-md-8 col-lg-9 border">
        <!-- <ListMaterials /> -->
      </div>
    </div>
  </div>
</template>

<script>
import ListMaterialGroups from './../components/material/ListMaterialGroups.vue'

export default {
  components: {
    ListMaterialGroups
  }
}
</script>