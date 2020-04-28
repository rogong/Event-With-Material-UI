import React, { useContext, Fragment } from 'react'
import { Item,  Label } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import EventListItem from './EventListItem';
import {format} from 'date-fns';
import { RootStoreContext } from '../../../../app/store/rootStore';


const EventList: React.FC = () => {

  const rootStore = useContext(RootStoreContext);
  const { eventListByDate } = rootStore.eventStore;

  return (
    <Fragment>
      {eventListByDate.map(([group, events]) => (
        <Fragment key={group} >
          <Label size='large' color='pink'>
            {format(group, 'eeee do MMMM')}
          </Label>
         
            <Item.Group divided>
              {events.map(event => (
                <EventListItem key={event.id} event={event} />
              ))}
            </Item.Group>
         
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(EventList);
