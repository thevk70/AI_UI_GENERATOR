import express from "express";
import { plannerAgent } from "../agents/planner.js";
import { generatorAgent } from "../agents/generator.js";
import { explainerAgent } from "../agents/explainer.js";
import { validateComponents } from "../validators/componentValidator.js";
import { saveVersion, getVersions } from "../memory/versionStore.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const versions = getVersions();
    const existingCode =
      versions.length > 0 ? versions[versions.length - 1].code : null;

    const intentType = existingCode ? "MODIFY_UI" : "NEW_UI";

    const plan = await plannerAgent({
      userPrompt: prompt,
      existingCode,
      intentType,
    });

    const code = await generatorAgent({
      plan,
      existingCode,
      intentType,
    });

    validateComponents(code);

    const explanation = await explainerAgent(plan, code);
    const version = saveVersion(code, explanation);

    res.json({
      intentType,
      plan,
      version,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
