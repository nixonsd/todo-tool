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
                    <div class="card">
                        <div class="card-content">
                            <div class="row fixed-row">
                                <div class="col s10">
                                    <label>
                                        <input @change="completeTask(index)" type="checkbox" class="filled-in" v-model="task.completed" />
                                        <span>
                                            <p v-if="!task.completed" class="task-title">{{ task.title }}</p>
                                            <p v-else class="crossed-title task-title">{{ task.title }}</p>
                                            <p class="task-date">Created: {{ getFormatedDate(task.createdAt) }} 
                                                (Modified: {{ getFormatedDate(task.modifiedAt) }})</p>
                                        </span>
                                    </label>
                                </div>
                                <div class="col s2">
                                    <i class="right material-icons task-option" style="color: red; cursor: pointer;" @click="deleteTask(index)">close</i>
                                    <i class="right material-icons task-option" style="cursor: pointer;">edit</i>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <p v-else>Nothing to see here</p>
        </div>
        <div class="loader row" v-else>
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
        
    </div>
</template>

<script>
    import PostService from '../PostService'
    import AddForm from "./partials/AddForm.vue"

    export default {
        components: { AddForm },
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
                const temp = {
                    title, 
                    completed: false,
                    createdAt: new Date(),
                    modifiedAt: new Date()
                }
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
                    await PostService.changeTask(this.tasks[id])
                } catch (err) { console.error(err) }
            },

            getFormatedDate(date) {
                const temp = new Date(date)
                return new Intl.DateTimeFormat('en-US', {
                    // weekday: 'long',
                    year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit', hour12: false,
                }).format(temp);
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

    .fixed-row {
        margin: 0;
    }

    .task-title {
        color: rgb(0, 0, 0);
        font-size: 1.5rem;
        padding-bottom: 0.2rem;
    }

    .task-title.crossed-title {
        text-decoration: line-through;
        color : grey;
    }

    .task-option {
        user-select: none;
    }

    .task-date {
        font-size: 0.8rem;
        line-height: 1.2rem;
    }

    .tasks-list {
        margin: 1.3rem 0;
    }

    .add-button {
        margin-top: .2rem;
    }
</style>
