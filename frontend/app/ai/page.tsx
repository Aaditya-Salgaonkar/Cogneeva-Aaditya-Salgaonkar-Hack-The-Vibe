"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import ReactMarkdown from 'react-markdown';

interface Message {
  sender: 'user' | 'ai';
  message: string;
}

interface Conversation {
  id: string;
  prompt?: string;
  created_at: string;
}

interface BackendMessage {
  id: string;
  conversationId: string;
  sender: 'user' | 'ai';
  message: string;
  created_at: string;
}

export default function GaluxiumChat() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/");
        return;
      }
      setUserId(session.user.id);
    };
    fetchUser();
  }, [router]);

  const fetchMessages = async (convId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${convId}`);
      const data = await res.json();
      if (data.success) {
        const formattedMessages = data.messages.map((msg: BackendMessage) => ({
          sender: msg.sender,
          message: msg.message
        }));
        setMessages(formattedMessages);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load chat history");
    }
  };

  const fetchConversations = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/conversation/list/${userId}`);
      const data = await res.json();
      if (data.success) setConversations(data.conversations);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load conversations");
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchConversations();
    }
  }, [userId, fetchConversations]);

  const startNewConversation = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/conversation/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.conversationId) {
        setConversationId(data.conversationId);
        setMessages([]);
        await fetchConversations();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to start conversation");
    }
  }, [userId, fetchConversations]);

  // 🟢 Automatically start new chat on page load
  useEffect(() => {
    if (userId && !conversationId) {
      startNewConversation();
    }
  }, [userId, conversationId, startNewConversation]);

  const sendMessage = async () => {
    if (!input.trim() || !conversationId || !userId) return;

    const userMessage: Message = { sender: "user", message: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          prompt: userMessage.message,
          userId,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      const aiMessage: Message = { sender: "ai", message: data.aiResponse };
      setMessages((prev) => [...prev, aiMessage]);

      // 🟢 Only update conversation title if it's first user message
      if (messages.length === 0) {
        await fetch(`http://localhost:5000/api/conversation/update-title/${conversationId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: userMessage.message }),
        });
        await fetchConversations();
      }
    } catch (err) {
      console.error(err);
      toast.error("AI failed to respond");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-700">
        Galuxium AI Chat
      </h1>

      <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl p-6 flex h-[80vh] border border-gray-200">
        {/* Sidebar panel */}
        <div className="w-1/4 border-r pr-4 overflow-y-auto">
          <h2 className="font-bold mb-4 text-lg">My Conversations:</h2>
          <ul className="space-y-3">
            {conversations.map(conv => (
              <li
                key={conv.id}
                className={`p-3 rounded-xl text-sm font-semibold cursor-pointer transition-all ${conv.id === conversationId ? "bg-blue-100" : "hover:bg-gray-100"}`}
                onClick={() => { setConversationId(conv.id); fetchMessages(conv.id); }}
              >
                {conv.prompt ? conv.prompt.slice(0, 40) + (conv.prompt.length > 40 ? "..." : "") : "New Chat"}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat panel */}
        <div className="flex-1 flex flex-col pl-4">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-10 text-lg italic">
                Start chatting with Galuxium AI ✨
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`my-3 p-4 rounded-xl max-w-[80%] ${msg.sender === 'user' ? 'ml-auto bg-gradient-to-r from-blue-100 to-purple-100 text-gray-900' : 'mr-auto bg-gray-100 text-gray-700'}`}>
                <strong>{msg.sender === 'user' ? "You" : "Galuxium AI"}:</strong> <ReactMarkdown >
                  {msg.message}</ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div className="flex justify-center items-center p-4">
                <div className="w-24 h-24">
                  <Loading />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 border-2 border-blue-300 focus:border-purple-400 rounded-xl p-4 text-lg transition-all"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50 transition-all"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
