import axios from "axios";

const url = "/api/tasks/";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "/";

class PostService {
  /**
   * Get tasks
   * @returns Array of tasks
   */
  static async getTasks() {
    try {
      const response = await axios
        .get(url)
        .catch((err) => console.log(err.message));
      const data = response.data;
      data.map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt),
        modifiedAt: new Date(post.modifiedAt),
      }));
      return data;
    } catch (err) {
      console.log(err.message);
    }
  }

  /**
   * Add new task
   * @param {title: String, createdAt: Date, modifiedAt: Date} object
   */
  static async addTask(object) {
    const response = await axios.post(url, object).catch((err) => {
      console.log(err.message);
    });
    return response.data;
  }

  /**
   * Delete the task
   * @param id id of task
   */
  static async deleteTask(id) {
    await axios.delete(`${url}${id}`).catch((err) => {
      console.log(err.message);
    });
  }

  /**
   * Change the task
   * @param id id of task
   */
  static async changeTask(object) {
    await axios.put(url, object).catch((err) => {
      console.log(err.message);
    });
  }
}

export default PostService;
