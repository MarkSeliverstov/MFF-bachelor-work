<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <header>
        <nav>
            <router-link to="/" exact>Home</router-link>
            <router-link to="/entities">Entities</router-link>
            <router-link to="/annotations">Annotations</router-link>
        </nav>
    </header>
    <RouterView />
</template>

<style>

h1 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 2rem;
    text-transform: uppercase;
    font-weight: 900;
}

nav {
    display: block;
    width: 100%;
    font-size: 18px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 2rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}
</style>
