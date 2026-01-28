import { sendJson } from "../utils/response.js";

export async function getHealth(req, res) {
  const data = { status: "ok" };
  sendJson(res, data);
}

export async function getTime(req, res) {
  const data = { time: new Date().toISOString() };
  sendJson(res, data);
}
