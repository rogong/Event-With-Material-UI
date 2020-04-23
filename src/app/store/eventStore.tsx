import {observable, action, computed, configure, runInAction} from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IEvent } from '../models/activity';
import agent from '../api/agent';

configure({enforceActions: 'always'})

class EventStore {
    @observable eventRegistry = new Map();
    @observable events: IEvent[] = [];
    @observable selectedEvent: IEvent | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

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

    @action createEvent = async (event: IEvent) => {
        this.submitting = true;
        try {
            await  agent.Events.create(event);
          runInAction('creating event', ()=>{
               // this.events.push(event);
           this.eventRegistry.set(event.id, event);
           this.editMode = false;
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
            this.selectedEvent = event;
            this.editMode = false;
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

    @action openCreateForm = () => {  
        this.selectedEvent = undefined;
        this.editMode = true;
    }

    @action openEditForm = (id: string) => {
      this.selectedEvent  = this.eventRegistry.get(id);
       this.editMode = true;
    }

    @action cancelselectedEvent = () => {
        this.selectedEvent = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action selectEvent = (id: string) => {
        this.selectedEvent =  this.eventRegistry.get(id);   // this.events.find(e => e.id === id);
        this.editMode = false;
    }

 
}

export default createContext(new EventStore())