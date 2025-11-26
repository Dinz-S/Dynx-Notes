"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "dnyx_notes_v1";

export default function ViewNote({ params }) {
  const { id } = params;
  const [note, setNote] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const list = JSON.parse(raw);
    const found = list.find((n)=>n.id===id);
    setNote(found);
  }, [id]);

  if (!note) return <p>Note not found</p>;

  return (
    <div className="space-y-3 border p-4 rounded">
      <h2 className="text-xl font-semibold">{note.title}</h2>
      <p className="whitespace-pre-wrap">{note.content}</p>
      <Link href="/notes" className="underline text-sm">Back to all notes</Link>
    </div>
  );
}
