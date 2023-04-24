// const DUMMY_EVENTS = [
//   {
//     id: 'e1',
//     title: 'Programming for everyone',
//     description:
//       'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
//     location: 'Somestreet 25, 12345 San Somewhereo',
//     date: '2021-05-12',
//     image: 'images/coding-event.jpg',
//     isFeatured: false,
//   },
//   {
//     id: 'e2',
//     title: 'Networking for introverts',
//     description:
//       "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
//     location: 'New Wall Street 5, 98765 New Work',
//     date: '2021-05-30',
//     image: 'images/introvert-event.jpg',
//     isFeatured: true,
//   },
//   {
//     id: 'e3',
//     title: 'Networking for extroverts',
//     description:
//       'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
//     location: 'My Street 12, 10115 Broke City',
//     date: '2022-04-10',
//     image: 'images/extrovert-event.jpg',
//     isFeatured: true,
//   },
// ];

export async function getAllEvents() {
  try {
    const respose = await fetch('https://nextjs-course-14f33-default-rtdb.firebaseio.com/events.json');
  const data = await respose.json();
  const transformedData = [];

  for (const eventKey in data) {
    transformedData.push({
      id: eventKey,
      ...data[eventKey]
      // title: eventKey.title,
      // description: eventKey.description,
      // location: eventKey.location,
      // date: eventKey.date,
      // Image: eventKey.image,
      // isFeatured: eventKey.isFeatured
    })
  }
  return transformedData;

  } catch (error) {
    return console.log(error);
  }
}


export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

// export function getAllEvents(DUMMY_EVENTS) {
//   return DUMMY_EVENTS;
// }

export function getFilteredEvents(dateFilter, DUMMY_EVENTS ) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export function getEventById(id, DUMMY_EVENTS) {
  if (!DUMMY_EVENTS || !Array.isArray(DUMMY_EVENTS) || DUMMY_EVENTS.length === 0) {
    return null;
  }
  
  return DUMMY_EVENTS.find((event) => event.id === id);
}
