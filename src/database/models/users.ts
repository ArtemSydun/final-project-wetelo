import { Column, Model, Table, PrimaryKey, Default, BeforeCreate } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Table  
export class User extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column
  id: string;

  @Column
  name: string;

  @Column
  role: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @BeforeCreate
  static async hashPassword(instance: User) {
    const salt = await bcrypt.genSalt(10);
    instance.password = await bcrypt.hash(instance.password, salt);
  }
}

export default User;
