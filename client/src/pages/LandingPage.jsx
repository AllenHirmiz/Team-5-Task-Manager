import { useState, useEffect } from 'react';
import '../assets/Css/LandingPage.css';
// import {
//   Container,
//   // Col,
//   // Form,
//   // Button,
//   // Card,
//   // Row
// } from 'react-bootstrap';
// import { useMutation, useQuery } from '@apollo/client';
// import { SAVE_BOOK } from '../utils/mutations';
// import Auth from '../utils/auth';
// // import { searchGoogleBooks } from '../utils/API';
// // import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

// const LandingPage = () => {
  

//   return (
//     <main className='landingPage'>
      
//       <Container>
        
//       </Container>
//     </main>
//   );
// };

// export default LandingPage;
import {
  Container,
} from '@chakra-ui/react';

import { useMutation, useQuery } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';

const LandingPage = () => {
  return (
    <main className='landingPage'>
      <Container maxW="container.xl">
        {/* can add something here future development */}
      </Container>
    </main>
  );
};

export default LandingPage;
