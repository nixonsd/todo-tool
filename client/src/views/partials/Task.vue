<template>
    <div>
        <div class="card">
            <div class="card-content">
                <div class="row fixed-row">
                    <div class="col s10">
                        <label>
                            <input @change="$emit('task-completed')" type="checkbox"
                                class="filled-in" :checked="completed"/>
                            <span>
                                <p v-if="!completed" class="task-title">{{ title }}</p>
                                <p v-else class="crossed-title task-title">{{ title }}</p>
                                <p class="task-date">Created: {{ getFormatedDate(createdAt) }} 
                                    (Modified: {{ getFormatedDate(modifiedAt) }})</p>
                            </span>
                        </label>
                    </div>
                    <div class="col s2">
                        <i class="right material-icons task-option" 
                            style="color: red; cursor: pointer;"
                            @click="$emit('task-delete')">close</i>
                        <i class="right material-icons task-option"
                            style="cursor: pointer;">edit</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        emit: ['task-completed', 'task-delete'],
        props: {
            title: { type: String, required: true },
            completed: {type: Boolean, required: true },
            createdAt: {type: Date, required: true},
            modifiedAt: {type: Date, required: true}
        },
        methods: {
            getFormatedDate(date) {
                return new Intl.DateTimeFormat('en-US', {
                    // weekday: 'long',
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

    .fixed-row {
        margin: 0;
    }
</style>