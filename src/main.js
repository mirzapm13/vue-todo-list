import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import vueClickOutsideElement from 'vue-click-outside-element'

const vuetify = createVuetify({
  components,
  directives,
})

import "./assets/styles.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify)
app.use(vueClickOutsideElement)

app.mount("#app");
