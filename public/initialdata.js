// This is the initial data object we'll start with and use for the front end.
// We'll modify it by adding new reviews to it, which will save it

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  places: {
    'p101': {
      info: {
        placeId: 'p101',
        name: "Singapore Noodles Restaurant",
      },
      reviews: [
        {
          reviewId: 'r201',
          timestamp: 1675997149680,
          title: 'Really nice place',
          description: 'I enjoyed my time here! Delicious food!',
          author: 'Jennifer',
          rating: 5,
          features: 'Music, Dogs allowed',
        },
        {
          reviewId: 'r202',
          timestamp: 1675997311321,
          title: 'A litle loud',
          description: 'The food was delicious, but the dining area was a little loud for me.',
          author: 'John',
          rating: 3,
          features: null,
        },
      ],
    }
  }
}