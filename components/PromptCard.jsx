import React from "react";

const PromptCard = ({ key, post, handleTagClick }) => {
  console.log(key);
  return <div key={key}>{post.prompt} </div>;
};

export default PromptCard;
