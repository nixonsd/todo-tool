<template>
    <div>
        <form method="POST" action="/" @submit.prevent="submitHandler">
            <div class="row">
                <div class="input-field col m10 s12">
                    <i class="material-icons prefix" style="user-select: none;">library_add</i>
                    <input placeholder="Write your task" v-model.trim="title" id="new_task" type="text">
                    <label for="new_task" style="user-select: none;">Add Task</label>
                </div>

                <button class="add-button waves-effect red darken-1 btn-large col m2 s12">
                    <i class="right material-icons">add</i>Add New
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                title: ''
            }
        },

        methods: {
            submitHandler() {
                this.$emit('new-task-added', this.title);
                this.title = '';
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>