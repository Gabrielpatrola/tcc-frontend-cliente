/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email: string, password: string) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email: string, password: string) => {
          try {
            const newUser = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );

            return await firestore().collection('users').add({
              created: firestore.FieldValue.serverTimestamp(),
              name: newUser.user.displayName,
              email: newUser.user.email,
              emailVerified: newUser.user.emailVerified,
              uid: newUser.user.uid,
              provider: newUser.user.providerId,
            });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
