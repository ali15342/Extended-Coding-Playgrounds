import React from 'react';

const Navigation: React.FC = () => (
  <nav aria-label="Main navigation">
    <ul>
      <li>
        <a href="#" aria-label="Navigate to Home Page">
          Home
        </a>
      </li>
      <li>
        <a href="#" aria-label="More about our Team">
          Our Team
        </a>
      </li>
      <li>
        <a href="#" aria-label="Our Projects">
          Projects
        </a>
      </li>
      <li>
        <a href="#" aria-label="Read our Blog">
          Blog
        </a>
      </li>
    </ul>
    <form className="search">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input type="search" name="q" placeholder="Search query" />
      <input type="submit" value="Go!" />
    </form>
  </nav>
);

export default Navigation;
