"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/catalog?search=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <div className="w-full p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Buscar libros..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="outline" size="icon" aria-label="Buscar">
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default SearchInput;