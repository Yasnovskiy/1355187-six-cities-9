import { Comments } from '../types/reviews';

const comments: Comments = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: 'Thu Mar 03 2022 01:54:10 GMT+0500 (Yekaterinburg Standard Time)',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 1,
      isPro: false,
      name: 'Max',
    },
  },
  {
    comment: 'Hi, I have very good room.',
    date: 'Thu Mar 04 2022 01:54:10 GMT+0500 (Yekaterinburg Standard Time)',
    id: 2,
    rating: 3.3,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 1,
      isPro: true,
      name: 'Andrey',
    },
  },
];

export default comments;
