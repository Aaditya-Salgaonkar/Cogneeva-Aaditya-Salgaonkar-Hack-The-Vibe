"use client";

import React, { useState } from "react";
import { Switch } from "@headlessui/react";

export default function AILabPage() {
  const [temperature, setTemperature] = useState(0.4);
  const [maxTokens, setMaxTokens] = useState(3000);
  const [strictFormat, setStrictFormat] = useState(true);
  const [includeAuth, setIncludeAuth] = useState(true);
  const [engineInstructions, setEngineInstructions] = useState("");

  const models = [
    "gpt-4o",
    "gpt-4-turbo",
    "claude-3-opus",
    "mistral-8x7b",
    "gemini-1.5-pro",
  ];
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const codeQuality = ["Basic", "Professional", "Enterprise", "Industry-grade"];
  const [selectedQuality, setSelectedQuality] = useState(codeQuality[2]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#F8FAFC] to-[#E2E8F0] p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl py-3 mb-5 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA]">
          Code Finetuning Studio (Coming Soon...)
        </h1>
        {/* Standalone controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Model */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold mb-3 text-indigo-700">AI Model</h3>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500"
            >
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Code Quality */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold mb-3 text-indigo-700">Code Quality</h3>
            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500"
            >
              {codeQuality.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          {/* Creativity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold mb-3 text-indigo-700">
              Creativity (Temperature)
            </h3>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="mt-2 text-center font-semibold">
              {temperature.toFixed(2)}
            </div>
          </div>

          {/* Max Tokens */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold mb-3 text-indigo-700">Max Tokens</h3>
            <input
              type="number"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500"
            />
          </div>

          {/* Strict Format */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
            <span className="font-semibold text-indigo-700">
              Strict Parsing Format
            </span>
            <Switch
              checked={strictFormat}
              onChange={setStrictFormat}
              className={`${
                strictFormat ? "bg-indigo-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  strictFormat ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>

          {/* Include Auth */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
            <span className="font-semibold text-indigo-700">
              Include Authentication
            </span>
            <Switch
              checked={includeAuth}
              onChange={setIncludeAuth}
              className={`${
                includeAuth ? "bg-indigo-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  includeAuth ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>

          {/* Engine Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-6 col-span-full">
            <h3 className="font-semibold mb-3 text-indigo-700">
              Advanced Engine Instructions
            </h3>
            <textarea
              rows={5}
              value={engineInstructions}
              onChange={(e) => setEngineInstructions(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500"
              placeholder="Optional: Give your own instructions to fine-tune AI behavior"
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-10">
          <button className="w-full py-4 rounded-2xl font-bold text-xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:scale-105 transition-all">
            Fine Tune AI Model
          </button>
        </div>
      </div>
    </div>
  );
}
