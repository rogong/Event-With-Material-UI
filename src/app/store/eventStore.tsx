import {observable, action, computed, configure, runInAction} from 'mobx';
import {  SyntheticEvent } from 'react';
import { IEvent } from '../models/activity';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { setEventProps, createAttendee } from '../shared/util/util';
import { toast } from 'react-toastify';

configure({enforceActions: 'always'})

export default class EventStore {
     rootStore: RootStore;
     constructor(rootStore: RootStore) {
         this.rootStore = rootStore;
     }

    @observable eventRegistry = new Map();
    @observable event: IEvent | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';
    @observable loading = false;


    
    @computed get eventListByDate() {
        return this.getEventListByDate(Array.from(this.eventRegistry.values()));
    } 

    getEventListByDate(events: IEvent[]) {
        const sortedEvents = events.sort(
            (a, b) =>a.date.getTime() - b.date.getTime() 
        )
        return Object.entries(sortedEvents.reduce((events, event) => {
            const date = event.date.toISOString().split('T')[0];
            events[date] = events[date] ? [...events[date], event] : [event];
            return events;
        }, {} as {[key: string]: IEvent[]}));
    }

    @computed get eventsByDate() {
        return Array.from(this.eventRegistry.values()).sort(
            (a, b) =>a.date.getTime() - b.date.getTime() );
    } 


    @action loadEvents = async () => {
        this.loadingInitial = true;
       
       try {
        const events = await agent.Events.list();
        runInAction('loading events', () => {
            events.forEach(event => {
                event.date = new Date(event.date);
              setEventProps(event, this.rootStore.userStore.user!)
               this.eventRegistry.set(event.id, event);
              })
              this.loadingInitial = false;
        })
       } catch (error) {
           
           runInAction('load events error', ()=>{
            this.loadingInitial = false;
           })
           console.log(error)
       }
      
    };

   @action loadEvent = async (id: string) => {
     let event =  this.getEvent(id);
     if(event){
         this.event = event;
         return event;
     }else{
        this.loadingInitial = true;
        try {
            event = await agent.Events.details(id);
            runInAction('getting event', () => {
                setEventProps(event, this.rootStore.userStore.user!)
               this.event = event;
               this.eventRegistry.set(event.id, event);
               this.loadingInitial = false;
            })
            return event;
        } catch (error) {
            runInAction('get event error', () => {
                this.loadingInitial = false;
            })
            console.log(error)
        }
     }
   }

   getEvent = (id: string) => {
      return this.eventRegistry.get(id);
   }

    @action createEvent = async (event: IEvent) => {
        this.submitting = true;
        try {
            await  agent.Events.create(event);
            const attendee = createAttendee(this.rootStore.userStore.user!);
            attendee.isHost = true;
           let attendees = [];
           attendees.push(attendee);
           event.attendees = attendees;
          runInAction('creating event', ()=>{
               // this.events.push(event);
           this.eventRegistry.set(event.id, event);
           this.submitting = false;
          })
        } catch (error) {
            runInAction('creat event error', ()=>{
                this.submitting = false;
            })           
            console.log(error)
        }
    }

    @action editEvent  = async (event: IEvent) => {
        this.submitting = true;
      try {
          await agent.Events.update(event);
        runInAction('Editing event',()=>{
            this.eventRegistry.set(event.id, event);
            this.event = event;
            this.submitting = false;
        })

      } catch (error) {
        runInAction('Edit event error',()=>{
            this.submitting = false;
        })
        
        console.log(error)
      }
    }

    @action deleteEvent = async (event: SyntheticEvent<HTMLButtonElement>,id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Events.delete(id);
           runInAction('Deleting event', ()=>{
            this.eventRegistry.delete(id);
            this.submitting = false;
            this.target = '';
           })
        } catch (error) {
            runInAction('Delete event error', ()=>{
                this.submitting = false;
            })
            
            console.log(error) 
        }   
    }
   @action attendEvent = async () => {
       const attendee = createAttendee(this.rootStore.userStore.user!);
       this.loading = true;
       try {
           await agent.Events.attend(this.event!.id);
           runInAction(() => {
            if(this.event) {
                this.event.attendees.push(attendee);
                this.event.isGoing = true;
                this.eventRegistry.set(this.event.id, this.event);
                this.loading = false;
            }          
           });
       } catch (error) {
        runInAction(() => {
        this.loading = false;
        })
        toast.error('Problem signing up to event')
       }
      
   };

   @action cancelAttendance = async () => {
    this.loading = true;
       try {
        await agent.Events.unattend(this.event!.id);
        runInAction(() => {
            if (this.event) {
                this.event.attendees = this.event.attendees.filter(
                    a => a.username !== this.rootStore.userStore.user!.username
                );
                this.event.isGoing = false;
                this.eventRegistry.set(this.event.id, this.event);
                this.loading = false;
            }
        })
       } catch (error) {
        runInAction(() => {
            this.loading = false;
            })
            toast.error('Problem cancelling attendance')
       }
      
   };

    @action clearEvent = () => {
        this.event = null;
    }

    @action selectEvent = (id: string) => {
        this.event =  this.eventRegistry.get(id);   // this.events.find(e => e.id === id);
       
    }

 
}

