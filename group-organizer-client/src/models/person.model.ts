export default class Person {
  idPerson?: number;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  dateCreated?: Date;
  dateModified?: Date;
  assignedGroupId?: number;

  constructor(init?: Partial<Person>) {
    Object.assign(this, init);
  }
}