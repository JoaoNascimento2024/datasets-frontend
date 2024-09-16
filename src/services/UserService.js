import { api } from "./api";

export class UserService {

    static async getAll() {
        try {
            const response = await api.get("/users");

            if (response.name === 'AxiosError') {
                console.log(response);
                throw new Error(response);
                
            }

            return response;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async create({ username, email, password }) {
        try {
            const response = await api.post("/users", {
                username,
                email,
                password,
            });

            if (response.name === 'AxiosError') {
                throw new Error(response);
            }

            return response;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}