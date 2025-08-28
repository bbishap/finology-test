"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchUserData } from "@/lib/api";
import { UserInterface } from "@/types/userTypes";
import { UserCard } from "@/components/UserCard/userCard";
import { SearchBox } from "@/components/SearchBox";
import { useDebounce } from "@/hooks/useDebounce";

export default function HomePage() {
  const [data, setData] = useState<UserInterface[] | []>([]);
  const [searchBoxText, setSearchBoxText] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<UserInterface[] | []>([]);

  const debouncedValue = useDebounce(searchBoxText, 500);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = useCallback(
    (debouncedValue: string) => {
      const searchData = data.filter((user) =>
        user.name.startsWith(debouncedValue)
      );
      setFilteredData(searchData);
    },
    [data]
  );

  useEffect(() => {
    if (debouncedValue.trim()) {
      handleSearch(debouncedValue);
    } else {
      setFilteredData(data);
    }
  }, [debouncedValue, handleSearch, data]);

  const fetchUsers = async () => {
    try {
      const userData = await fetchUserData<UserInterface[]>();
      setData(userData);
      setFilteredData(userData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value: string = e.target.value;
      setSearchBoxText(value);
    },
    []
  );

  if (loading) return <p className="text-blue-500">Loading posts...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <main className="p-2">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <div className="flex justify-center items-center py-8 w-full">
        <SearchBox
          handleSearchChange={(e) => handleSearchChange(e)}
          value={searchBoxText}
        />
      </div>
      {filteredData.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredData?.map((userData, idx) => (
            <UserCard userData={userData} key={idx} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full">
          No Data Found
        </div>
      )}
    </main>
  );
}
