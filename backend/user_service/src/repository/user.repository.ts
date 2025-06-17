import pool from "../config/DB";
import UserRepositoryInterface from "../interface/user.repository.interface";
import { userAuth, userProfile } from "../model/dto/user.dto";

export default class UserRepository implements UserRepositoryInterface {
  async create({ username, email, password }: userAuth): Promise<void> {
    await pool.query(
      "INSERT INTO users (username,email,password) VALUES ($1,$2,$3) ",
      [username, email, password]
    );
  }

  async get(offset: number): Promise<any> {
    const users = await pool.query("SELECT * FROM users");
    console.log(users.rows);
  }

  async getByID(id: number): Promise<any> {
    return await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  }

  async findBy({
    username,
    email,
    phone,
  }: {
    username?: string;
    email?: string;
    phone?: string;
  }): Promise<userProfile> {
    return (
      await pool.query(
        "SELECT * FROM users WHERE username=$1 OR email=$2 OR phone=$3",
        [username, email, phone]
      )
    ).rows[0];
  }

  async update(id: number, data: userProfile): Promise<any> {
    return await pool.query(
      "UPDATE users SET username=$2,\
      email=$3,\
      phone=$4,\
      password=$5,\
      avator=$6,\
      payment=$7,\
      state= $8,\
     address=$9,\
     road=$10,\
     orders=$11,\
     carts=$12 WHERE id=$1 RETURNING *",
      [
        id,
        data.username,
        data.email,
        data.phone,
        data.password,
        data.avator,
        data.payment,
        data.state,
        data.address,
        data.road,
        data.orders,
        data.carts,
      ]
    );
  }
  delete(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
