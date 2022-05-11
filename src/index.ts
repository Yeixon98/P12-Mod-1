/**
 * Inicializa la API
 */

import Server from "./server";

const app = new Server(5001);

app.start()