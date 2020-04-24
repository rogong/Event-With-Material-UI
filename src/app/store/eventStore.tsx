import {observable, action, computed, configure, runInAction} from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IEvent } from '../models/activity';
import agent from '../api/agent';

configure({enforceActions: 'always'})

class EventStore {
    @observable eventRegistry = new Map();
    @observable event: IEvent | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';


    @computed get eventListByDate() {
        return this.getEventListByDate(Array.from(this.eventRegistry.values()));
    } 

    getEventListByDate(events: IEvent[]) {
        const sortedEvents = events.sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        )
        return Object.entries(sortedEvents.reduce((events, event) => {
            const date = event.date.split('T')[0];
            events[date] = events[date] ? [...events[date], event] : [event];
            return events;
        }, {} as {[key: string]: IEvent[]}));
    }

    @computed get eventsByDate() {
        return Array.from(this.eventRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    } 


    @action loadEvents = async () => {
        this.loadingInitial = true;
       try {
        const events = await agent.Events.list();
        runInAction('loading events', () => {
            events.forEach(event => {
                event.date = event.date.split('.')[0];
               // this.events.push(event);
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
     }else{
        this.loadingInitial = true;
        try {
            event = await agent.Events.details(id);
            runInAction('getting event', () => {
               this.event = event;
               this.loadingInitial = false;
            })
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
   
    @action clearEvent = () => {
        this.event = null;
    }

    @action selectEvent = (id: string) => {
        this.event =  this.eventRegistry.get(id);   // this.events.find(e => e.id === id);
       
    }

 
}

export default createContext(new EventStore())