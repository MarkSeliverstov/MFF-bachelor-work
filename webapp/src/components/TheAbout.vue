<template>
    <div>
        <h1>About</h1>
        <p>
            This is website was created for visualizing annotations and entities 
            from Entity Inspector extension server. It is built with Vue 3 and 
            Vite. It fetches data from a REST API and displays it in a 
            user-friendly way. So, you can easily see the structure of the 
            entities and their annotations from your project.
        </p>
    </div>
</template>

<style scoped>

div {
    /* Make div centre vertical and hostizontal */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    margin: -10rem 5rem;
}

p {
    text-align: center;
    font-size: 1.5rem;
    margin-top: 2rem;
}
</style>

