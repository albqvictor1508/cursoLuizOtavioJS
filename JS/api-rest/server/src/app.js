import "./db/index";
import { resolve } from "node:path";

import express from "express";
import TokenRoutes from "./routes/TokenRoutes";
import UserRoutes from "./routes/UserRoutes";
import homeRoutes from "./routes/HomeRoutes";
import AlunoRoutes from "./routes/AlunoRoutes";
import PhotoRoutes from "./routes/PhotoRoutes";

class App {
	constructor() {
		this.app = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.static(resolve(__dirname, "uploads")));
	}

	routes() {
		this.app.use("/", homeRoutes);
		this.app.use("/token", TokenRoutes);
		this.app.use("/user", UserRoutes);
		this.app.use("/student", AlunoRoutes);
		this.app.use("/photos/", PhotoRoutes);
	}
}

export default new App().app;
