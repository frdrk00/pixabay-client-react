import { Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewUser } from './sanity';
import { firebaseAuth } from './config/firebase.config';
import { SET_USER } from './context/actions/userActions';

import HomeContainer from './containers/HomeContainer';
import Header from './components/Header';
import MainLoader from './components/MainLoader';
import NewPost from './containers/NewPost';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((result) => {
      if (result) {
        console.log('User', result?.providerData[0]);
        createNewUser(result?.providerData[0]).then(() => {
          console.log('New user created!');
          dispatch(SET_USER(result?.providerData[0]));
          setIsLoading(false);
        });
      }
    });
  }, []);
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start">
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          {/* Header */}
          <Header />

          {/* main content sections */}
          <main className="w-full h-full flex items-center justify-center">
            {/* Routes */}
            <Routes>
              <Route path="/*" element={<HomeContainer />} />
              <Route path="/newPost/*" element={<NewPost />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
