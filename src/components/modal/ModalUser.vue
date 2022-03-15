<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-xl modal-fullscreen-xl-down modal-dialog-centered
      "
    >
      <div v-if="user" class="modal-content border-0 bg-light shadow-lg">
        <div class="modal-header">
          <h6 class="modal-title">Пользователь</h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body bg-white">
          <div class="row">
            <div class="col-12 col-md-4">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="userName"
                  placeholder="Имя"
                  ref="userName"
                  v-model.trim="user.name"
                  @change="saveUserData"
                />
                <label for="userName">Имя</label>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <div class="form-floating">
                <select
                  class="form-select"
                  id="userRole"
                  aria-label="Выбор прав доступа"
                  v-model="user.role"
                  @change="saveUserData"
                >
                  <option
                    v-for="role in roles"
                    :key="role.id"
                    :value="role.role"
                  >
                    {{ role.title }}
                  </option>
                </select>
                <label for="userRole">Права доступа</label>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="userPhone"
                  placeholder="+7 900 900 10 20"
                  v-model.trim="user.phone"
                  @change="saveUserData"
                />
                <label for="userPhone">Телефон</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between p-2">
          <p>Данные сохраняются автоматически</p>
          <div>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { roles } from '@/data/roles'

export default {
  props: ['user'],
  data() {
    return {
      roles
    }
  },
  methods: {
    saveUserData() {
      if (this.user.name) {
        this.user.roleTitle = this.getRoleTitle(this.user.role)
        this.$store.commit('setUserData', this.user)
        this.$store.dispatch('updateItem', { item: this.user })
      }
    },
    getRoleTitle(role) {
      return this.roles.find(item => item.role === role).title
    }
  }
}
</script>