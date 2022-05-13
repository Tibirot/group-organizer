import { DataSource } from "typeorm";
import { Person } from '../models/person.model';
import { Group } from '../models/group.model';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '!My@Sql#1',
  database: 'group-organizer-db',
  entities: [Person, Group],
  logging: false
});

function initDb() {
  dataSource.initialize();
  console.log('DB initialized');
  
}

export {dataSource, initDb}