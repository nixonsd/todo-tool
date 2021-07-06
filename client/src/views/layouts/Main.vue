<template>
    <div>
        <app-loader />
        <div v-cloak>
            <app-navbar />
            <div class="container">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            
        }),
    }
</script>

<style lang="scss">
    $primary-color: color('red', 'darken-1') !default;
    $secondary-color: color('pink', 'darken-1');
    $background-color: color(255, 255, 255) !default;

    [v-cloak] {
        display: none;
    }
</style>