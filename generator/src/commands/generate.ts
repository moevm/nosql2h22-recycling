import {Command, Flags} from '@oclif/core'
import mongoose from "mongoose";


export default class Generate extends Command {
  static description = 'describe the command here'

  static flags = {
    port: Flags.integer({char: 'p', description: 'type: number, number of port for mongo', required: true}),
    count_of_users: Flags.integer({char: 'u', description: 'type:number, number of users', required: true}),
    order_per_person: Flags.integer({
      char: 'o',
      description: 'type:number, number of orders for each user',
      required: true
    })
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

    this.endConnection()
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

  private async endConnection(): Promise<any> {
    await mongoose.connection.close();
  }

  public getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  public generateData(numUsers: number, numOrders: number) {
    let orders = this.generateOrders(numOrders * numOrders);
    let users = this.generateUsers(numUsers);
    console.log(users);
  }

  public generateDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  public generateOrders(n: number) {
    let orders = [];
    for (let i = 0; i < n; i++) {
      orders.push(this.generateOrder());
    }
    return orders;
  }

  public generateOrder() {
    let history = this.generateHistory();
    return {
      "_id": new mongoose.Types.ObjectId(), "users": [], status: history[history.length - 1].status,
      "date": history[history.length - 1].date, "reception": {"address": this.generateReception(), limit: 10000},
      "material": this.generateMaterial(), "history": history
    };
  }

  public generateReception() {
    const receptions = [
      'G. St. Petersburg, Ivan Ivanova street, 5',
      'G. St. Petersburg, Karl Marx street, 17',
      'G. St. Petersburg, Torzhkovskaya street, 123',
      'G. St. Petersburg, Prosveshcheniya avenue, 565',
      'G. St. Petersburg, Mebelny lane, 14',
      'G. St. Petersburg, Lesnaya street, 113',
      'G. St. Petersburg, Lenskaya street, 65',
      'G. St. Petersburg, Veteranov Avenue, 117',
      'G. St. Petersburg, Kolomyazhsky avenue, 15',
      'G. St. Petersburg, Bogatyrsky avenue, 876',
      'G. St. Petersburg, Professor Popov street, 251',
      'G. St. Petersburg, Nevsky avenue, 546',
      'G. St. Petersburg, Sadovaya street, 223',
      'G. St. Petersburg, Gorokhovaya street, 95',
      'G. St. Petersburg, Lunocharskogo avenue, 375'
    ];
    return receptions[this.getRandomInt(receptions.length - 1)];
  }

  public generateMaterial() {
    const types = [
      "plastic",
      "paper",
      "metal",
      "organic",
      "glass",
      "battery"
    ];
    const subtypes = [
      [
        "Polyethylene terephthalate",
        "High density polyethylene",
        "PVC",
        "Low density polyethylene",
        "Polypropylene",
        "Polystyrene",
        "Other types of plastic",
        "ABS plastic"
      ],
      [
        "Corrugated cardboard",
        "Other cardboard",
        "Paper",
        "Wax paper"
      ],
      [
        "Steel",
        "Aluminum"
      ],
      [
        "Wood",
        "Cork",
        "Cotton",
        "Jute fiber"
      ],
      [
        "Colorless glass",
        "Green glass",
        "Brown glass",
        "Bottle glass dark brown",
        "Bottle glass light brown",
        "Glass with low lead content",
        "Crystal",
        "Glass coated with copper",
        "Silver plated glass",
        "Gilded glass"
      ],
      [
        "Lead acid battery",
        "Alkaline element",
        "Nickel-cadmium battery",
        "Nickel metal hydride battery",
        "Lithium battery",
        "Silver-zinc accumulator",
        "Manganese-zinc element"
      ]
    ];
    const materialOdds = [15, 25, 200, 15, 2.5, 40];
    let count = this.getRandomInt(151);
    let firstNum = this.getRandomInt(types.length - 1);
    return {
      "title": types[firstNum],
      "subtype": subtypes[firstNum][this.getRandomInt(subtypes[firstNum].length - 1)],
      "count": count,
      "price": count * materialOdds[firstNum]
    };
  }

  public generateHistory() {
    let firstDate: Date = this.generateDate(new Date(2022, 10, 1), new Date());
    let history = [];
    switch (this.getRandomInt(4)) {
      case 0: {
        history.push({status: 'Created', date: firstDate});
        break;
      }
      case 1: {
        history.push({status: 'Created', date: firstDate});
        history.push({status: 'For export', date: new Date(firstDate.getTime() + 86400000)});
        break;
      }
      case 2: {
        history.push({status: 'Created', date: firstDate});
        history.push({status: 'For export', date: new Date(firstDate.getTime() + 86400000)});
        history.push({status: 'In delivery', date: new Date(firstDate.getTime() + 86400000 * 2)});
        break;
      }
      case 3: {
        history.push({status: 'Created', date: firstDate});
        history.push({status: 'For export', date: new Date(firstDate.getTime() + 86400000)});
        history.push({status: 'In delivery', date: new Date(firstDate.getTime() + 86400000 * 2)});
        history.push({status: 'Delivered', date: new Date(firstDate.getTime() + 86400000 * 3)});
        break;
      }
    }
    return history;
  }

  public generateUsers(numUsers: number) {
    let users = [];
    for (let i = 0; i < numUsers; i++) {
      users.push(this.generateUser(i, 'User'));
    }
    for (let i = 0; i < Math.floor(numUsers / 2); i++) {
      users.push(this.generateUser(i, 'Driver'));
    }
    for (let i = 0; i < 15; i++) {
      users.push(this.generateUser(i, 'Manager'));
    }
    users.push(this.generateUser(1, 'Admin'));
    return users;
  }

  public generateUser(i: number, role: string) {
    let name = this.generateName();
    let surname = this.generateSurname();
    return {
      "_id": new mongoose.Types.ObjectId(), "login": this.generateLogin(name, surname, i),
      "password": this.generatePassword(), "email": this.generateEmail(name, surname, i), "role": role,
      "firstName": name, "lastName": surname, "loyalty": this.getRandomInt(5) + 1, "orders": []

    };
  }

  public generateLogin(name: string, surname: string, i: number) {
    return name + '.' + surname + i.toString();
  }

  public generateName() {
    const names = [
      "Alexander",
      "Dmitry",
      "Maksim",
      "Sergey",
      "Andrew",
      "Alexei",
      "Artyom",
      "Ilya",
      "Kirill",
      "Michael",
      "Nikita",
      "Matvey",
      "Novel",
      "Egor",
      "Arseniy",
      "Ivan",
      "Denis",
      "Evgeny",
      "Daniel",
      "Timothy",
      "Vladislav",
      "Igor",
      "Vladimir",
      "Paul",
      "Ruslan"
    ];
    return names[this.getRandomInt(names.length - 1)];
  }


  public generateSurname() {
    const surnames = [
      "Ivanov",
      "Vasiliev",
      "Petrov",
      "Smirnov",
      "Mikhailov",
      "Fedorov",
      "Sokolov",
      "Yakovlev",
      "Popov",
      "Andreev",
      "Alekseev",
      "Alexandrov",
      "Lebedev",
      "Grigoriev",
      "Stepanov",
      "Semyonov",
      "Pavlov",
      "Bogdanov",
      "Nikolaev",
      "Dmitriev",
      "Egorov",
      "Volkov",
      "Kuznetsov",
      "Nikitin",
      "Solovyov"
    ];
    return surnames[this.getRandomInt(surnames.length - 1)];
  }

  public generatePassword(){
    const symbols = Array.from("1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM");
    let password: string = "";
    for (let i = 0; i < 8; i++){
      password += symbols[this.getRandomInt(symbols.length)];
    }
    return password;
  }

  public generateEmail(name: string, surname: string, i: number){
    const domains = [
      "hotmail.com",
      "yahoo.com",
      "gmail.com",
      "aol.com",
      "mail.ru",
      "yandex.ru",
      "rambler.ru"
    ];
    return name + "." + surname + i.toString() + "@" + domains[this.getRandomInt(domains.length - 1)];
  }
}
