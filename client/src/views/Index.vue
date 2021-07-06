<template>
    <div>
        <h3>New task</h3>

        <form method="POST" action="/" @submit.prevent>
            <div class="row">
                <div class="input-field col s11">
                    <i class="material-icons prefix">text_fields</i>
                    <input id="new_task" type="text" class="validate">
                    <label for="new_task">Last Name</label>
                </div>

                <button class="add-button waves-effect red darken-4 btn-large col">
                    <i class="material-icons">add</i>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
       
    }
</script>

<style lang="scss" scoped>
    .add-button {
        margin-top: .2rem;
    }
</style>