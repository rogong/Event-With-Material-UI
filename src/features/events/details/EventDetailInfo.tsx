
import React from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import {format} from 'date-fns';
import { observer } from 'mobx-react-lite';
import { IEvent } from '../../../app/models/activity';

const EventDetailInfo: React.FC<{event: IEvent}> = ({event}) => {
    return (
       <Segment.Group>
             <Segment attached='top'>
               <Grid>
                 <Grid.Column width={1}>
                   <Icon size='large' color='teal' name='info' />
                 </Grid.Column>
                 <Grid.Column width={15}>
                   <p>{event.description}</p>
                 </Grid.Column>
               </Grid>
             </Segment>
             <Segment attached>
               <Grid verticalAlign='middle'>
                 <Grid.Column width={1}>
                   <Icon name='calendar' size='large' color='teal' />
                 </Grid.Column>
                 <Grid.Column width={15}>
                   <span>
                     {format(event.date, 'eeee do MMMM')} @
                     {format(event.date, 'h:mm a')}
                   </span>
                 </Grid.Column>
               </Grid>
             </Segment>
             <Segment attached>
               <Grid verticalAlign='middle'>
                 <Grid.Column width={1}>
                   <Icon name='marker' size='large' color='teal' />
                 </Grid.Column>
                 <Grid.Column width={11}>
                   <span>{event.venue}, {event.city}</span>
                 </Grid.Column>
               </Grid>
             </Segment>
           </Segment.Group>
    )
}



export default observer(EventDetailInfo);
