"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [showInput, setShowInput] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/catalog?search=${encodeURIComponent(query.trim())}`);
    setQuery("");
    setShowInput(false);
  };

  return (
    <div className="pb-3">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md">
        {showInput && (
          <Input
            type="text"
            placeholder="Buscar libros..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`flex-1 transition-all duration-300 ${
              showInput ? "block" : "hidden"
            }`}
          />
        )}
        <Button 
          type={showInput ? "submit" : "button"} 
          variant="outline" 
          size="icon" 
          aria-label="Buscar"
          onClick={() => {
            if (!showInput) setShowInput(true);
          }}
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default SearchInput;