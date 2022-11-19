import {Command, Flags} from '@oclif/core'
import mongoose from "mongoose";


export default class Generate extends Command {
  static description = 'describe the command here'

  static flags = {
    port: Flags.integer({char: 'p', description: 'type: number, number of port for mongo', required: true}),
    count_of_users: Flags.integer({char: 'u', description: 'type:number, number of users', required: true}),
    order_per_person: Flags.integer({char: 'o', description: 'type:number, number of orders for each user', required: true})
  }

  static args = [{name: 'file'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Generate)
    const url = `mongodb://localhost:${flags.port}/Recycling`;
    this.initConnection(url)
      .then((res) => {
        console.log(`Connected to database Recycling on port ${flags.port}`);
      })
      .catch((err) => {
        if (err instanceof Error) console.error(err.message);
      });

    this.generateData(flags.count_of_users, flags.order_per_person);

    this.endConnection(url)
      .then((res) => {
        console.log(`Disconnected from database Recycling on port ${flags.port}`);
      })
      .catch((err) => {
        if (err instanceof Error) console.error(err.message);
      });
  }

  private async initConnection(url: string): Promise<any> {
    await mongoose.connect(url);
  }

  private async endConnection(url: string): Promise<any> {
    await mongoose.connection.close();
  }

  public getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  public generateData(users: number, orders: number){

  }

  public generateName(){

  }
}

