export interface IEvent {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
    isGoing: boolean;
    isHost: boolean;
    attendees: IAttendee[];
}

export interface IEventFormValues extends Partial<IEvent> {
    time?: Date
}

export class EventFormValues implements IEventFormValues {
    id?:string = undefined;
    title:string = "";
    category:string = "";
    description: string = "";
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = "";
    venue:  string = "";

    constructor(init?: IEventFormValues){
        if(init && init.date){
            init.time = init.date
        }
        Object.assign(this, init);
    }
}

export interface IAttendee {
    username?: string;
    displayName: string;
    image: string;
    isHost: boolean;
    following?: boolean;
}