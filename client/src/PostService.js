import axios from "axios";

const url = "http://localhost:3000/api/tasks/";

class PostService {
  /**
   * Get tasks
   * @returns Array of tasks
   */
  static async getTasks() {
    try {
      const res = await axios.get(url);
      const data = res.data;
      data.map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt),
        modifiedAt: new Date(post.modifiedAt),
      }));
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Add new task
   * @param {title: String, createdAt: Date, modifiedAt: Date} object
   */
  static async addTask(object) {
    await axios.post(url, object).catch((err) => {
      console.log(err);
    });
  }

  /**
   * Delete the task
   * @param id id of task
   */
  static async deleteTask(id) {
    await axios.delete(`${url}${id}`).catch((err) => {
      console.log(err);
    });
  }

  /**
   * Change the task
   * @param id id of task
   */
  static async changeTask(object) {
    await axios.put(url, object).catch((err) => {
      console.log(err);
    });
  }
}

export default PostService;
