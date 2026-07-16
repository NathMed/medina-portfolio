// Bootstrap and Bootstrap Icons
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import 'notyf/notyf.min.css';
import './assets/main.css'

import App from './App.vue'

// PAGES
import ProjectPage from './pages/ProjectPage.vue';
import LandingPage from './pages/LandingPage.vue';
import ContactPage from './pages/ContactPage.vue';

// ROUTES
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'LandingPage',
            component: LandingPage
        },
        {
            path: '/projects',
            name: 'ProjectPage',
            component: ProjectPage
        },
        {
            path: '/contact',
            name: 'ContactPage',
            component: ContactPage
        }
    ]
});

const app = createApp(App);

app.use(createPinia());

app.use(router);
app.mount('#app');