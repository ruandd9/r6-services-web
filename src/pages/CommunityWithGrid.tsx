import React from 'react';
import Community from './Community';
import GridBackground from '../components/test/GridBackground';

const CommunityWithGrid: React.FC = () => {
  return (
    <GridBackground>
      <Community />
    </GridBackground>
  );
};

export default CommunityWithGrid; 