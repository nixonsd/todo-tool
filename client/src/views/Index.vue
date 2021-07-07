<template>
    <div>
        <blockquote>
            <h4>New task</h4>
        </blockquote>

        <keep-alive @new-task-added="addTask">
            <component :is="component"/>
        </keep-alive>

        <h5>List of tasks</h5>
        <div class="tasks-list" v-if="tasks.length > 0">
            <div class="col s12" :key="task.title" v-for="(task) in tasks">
                <div class="card">
                    <div class="card-content">
                        <label>
                            <input type="checkbox" class="filled-in" v-model="task.completed" />
                            <span>
                                <p v-if="!task.completed" class="task-title">{{ task.title }}</p>
                                <p v-else class="crossed-title task-title">{{ task.title }}</p>
                                <p class="task-date">Created: {{ getFormatedDate(task.createdAt) }} (Modified: {{ getFormatedDate(task.modifiedAt) }})</p>
                            </span>
                        </label>
                        <i class="right material-icons task-option" style="color: red">close</i>
                        <i class="right material-icons task-option">edit</i>
                    </div>
                </div>

            </div>
        </div>
        <p v-else>Nothing to see here</p>
        
    </div>
</template>

<script>
    import AddForm from "./partials/AddForm.vue"

    export default {
        components: { AddForm },
        data: () => ({
            component: 'AddForm',
            tasks: []
        }),
        methods: {
            addTask (title) {
                this.tasks.push({
                    title, 
                    completed: false,
                    createdAt: new Date(),
                    modifiedAt: new Date()
                });
            },

            getFormatedDate(date) {
                return new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit', hour12: false,
                }).format(date);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .task-title {
        color: rgb(0, 0, 0);
        font-size: 1.5rem;
    }

    .task-title.crossed-title {
        text-decoration: line-through;
        color : grey;
    }

    .task-option {
        user-select: none;
    }

    .task-date {
        margin-top: 0.3rem;
        font-size: 0.8rem;
    }

    .tasks-list {
        margin: 1.3rem 0;
    }

    .add-button {
        margin-top: .2rem;
    }
</style>
