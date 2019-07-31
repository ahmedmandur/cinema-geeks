import React, { useState } from "react";

export default function MoviesFilter(props) {
  const [selectedFilter, setSelectedFilter] = useState("upcoming");

  const filters = [
    {
      title: "Popular",
      slug: "popular"
    },
    {
      title: "Top rated",
      slug: "top_rated"
    },
    {
      title: "Upcoming",
      slug: "upcoming"
    }
  ];

  const handleFilterChange = slug => {
    setSelectedFilter(slug);
    props.changeFilter(slug);
  };

  return (
    <div className="movies-filter">
      <ul>
        {filters.map(item => (
          <li
            key={item.slug}
            className={item.slug === selectedFilter ? "active" : ""}
            onClick={() => handleFilterChange(item.slug)}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
