import React, { useState } from 'react';
import type { Comment } from '../models/comment';

const EMPTY_STRING_LENGTH = 0;

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      name: 'Bob Fossil',
      comment:
        'Oh I am so glad you taught me all about the big brown angry guys in the woods. With their sniffing little noses and their bad attitudes, they can sure be a menace — I was thinking of putting them all in a truck and driving them outta here. I run a zoo, you know.',
    },
  ]);
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [showFormAndComments, setShowFormAndComments] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isEmptyField(name) && isEmptyField(comment)) {
      alert('Name and comment may not be empty!');
      return;
    } else {
      if (isEmptyField(name)) {
        alert('Please enter your name.');
        return;
      }

      if (isEmptyField(comment)) {
        alert('Please enter a comment.');
        return;
      }
    }
    setComments([...comments, { name, comment }]);
    setName('');
    setComment('');
  };

  const toggleFormAndComments = (): void => {
    setShowFormAndComments(!showFormAndComments);
  };

  const isEmptyField = (text: string): boolean =>
    text.trim().length === EMPTY_STRING_LENGTH;

  return (
    <section className="comments" aria-labelledby="comments-title">
      <button
        className="show-hide"
        onClick={toggleFormAndComments}
        tabIndex={0}
      >
        {showFormAndComments ? 'Hide comments' : 'Show comments'}
      </button>

      {showFormAndComments && (
        <div className="comment-wrapper">
          <h3 id="comments-title">Add comment</h3>

          <form className="comment-form" onSubmit={handleSubmit}>
            <div className="flex-pair">
              <label htmlFor="name">Your name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="flex-pair">
              <label htmlFor="comment">Your comment:</label>
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="Enter your comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </div>
            <div>
              <input type="submit" value="Submit comment" />
            </div>
          </form>

          <h3 id="comments-title">Comments</h3>
          <ul className="comment-container" aria-label="comments">
            {comments.map((c, index) => (
              <li key={index}>
                <p>{c.name}</p>
                <p>{c.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default CommentSection;
