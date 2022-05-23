<template>
  <div class="row">
    <div class="col-12">
      <ul class="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
        <li
          v-for="(tab, index) in materialTabs"
          :key="tab.id"
          class="nav-item"
          role="presentation"
        >
          <button
            class="nav-link rounded-0 small"
            :class="{ active: index === 0 }"
            :id="'pills-' + tab.alias + '-tab'"
            data-bs-toggle="pill"
            :data-bs-target="'#pills-' + tab.alias"
            type="button"
            role="tab"
            :aria-controls="'pills-' + tab.alias"
            :aria-selected="{ true: index === 0 }"
          >
            {{ tab.title }}
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          v-for="(tab, index) in materialTabs"
          :key="tab.id"
          class="tab-pane fade"
          :class="{ 'show active': index === 0 }"
          :id="'pills-' + tab.alias"
          role="tabpanel"
          :aria-labelledby="'pills-' + tab.alias + '-tab'"
          tabindex="0"
        >
          <component :is="'Tab' + tab.aliasUp" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from 'bootstrap/js/dist/tab'
import { materialTabs } from './../../data/materialTabs'

import TabPrice from './TabPrice.vue'
import TabModification from './TabModification.vue'
import TabPostavshiki from './TabPostavshiki.vue'
import TabZakup from './TabZakup.vue'
import TabRealization from './TabRealization.vue'

export default {
  components: {
    TabPrice,
    TabModification,
    TabPostavshiki,
    TabZakup,
    TabRealization
  },
  props: ['item'],
  data() {
    return {
      materialTabs
    }
  }
}
</script>

<style scoped>
.nav-link {
  color: #212529;
  background-color: #bccee4;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #313a46;
}
</style>