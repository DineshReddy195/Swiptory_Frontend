import React, { useEffect, useState } from "react";
import  "./Bookmarks.css";
import Story from "../Story/Story";

const Bookmarks = (props) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [maxStoriesInRow, setMaxStoriesInRow] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchBookmarks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://swiptory-backend-w1mb.onrender.com/api/user/bookmarks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data.bookmarks);
      } else {
        console.error("Failed to fetch your stories");
      }
    } catch (error) {
      console.error("Error fetching your stories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className='categoryContainer'>
          <div
            style={{
              textAlign: "center",
            }}
            className='categoryHeader'
          >
            Loading...
          </div>
        </div>
      </>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <>
        <div className='categoryContainer'>
          <div
            style={{
              textAlign: "center",
            }}
            className='categoryHeader'
          >
            You have no bookmarks.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='categoryContainer'>
        {<div className='categoryHeader'>Your Bookmarks</div>}
        <div className='categoryStories'>
          {bookmarks.slice(0, maxStoriesInRow).map((story, index) => (
            <Story
              key={index}
              story={story}
              authValidated={props.authValidated}
              handleStoryViewer={props.handleStoryViewer}
            />
          ))}
        </div>
        {!isMobile && maxStoriesInRow < bookmarks.length && (
          <button
            onClick={() =>
              setMaxStoriesInRow(
                maxStoriesInRow + 4 > bookmarks.length
                  ? bookmarks.length
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

export default Bookmarks;