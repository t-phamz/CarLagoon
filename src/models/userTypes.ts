import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  users: UserTable;
  cars: CarTable;
  sessions: SessionTable;
  userSessions: UserSessionTable;
  invitations: InvitationTable;
}

export interface UserTable {
  id: Generated<number>;
  auth0ID: string | null;
  firstName: string;
  lastName: string;
  carID: number | null;
  carSeats: number | null;
  location: string | null;
  img: string | null;
  inACar: boolean;
  assignedCarID: number | null;
}

export interface CarTable {
  id: Generated<number>;
  ownerID: number;
  seats: number;
  occupants: number;
  full: boolean;
}

export interface SessionTable {
  id: Generated<number>;
  eventTitle: string;
  location: string;
  sessionDate: string;
}

export interface UserSessionTable {
  id: Generated<number>;
  userID: number;
  sessionsID: number;
  carID: number | null;
}

export interface InvitationTable {
  id: Generated<number>;
  sessionID: number;
  senderID: number;
  invitationsAccepted: number;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export type Car = Selectable<CarTable>;
export type NewCar = Insertable<CarTable>;
export type CarUpdate = Updateable<CarTable>;

export type Session = Selectable<SessionTable>;
export type NewSession = Insertable<SessionTable>;
export type SessionUpdate = Updateable<SessionTable>;

export type UserSession = Selectable<UserSessionTable>;
export type NewUserSession = Insertable<UserSessionTable>;
export type UserSessionUpdate = Updateable<UserSessionTable>;

export type Invitation = Selectable<InvitationTable>;
export type NewInvitation = Insertable<InvitationTable>;
export type InvitationUpdate = Updateable<InvitationTable>;
