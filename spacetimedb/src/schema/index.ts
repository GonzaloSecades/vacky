import { schema } from 'spacetimedb/server';
import {
  AuthAuditEvent,
  EmailVerificationToken,
  Session,
  UserAccount,
} from './auth';
import { Location } from './locations';
import { Trip } from './trips';

const spacetimedb = schema({
  userAccount: UserAccount,
  session: Session,
  emailVerificationToken: EmailVerificationToken,
  trip: Trip,
  location: Location,
  authAuditEvent: AuthAuditEvent,
});

export default spacetimedb;
