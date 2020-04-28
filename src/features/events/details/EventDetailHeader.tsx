import React, { useContext } from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import  {IEvent} from "../../../app/models/activity";
import { RootStoreContext } from "../../../app/store/rootStore";


const eventImageStyle = {
  filter: "brightness(30%)"
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};
const EventDetailHeader: React.FC<{ event: IEvent }> = ({
  event
}) => {
  const rootStore = useContext(RootStoreContext);
  const {attendEvent, cancelAttendance, loading} = rootStore.eventStore;
  const host = event.attendees.filter(e => e.isHost)[0];
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0", marginTop: '5em' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />
        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: "white" }}
                />
                <p>{format(event.date, "eeee do MMMM")}</p>
              {host &&   <p>
                  Hosted by {''}<Link to={`/profile/${host.username}`}>
                  <strong>{host.displayName}</strong>
                  </Link>
                </p>}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {event.isHost ? (
          <Button
            as={Link}
            to={`/manage/${event.id}`}
            color="orange"
            floated="right"
          >
            Manage Event
          </Button>
        ) : event.isGoing ? (
          <Button loading={loading} onClick={cancelAttendance}>Cancel attendance</Button>
        ) : (
          <Button loading={loading} onClick={attendEvent} color="teal">I want to attend</Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(EventDetailHeader);
