<template>
    <div>
        <blockquote>
            <h4>New task</h4>
        </blockquote>

        <form method="POST" action="/" @submit.prevent>
            <div class="row">
                <div class="input-field col m10 s12">
                    <i class="tiny material-icons prefix">text_fields</i>
                    <input placeholder="Write your task" id="new_task" type="text" class="validate">
                    <label for="new_task">Add Task</label>
                </div>

                <button class="add-button waves-effect red darken-1 btn-large col m2 s12">
                    <i class="right material-icons">add</i>Add New Item
                </button>
            </div>
        </form>

        <h5>List of tasks</h5>
        <div class="tasks-list" v-if="tasks.length > 0">
            <div class="col s12" :key="task.id" v-for="(task) in tasks" @click.left="task.completed=!task.completed">
                <div class="card">
                    <div class="card-content">
                        <label>
                            <input type="checkbox" class="filled-in" v-model="task.completed" />
                            <span>
                                <p class="task-title">{{ task.title }}</p>
                                <p class="task-date">Created: {{task.createdAt}} (Modified: {{task.modifiedAt}})</p>
                            </span>
                        </label>
                        <i class="right material-icons" style="color: red">close</i>
                        <i class="right material-icons">edit</i>
                    </div>
                </div>

            </div>
        </div>
        <p v-else>Nothing to see here</p>
        
    </div>
</template>

<script>
    export default {
       data: () => ({
           tasks: [{
               id: 0,
               title: 'Book the room',
               completed: true,
               createdAt: '12/02/2021 19:28',
               modifiedAt: '13/02/2021 07:21'
           }, {
               id: 1,
               title: 'Have a camp',
               completed: false,
               createdAt: '12/02/2021 19:28',
               modifiedAt: '13/02/2021 07:21'
           }, {
               id: 2,
               title: 'Have a lunch',
               completed: false,
               createdAt: '12/02/2021 19:28',
               modifiedAt: '13/02/2021 07:21'
           }, {
               id: 3,
               title: 'Write a code',
               completed: false,
               createdAt: '12/02/2021 19:28',
               modifiedAt: '13/02/2021 07:21'
           }]
       })
    }
</script>

<style lang="scss" scoped>
    .task-date {
        margin-top: 0.3rem;
        font-size: 0.8rem;
    }

    .task-title {
        color: rgb(0, 0, 0);
        font-size: 1.5rem;
    }

    .tasks-list {
        margin: 1.3rem 0;
    }

    .add-button {
        margin-top: .2rem;
    }
</style>
