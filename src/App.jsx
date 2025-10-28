import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setBooks(data.docs.slice(0, 20));
    } catch (err) {
      setError("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchBooks();
  };

  return (
    <div style={{ fontFamily: "system-ui, Arial", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#0369a1" }}>📚 Book Finder</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "60%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            background: "#0369a1",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {books.map((b) => (
          <div
            key={b.key}
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <img
              src={
                b.cover_i
                  ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
                  : "https://via.placeholder.com/150x200?text=No+Image"
              }
              alt={b.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h3 style={{ fontSize: "14px", marginTop: "8px" }}>{b.title}</h3>
            <p style={{ fontSize: "12px", color: "#555" }}>
              {b.author_name ? b.author_name.join(", ") : "Unknown Author"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
