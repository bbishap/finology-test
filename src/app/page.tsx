"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchUserData } from "@/lib/api";
import { UserInterface } from "@/types/userTypes";
import { UserCard } from "@/components/UserCard/userCard";
import { SearchBox } from "@/components/SearchBox";
import { useDebounce } from "@/hooks/useDebounce";
import { FilterComponent } from "@/components/Filter";
import { CITIES, COMPANIES } from "@/constants/userFilterConstants";
import { SelectChangeEvent } from "@mui/material";

interface SelectedFilter {
  city: string;
  company: string;
}

export default function HomePage() {
  const [data, setData] = useState<UserInterface[]>([]);
  const [searchBoxText, setSearchBoxText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>({
    city: "",
    company: "",
  });

  // used debounce to wait when user stops typin. Reason : Stops unnecessary computation.
  const debouncedValue = useDebounce(searchBoxText, 500);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userData = await fetchUserData<UserInterface[]>();
      setData(userData);
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
      setSearchBoxText(e.target.value);
    },
    []
  );

  const handleSelect = useCallback((e: SelectChangeEvent, label: string) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [label.toLowerCase()]: e.target.value,
    }));
  }, []);

  //assumption:  clear all only clears selected filter
  const handleClearAll = useCallback(() => {
    setSelectedFilter({ city: "", company: "" });
  }, []);

  // used useMemo to avoid unnecessary computations
  const filteredData = useMemo<UserInterface[]>(() => {
    if (!data || data.length === 0) return [];

    const search = debouncedValue.toLowerCase();

    const result: UserInterface[] = [];

    for (let i = 0; i < data.length; i++) {
      const user = data[i];
      const [firstName, lastName] = user.name.split(" ");

      // search
      if (
        search &&
        !(
          firstName?.toLowerCase().startsWith(search) ||
          lastName?.toLowerCase().startsWith(search)
        )
      )
        continue;

      // city filter
      if (selectedFilter.city && user.address.city !== selectedFilter.city)
        continue;

      // company filter
      if (
        selectedFilter.company &&
        user.company.name !== selectedFilter.company
      )
        continue;

      result.push(user);
    }

    return result;
  }, [data, debouncedValue, selectedFilter]);

  if (loading) return <p className="text-blue-500">Loading posts...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <main className="p-2">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <div className="flex flex-col justify-center items-center py-8 w-full">
        <SearchBox
          handleSearchChange={handleSearchChange}
          value={searchBoxText}
        />
        <div className="flex mt-4 pb-4 flex-col items-center justify-center sm:flex-row w-full">
          <FilterComponent
            inputData={CITIES}
            handleSelect={handleSelect}
            label="City"
            value={selectedFilter.city}
          />
          <FilterComponent
            inputData={COMPANIES}
            handleSelect={handleSelect}
            label="Company"
            value={selectedFilter.company}
          />
        </div>
        {Object.values(selectedFilter).some((val) => val !== "") && (
          <div className="flex items-center ">
            <u className="cursor-pointer" onClick={handleClearAll}>
              Clear all
            </u>
          </div>
        )}
      </div>

      {filteredData.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((userData, idx) => (
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
