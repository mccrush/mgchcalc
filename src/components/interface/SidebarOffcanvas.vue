<template>
  <div class="sidebar d-flex flex-column justify-content-between pt-3">
    <ul class="nav flex-column ps-2 pe-2">
      <li class="nav-item">
        <button
          v-if="userId"
          class="
            btn-sidebar
            text-start
            d-flex
            align-items-center
            btn
            w-100
            pt-2
            pb-2
          "
          :class="{ 'btn-sidebar-active': pathname === 'calc' }"
          @click="setPathName('calc')"
          data-bs-dismiss="offcanvas"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-calculator"
            viewBox="0 0 16 16"
          >
            <path
              d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"
            />
            <path
              d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4z"
            />
          </svg>
          <span class="ms-3">Калькулятор</span>
        </button>
      </li>
      <li class="nav-item" v-if="userData">
        <button
          v-if="userData.role === '1' || userData.role === '2'"
          class="
            btn-sidebar
            text-start
            d-flex
            align-items-center
            btn
            w-100
            pt-2
            pb-2
          "
          :class="{ 'btn-sidebar-active': pathname === 'order' }"
          @click="setPathName('order')"
          data-bs-dismiss="offcanvas"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-bookmark-star"
            viewBox="0 0 16 16"
          >
            <path
              d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z"
            />
            <path
              d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
            />
          </svg>
          <span class="ms-3">Заказы</span>
        </button>
      </li>
      <li class="nav-item">
        <button
          v-if="userId"
          class="
            btn-sidebar
            text-start
            d-flex
            align-items-center
            btn
            w-100
            pt-2
            pb-2
          "
          :class="{ 'btn-sidebar-active': pathname === 'nafrezer' }"
          @click="setPathName('nafrezer')"
          data-bs-dismiss="offcanvas"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-boxes"
            viewBox="0 0 16 16"
          >
            <path
              d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"
            />
          </svg>
          <span class="ms-3">На Фрезер</span>
        </button>
      </li>
      <li v-if="userData" class="nav-item">
        <button
          v-if="userData.role === '1'"
          class="
            btn-sidebar
            text-start
            d-flex
            align-items-center
            btn
            w-100
            pt-2
            pb-2
          "
          :class="{ 'btn-sidebar-active': pathname === 'admin' }"
          @click="setPathName('admin')"
          data-bs-dismiss="offcanvas"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-sliders"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
            />
          </svg>
          <span class="ms-3">Админка</span>
        </button>
      </li>
      <li class="nav-item">
        <button
          v-if="userId"
          class="
            btn-sidebar
            text-start
            d-flex
            align-items-center
            btn
            w-100
            pt-2
            pb-2
          "
          :class="{ 'btn-sidebar-active': pathname === 'users' }"
          @click="setPathName('users')"
          data-bs-dismiss="offcanvas"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
            />
          </svg>
          <span class="small ms-3">Пользователи</span>
        </button>
      </li>
      <li v-if="userData" class="nav-item">
        <button
          v-if="userData.role === '1'"
          class="
            btn-sidebar
            text-start
            d-flex
            align-items-center
            btn
            w-100
            pt-2
            pb-2
          "
          :class="{ 'btn-sidebar-active': pathname === 'backup' }"
          @click="setPathName('backup')"
          data-bs-dismiss="offcanvas"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-download"
            viewBox="0 0 16 16"
          >
            <path
              d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
            />
            <path
              d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
            />
          </svg>
          <span class="ms-3">Бэкап</span>
        </button>
      </li>
    </ul>

    <ul class="nav flex-column ps-2 pe-2">
      <li class="nav-item border-top border-secondary">
        <a
          v-if="userId"
          class="
            btn-sidebar
            text-start
            d-flex
            align-items-center
            btn
            w-100
            pt-1
            pb-1
          "
          href="https://github.com/mccrush/mgchcalc/releases"
          target="_blank"
          title="Посмотреть историю изменений"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-tag"
            viewBox="0 0 16 16"
          >
            <path
              d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z"
            />
            <path
              d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z"
            /></svg
          ><small class="ms-2">Версия v{{ version }}</small></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { version } from '@/../package.json'

export default {
  data() {
    return {
      version
    }
  },
  computed: {
    pathname() {
      return this.$store.getters.pathname
    },
    userId() {
      return this.$store.getters.userId
    },
    userData() {
      return this.$store.getters.userData
    }
  },
  methods: {
    setPathName(path) {
      this.$store.commit('setPath', path)
    }
  }
}
</script>

<style scoped>
.sidebar {
  height: calc(100vh - 62px);
  background-color: #313a46;
}

.btn-sidebar {
  color: #8391a2;
  transition: color 0.3s ease;
}

.btn-sidebar:hover,
.btn-sidebar:active {
  color: #bccee4;
}

.btn-sidebar-active {
  color: #fff;
}
</style>