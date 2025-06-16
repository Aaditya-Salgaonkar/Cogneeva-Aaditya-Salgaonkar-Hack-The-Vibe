const  supabase  = require("../services/supabase");
const { generateCodeFromAI } = require("../services/aiService");

exports.generateMVP = async (req, res) => {
  try {
    const { userId, prompt, projectName } = req.body;

    if (!userId || !prompt || !projectName) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    console.log("Prompt received:\n", prompt);

const filesStructured = await generateCodeFromAI(prompt);
   const { data, error } = await supabase
  .from("mvps")
  .insert([
    {
      user_id: userId,
      name: projectName,
      prompt,
      files:filesStructured
    },
  ]);



    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ success: false, message: "Database insert failed" });
    }

    res.status(200).json({
      success: true,
      message: "MVP generated successfully",
      files: filesStructured,
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ success: false, message: "MVP generation failed" });
  }
};
