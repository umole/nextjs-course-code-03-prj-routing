import { Fragment } from 'react';

import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import { getAllEvents } from '../../dummy-data';

function EventDetailPage(props) {
  const event = props.selectdEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return{
    props: {
      selectdEvent: event
    }
  }
}

export async function getStaticPaths() {
  const allEvents = await getAllEvents();

  const paths = allEvents.map(event => ({ params: { eventId: event.id }}))

  return {
    paths: paths,
    fallback: false
  }
}