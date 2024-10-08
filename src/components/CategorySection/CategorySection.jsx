import React, { useEffect, useState } from "react";
import  "./CategorySection.css";

import Story from "../Story/Story";

const CategorySection = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [categoryStories, setCategoryStories] = useState([]);
  const [maxStoriesInRow, setMaxStoriesInRow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchCategoryStories = async () => {
      try {
        const response = await fetch(
          `https://swiptory-backend-w1mb.onrender.com/api/post/${props.category}`
        );
        if (response.ok) {
          const data = await response.json();
          setCategoryStories(data.posts);
        } else {
          console.error("Failed to fetch category stories");
        }
      } catch (error) {
        console.error("Error fetching category stories:", error);
      }
    };

    fetchCategoryStories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category, props.selectedFilters]);

  if (categoryStories.length === 0) {
    return null;
  }

  return (
    <>
      <div className='categoryContainer'>
        {!isMobile && (
          <div className='categoryHeader'>
            Top stories about {props.category}
          </div>
        )}
        <div className='categoryStories'>
          {categoryStories.slice(0, maxStoriesInRow).map((story, index) => (
            <Story
              key={index}
              story={story}
              authValidated={props.authValidated}
              handleStoryViewer={props.handleStoryViewer}
            />
          ))}
        </div>
        {!isMobile && maxStoriesInRow < categoryStories.length && (
          <button
            onClick={() =>
              setMaxStoriesInRow(
                maxStoriesInRow + 4 > categoryStories.length
                  ? categoryStories.length
                  : maxStoriesInRow + 4
              )
            }
            className='seemoreBtn'
          >
            See more
          </button>
        )}
      </div>
    </>
  );
};

export default CategorySection;