"use client";

import { useState } from "react";

export default function BlogEditor({ onSubmit }: any) {
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<any[]>([]);

  const addTextBlock = () => {
    setBlocks([...blocks, { type: "text", value: "" }]);
  };

  const addImageBlock = () => {
    setBlocks([...blocks, { type: "image", value: "" }]);
  };

  const updateBlock = (index: number, value: string) => {
    const updated = [...blocks];
    updated[index].value = value;
    setBlocks(updated);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSubmit({ title, content: blocks });
  };

  return (
    <div className="p-6 space-y-4">
      <input
        className="w-full border p-2 text-xl font-bold"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {blocks.map((block, index) => (
        <div key={index} className="space-y-2 border p-3 rounded">
          {block.type === "text" && (
            <textarea
              className="w-full border p-2"
              placeholder="Write text..."
              value={block.value}
              onChange={(e) => updateBlock(index, e.target.value)}
            />
          )}

          {block.type === "image" && (
            <input
              className="w-full border p-2"
              placeholder="Paste image URL"
              value={block.value}
              onChange={(e) => updateBlock(index, e.target.value)}
            />
          )}

          <button
            className="text-red-500 text-sm"
            onClick={() => removeBlock(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex gap-3">
        <button onClick={addTextBlock} className="bg-blue-500 text-white px-3 py-1">
          + Text
        </button>

        <button onClick={addImageBlock} className="bg-green-500 text-white px-3 py-1">
          + Image
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2"
      >
        Publish Blog
      </button>
    </div>
  );
}