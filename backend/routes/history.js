import express from "express";
import { getVersions, getVersionById } from "../memory/versionStore.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(getVersions());
});

router.get("/:id", (req, res) => {
  const version = getVersionById(Number(req.params.id));
  if (!version) {
    return res.status(404).json({ error: "Version not found" });
  }
  res.json(version);
});

export default router;
