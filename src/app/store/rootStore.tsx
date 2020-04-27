import { createContext } from "react";
import EventStore from "./eventStore";
import UserStore from './userStore';
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";


export class RootStore {
    eventStore: EventStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;

    constructor() {
        this.eventStore = new EventStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
    }

}

export const RootStoreContext = createContext(new RootStore());