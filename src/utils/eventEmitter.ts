import EventEmitter from 'eventemitter3';

export const eventEmitter = new EventEmitter();

export const EventTypes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
} as const;
