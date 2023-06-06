import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: '5oi7tigt',
  dataset: 'production',
  apiVersion: '2023-05-23',
  // useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const createNewUser = async (data) => {
  const _doc = {
    _id: data.uid,
    _type: 'users',
    uid: data.uid,
    displayName: data.displayName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    photoURL: data.phoneURL,
  };

  await client.createIfNotExists(_doc).then((res) => {
    return res;
  });
};
