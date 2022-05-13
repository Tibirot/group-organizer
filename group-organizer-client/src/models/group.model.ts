export default class Group {
  idGroup?: number;
  name?: string;
  dateCreated?: Date;
  dateModified?: Date;
  assignedGroupId?: number;

  constructor(init?: Partial<Group>) {
    Object.assign(this, init);
  }
}