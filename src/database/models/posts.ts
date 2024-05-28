import { Column, Model, Table, PrimaryKey, Default, DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table
class Post extends Model {
  
  @PrimaryKey
  @Default(() => uuidv4())
  @Column
  id: string;

  @Column
  author: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  price: number;

  @Default(DataType.NOW)
  @Column
  createdAt: Date;

  @Default(DataType.NOW)
  @Column
  updatedAt: Date;
}

export default Post

