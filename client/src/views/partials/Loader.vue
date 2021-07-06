<template>
    <div class="app-loader white">
        <div class="preloader-wrapper active">
            <div class="spinner-layer spinner-red-only">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div><div class="gap-patch">
                <div class="circle"></div>
            </div><div class="circle-clipper right">
                <div class="circle"></div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        mounted: () => {
            setTimeout(() => {
                $('.app-loader').fadeOut().delay("slow");
            }, 1000);
        }
    }
</script>

<style lang="scss" scoped>
    .app-loader {
        top: 0;
        left: 0;
        content: '';
        display: flex;
        position: absolute;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }
</style>