<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="row fixed-row">
          <div class="col s10" style="white-space: pre-wrap;">
            <label>
              <input
                @change="$emit('taskCompleted')"
                type="checkbox"
                class="filled-in"
                :checked="completed"
              />
              <span>
                <p class="task-title" :class="isCheckedStyle" v-if="!isActive">
                  {{ title }}
                </p>
                <form @submit.prevent="onSubmit" v-else>
                  <div class="input-field">
                    <input
                      id="task-title"
                      class="task-title"
                      ref="task-title"
                      :value="title"
                      placeholder="Edit your task..."
                      @blur="isActive = false"
                    />
                    <label for="task-title" class="task-label">Edit Task</label>
                  </div>
                </form>
                <p class="task-date">
                  Created: {{ getFormatedDate(createdAt) }} (Modified:
                  {{ getFormatedDate(modifiedAt) }})
                </p>
              </span>
            </label>
          </div>
          <div class="col s2">
            <i
              class="right material-icons task-option"
              style="color: red; cursor: pointer;"
              @click="$emit('taskDelete')"
              >close</i
            >
            <i
              class="right material-icons task-option"
              style="cursor: pointer;"
              @click.prevent="onEditClick"
              v-if="!isActive"
              >edit</i
            >
            <i
              class="right material-icons task-option green-text"
              style="cursor: pointer;"
              @mousedown="onSubmit"
              v-else
              >check</i
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";

export default {
  data: () => ({
    isActive: false,
  }),
  emit: {
    taskCompleted: null,
    taskDelete: null,
    updateTitle: null,
  },
  props: {
    title: { type: String, required: true },
    completed: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    modifiedAt: { type: Date, required: true },
  },
  computed: {
    isCheckedStyle() {
      return this.completed ? "crossed-title" : "";
    },
  },
  methods: {
    getFormatedDate(date) {
      return new Intl.DateTimeFormat("en-US", {
        // weekday: 'long',
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date);
    },
    onEditClick() {
      this.isActive = true;
      M.updateTextFields();
      this.$nextTick(() => {
        if (this.isActive) this.$refs["task-title"].focus();
      });
    },
    onSubmit() {
      const value = this.$refs["task-title"].value;
      if (value === this.title || value.length < 1) return;
      this.$emit("updateTitle", value);
      this.isActive = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.task-title {
  color: rgb(0, 0, 0);
  font-size: 1.5rem;
  padding-bottom: 0.2rem;
  overflow-wrap: anywhere;
}

.btn-option {
  cursor: pointer;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  background-color: transparent;
}

.task-label {
  font-size: 0.8rem;
  top: -2rem;
}

.task-title.crossed-title {
  text-decoration: line-through;
  color: grey;
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
