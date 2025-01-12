import React from 'react';

const Related: React.FC = () => (
  <div className="secondary" aria-labelledby="related-title">
    <h3 id="related-title">Related</h3>

    <ul>
      <li>
        <a href="#" aria-label="Read about the trouble with Bees here.">
          The trouble with Bees
        </a>
      </li>
      <li>
        <a href="#" aria-label="Read about the trouble with Otters here.">
          The trouble with Otters
        </a>
      </li>
      <li>
        <a href="#" aria-label="Read about the trouble with Penguins here.">
          The trouble with Penguins
        </a>
      </li>
      <li>
        <a href="#" aria-label="Read about the trouble with Octopi here.">
          The trouble with Octopi
        </a>
      </li>
      <li>
        <a href="#" aria-label="Read about the trouble with Lemurs here">
          The trouble with Lemurs
        </a>
      </li>
    </ul>
  </div>
);

export default Related;
