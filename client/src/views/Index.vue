<template>
    <div>
        <blockquote>
            <h4>New task</h4>
        </blockquote>

        <keep-alive @new-task-added="addTask">
            <component :is="component"/>
        </keep-alive>

        <h5>List of tasks</h5>
        <div v-if="!loader">
            <div class="tasks-list" v-if="tasks.length > 0">
                <div :key="task._id" v-for="(task, index) in tasks">
                    <app-task 
                        :title="task.title" 
                        :completed="task.completed"
                        :createdAt="new Date(task.createdAt)"
                        :modifiedAt="new Date(task.modifiedAt)"
                        @task-completed="completeTask(index)"
                        @task-delete="deleteTask(index)" />
                </div>
            </div>
            <p v-else>Nothing to see here</p>
        </div>
        <app-loader class="loader row" v-else/>
    </div>
</template>

<script>
    import PostService from '../PostService'
    import AddForm from "./partials/AddForm.vue"
    import Task from './partials/Task.vue'

    export default {
        components: { 'app-task': Task, AddForm },
        data: () => ({
            loader: true,
            component: 'AddForm',
            tasks: []
        }),
        async created () {
            try {
                this.tasks = await PostService.getTasks()
                this.loader = false
            } catch (err) { console.error(err) }
        },
        methods: {
            async addTask(title) {
                const temp = { title, completed: false, createdAt: new Date(), modifiedAt: new Date() }
                try {
                    await PostService.addTask(temp)
                    this.tasks.push(temp);
                } catch (err) { console.error(err) }
            },

            async deleteTask(id) {
                try {
                    await PostService.deleteTask(this.tasks[id]._id)
                    this.tasks.splice(id, 1);
                } catch(err) { console.error(err) }
            },

            async completeTask(id) {
                try {
                    this.tasks[id].modifiedAt = new Date()
                    this.tasks[id].completed = !this.tasks[id].completed
                    await PostService.changeTask(this.tasks[id])
                } catch (err) { console.error(err) }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .loader {
        display: flex;
        justify-content: center;
        margin-top: 5rem;
    }

    .tasks-list {
        margin: 1.3rem 0;
    }
</style>
