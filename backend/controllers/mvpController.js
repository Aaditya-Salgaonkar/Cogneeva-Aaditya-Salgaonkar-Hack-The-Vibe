const fs = require('fs');
const supabase = require("../services/supabase");
const { generateSaaSCode } = require('../services/aiService');
const path = require('path');
const { cleanDirectory, writeFiles, createZip } = require('../services/fileService');

// MVP Generation Handler
exports.generateMVP = async (req, res) => {
  try {
    const { userId, prompt, projectName } = req.body;
    if (!userId || !prompt || !projectName) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    console.log("Prompt received:\n", prompt);

    const filesStructured = await generateSaaSCode(prompt);

    // Use outputs directory outside backend folder
    const outputRoot = path.resolve(__dirname, '../../outputs');
    if (!fs.existsSync(outputRoot)) fs.mkdirSync(outputRoot, { recursive: true });

    const projectDir = path.join(outputRoot, projectName);
    const zipFile = path.join(outputRoot, `${projectName}.zip`);

    cleanDirectory(projectDir);
    writeFiles(filesStructured, projectDir);
    await createZip(projectDir, zipFile);

    const { data, error } = await supabase
      .from("mvps")
      .insert([{ user_id: userId, name: projectName, prompt, files: filesStructured }]);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ success: false, message: "Database insert failed" });
    }

    res.status(200).json({
      success: true,
      message: "MVP generated successfully",
      files: filesStructured,
      download_url: `/api/mvp/download/${projectName}`
    });

  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ success: false, message: "MVP generation failed" });
  }
};

// ZIP Download Handler
exports.downloadZip = (req, res) => {
  const { projectName } = req.params;
  
  // Correct path to match outputs directory location
  const zipPath = path.resolve(__dirname, '../../outputs', `${projectName}.zip`);

  // Optional: add file existence check for safety
  if (!fs.existsSync(zipPath)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.download(zipPath);
};
