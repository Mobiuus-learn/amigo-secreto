import { requestInterceptor } from "./utils/requestInterceptor";
// import "dotenv/config";
// import express from "express";
const express = require("express");
// import cors from "cors";
const cors = require("cors");
import https from "node:https";
import http from "node:http";
import fs from "node:fs";

import siteRoutes from "./routes/site";
import adminRoutes from "./routes/admin";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestInterceptor);

app.use("/admin", adminRoutes);
app.use("/", siteRoutes);

const runServer = (port: number, server: http.Server) => {
	server.listen(port, () => {
		console.log(`🚀 Server running on port ${port}`);
	});
};

const regularServer = http.createServer(app);
if (process.env.NODE_ENV === "production") {
	const options = {
		key: fs.readFileSync(process.env.SSL_KEY as string),
		cert: fs.readFileSync(process.env.SSL_CERT as string),
	};

	const secServer = https.createServer(options, app);

	runServer(80, regularServer);
	runServer(443, secServer);
} else {
	const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
	runServer(serverPort, regularServer);
}
