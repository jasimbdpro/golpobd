"use client";
import { FormEvent, useState } from "react";
import "./page.module.css";
import filter from "leo-profanity";
export default function Home() {
  const [titleInput, setTitleInput] = useState<string>("");
  const [contentInput, setContentInput] = useState<string>("");
  filter.add(
    process.env.NEXT_PUBLIC_BANNED_WORDS
      ? JSON.parse(process.env.NEXT_PUBLIC_BANNED_WORDS)
      : []
  );
  //NEXT_PUBLIC_BANNED_WORDS is array of profane words comes from .env files

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: filter.clean(titleInput),
          content: filter.clean(contentInput),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
      await response.json();
      setTitleInput("");
      setContentInput("");
      alert("Form submitted successfully!");
    } catch (error) {
      console.error(error);
    }
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentInput(e.target.value);
  };
  return (
    <div className=" flex justify-center p-40">
      <form onSubmit={handleSubmit} className="card w-96 shadow-xl">
        <input
          required
          type="text"
          value={titleInput}
          className="input border-[hsl(0,0%,80%)] mt-4"
          placeholder="গল্পের নাম লিখো"
          onChange={handleTitleChange}
        />
        <textarea
          required
          value={contentInput}
          id="message"
          name="message"
          rows={10}
          cols={40}
          aria-required="true"
          aria-describedby="message-help"
          placeholder="গল্পটি লিখতে থাকো..."
          className="py-8 mt-4 input border-[hsl(0,0%,80%)]"
          onChange={handleContentChange}
        />
        <button type="submit" className="btn btn-primary mt-5">
          গল্পটি সাবমিট করো
        </button>
      </form>
    </div>
  );
}
