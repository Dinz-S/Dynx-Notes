"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "dnyx_notes_v1";

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setNotes(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (!title && !content) return;
    const newNote = {
      id: Math.random().toString(36).slice(2),
      title,
      content,
      createdAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    router.push(`/notes/${newNote.id}`);
  };

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <form onSubmit={addNote} className="space-y-3 border p-4 rounded">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Content"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2 rounded">Add</button>
      </form>

      <input
        className="w-full border p-2 rounded"
        placeholder="Search..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      <ul className="space-y-3">
        {filtered.map((n)=>(
          <li key={n.id} className="border p-4 rounded">
            <h3 className="font-semibold">{n.title}</h3>
            <p className="text-sm text-gray-600">{n.content.slice(0,80)}...</p>
            <Link href={`/notes/${n.id}`} className="underline text-sm">View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
