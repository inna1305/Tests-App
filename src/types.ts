import {TableRowProps} from './components/table/tableRow/TableRow';

export enum Type {
    CLASSIC = "CLASSIC",
    SERVER_SIDE = "SERVER_SIDE",
    MVT = "MVT"
}

export enum CapitalizedType {
    CLASSIC = "Classic",
    SERVER_SIDE = "Server-side",
    MVT = "MVT"
}

export enum Status {
    DRAFT = "DRAFT",
    ONLINE = "ONLINE",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED",
}

export enum CapitalizedStatus {
    DRAFT = "Draft",
    ONLINE = "Online",
    PAUSED = "Paused",
    STOPPED = "Stopped",
}
export interface Site {
    id: number;
    url: string;
}

export interface Test {
    id: number;
    name: string;
    type: Type;
    status: Status;
    siteId: number;
}

export type TableRowPropsKeys = keyof TableRowProps;

