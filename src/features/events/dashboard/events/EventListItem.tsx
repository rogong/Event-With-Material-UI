import React from "react";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { IEvent } from "../../../../app/models/activity";
import EventListItemAttendees from "./EventsListItemAttendees";
import { observer } from "mobx-react-lite";


const EventListItem: React.FC<{ event: IEvent }> = ({ event }) => {
    const host = event.attendees.filter(x => x.isHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={ '/assets/user.png'} 
            style={{marginBottom: 3}} />
            <Item.Content>
              <Item.Header as={Link} to={`/events/${event.id}`}>{event.title}</Item.Header>
              {host && 
              <Item.Description>Hosted by {''}
               
                <Link to={`/profile/${host.username}`}>{host.displayName}</Link>             
                </Item.Description>}

              {event.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="orange"
                    content="You are hosting this event"
                  />
                </Item.Description>
              )}
              {event.isGoing && !event.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="green"
                    content="You are going this event"
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <Icon name="clock" />
        {format(event.date, "h:mm a")}
        <Icon name="marker" />
        {event.venue}, {event.city}
      </Segment>
      <Segment secondary>
        <EventListItemAttendees attendees={event.attendees} />
      </Segment>
      <Segment clearing>
        <span>{event.description}</span>
        <Button
          as={Link}
          to={`/events/${event.id}`}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};

export default observer(EventListItem);
