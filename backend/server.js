const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const mvpRoutes = require("./routes/mvp");
app.use("/api/mvp", mvpRoutes);
const aiRoutes = require("./routes/aiRoutes");
app.use('/api/ai', aiRoutes);

const chatRoutes = require("./routes/chatRoutes");
const conversationRoutes = require("./routes/conversationRoutes");

app.use("/api/chat", chatRoutes);
app.use("/api/conversation", conversationRoutes);
const messageRoutes = require("./routes/messageRoutes");
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
