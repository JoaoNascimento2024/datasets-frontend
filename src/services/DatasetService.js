import { api } from "./api";

export class DatasetService {
  static async getAll() {
    try {
      const response = await api.get("/datasets", {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("@Auth:token").replace(/(^"|"$)/g, ""),
        },
      });

      if (response.name === "AxiosError") {
        throw new Error(response);
      }

      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  static async getById(id) {
    try {
      const response = await api.get(`/datasets/${id}`, {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("@Auth:token").replace(/(^"|"$)/g, ""),
        },
      });

      if (response.name === "AxiosError") {
        throw new Error(response);
      }

      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }


  static async getByUser(id) {
    try {
      const response = await api.get(`/datasets/user/${id}`, {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("@Auth:token").replace(/(^"|"$)/g, ""),
        },
      });

      if (response.name === "AxiosError") {
        throw new Error(response);
      }

      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  static async create(data) {

    try {
      const response = await api.post(
        "/datasets", data,
        {
          headers: {
            Authorization:
              "Bearer " +
              localStorage.getItem("@Auth:token").replace(/(^"|"$)/g, ""),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.name === "AxiosError") {
        throw new Error(response);
      }

      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }


  static async delete(id) {
    try {
      const response = await api.delete(`/datasets/${id}`, {
        headers: {
          Authorization:
            "Bearer " +
            localStorage.getItem("@Auth:token").replace(/(^"|"$)/g, ""),
        },
      });

      if (response.name === "AxiosError") {
        throw new Error(response);
      }

      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}
