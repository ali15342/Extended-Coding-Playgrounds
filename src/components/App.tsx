import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import CommentSection from './CommentSection';
import Navigation from './Navigation';
import BearList from './BearList';
import Related from './Related';

const App: React.FC = () => (
  <div>
    <Header />
    <Navigation />
    <main>
      <article>
        <MainContent />
        <CommentSection />
        <BearList />
      </article>
      <Related />
    </main>
    <Footer />
  </div>
);

export default App;
