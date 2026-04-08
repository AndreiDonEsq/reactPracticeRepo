import React from "react";
import { useState } from "react";
import { type ComponentPropsWithoutRef } from "react";
import WithLoadingButton from "./WithLoadingButton";


type FilterableListProps = ComponentPropsWithoutRef<'button'> & {
  searchTerm: string;
  updateSearchTerm: (term: string) => void;
  elements: string[];
  theme: 'light' | 'dark';
};

export default function FilterableList({ searchTerm, updateSearchTerm, elements, theme }: FilterableListProps) {

  return (
    <div>

      <label htmlFor="name">Filtering:</label>
      <input
        name="filter"
        type="text"
        value={searchTerm}
        onChange={(e) => updateSearchTerm(e.target.value)}
      />
      <WithLoadingButton
        onClick={() => updateSearchTerm("")}
        theme={theme}
      >
        Submit profile to external provider
      </WithLoadingButton>
      <ul>

        {elements.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </ul>
    </div>
  );
}
