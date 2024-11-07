import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import DashboardTarefa from './views/DashboardTarefa.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';


const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
    icons: {
        defaultSet: 'mdi',
        aliases: {
            'v-icon': 'mdi',
        },
        sets: {
            mdi: {
                iconfont: 'mdi',
            },
        },
    },
    },
});

const routes = [
    { path: '/', component: DashboardTarefa },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app');
