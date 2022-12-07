import {Command, Flags} from '@oclif/core'
import mongoose from "mongoose";


export default class Generate extends Command {
  public receptions = [
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

  static description = 'describe the command here'

  static flags = {
    port: Flags.integer({char: 'p', description: 'type: number, number of port for mongo', required: true}),
    count_of_users: Flags.integer({char: 'u', description: 'type:number, number of users', required: true}),
    order_per_person: Flags.integer({
      char: 'o',
      description: 'type:number, number of orders for each user',
      required: true
    }),
    host: Flags.string({char: 'h', description: 'type: string, database host'}),
    database: Flags.string({char: 'd', description: 'type: string, database name'}),
  }

  static args = [{name: 'file'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Generate)
    const url = `mongodb://${flags.host || "localhost"}:${flags.port}/${flags.database || "Recycling"}`;
    this.initConnection(url)
      .then((res) => {
        console.log(`Connected to database ${flags.database || "Recycling"} on port ${flags.port}`);
        this.insertData(flags.count_of_users, flags.order_per_person)
          .then((res) =>{
            this.endConnection()
              .then((res) => {
                console.log(`Disconnected from database Recycling on port ${flags.port}`);
              })
              .catch((err) => {
                if (err instanceof Error) console.error(err.message);
              });
          });
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

  public async insertData(numUsers: number, numOrders: number){
    let collections = this.generateData(numUsers, numOrders);

    const orderSchema = new mongoose.Schema({
      "_id": mongoose.Schema.Types.ObjectId,
      "users": mongoose.Schema.Types.Array,
      "status": mongoose.Schema.Types.String,
      "date": mongoose.Schema.Types.Date,
      "reception":
      {
        "address": mongoose.Schema.Types.String,
        "limit": mongoose.Schema.Types.Number
      },
      "material": {
      "title": mongoose.Schema.Types.String,
        "subtype": mongoose.Schema.Types.String,
        "count": mongoose.Schema.Types.Number,
        "price": mongoose.Schema.Types.Number
    },
      "history": mongoose.Schema.Types.Array
    })
    const order = mongoose.model('Order', orderSchema);
    await order.insertMany(collections.orders).then(function(){
      console.log("Orders data inserted")
    }).catch(function(error){
      console.log(error)
    });

    const userSchema = new mongoose.Schema({
      "_id": mongoose.Schema.Types.ObjectId,
      "login": mongoose.Schema.Types.String,
      "password": mongoose.Schema.Types.String,
      "email": mongoose.Schema.Types.String,
      "role": mongoose.Schema.Types.String,
      "firstName": mongoose.Schema.Types.String,
      "lastName": mongoose.Schema.Types.String,
      "loyalty": mongoose.Schema.Types.Number,
      "orders": mongoose.Schema.Types.Array
    })
    const user = mongoose.model('User', userSchema);
    await user.insertMany(collections.users).then(function(){
      console.log("Users data inserted")
    }).catch(function(error){
      console.log(error)
    });
  }

  public generateData(numUsers: number, numOrders: number) {
    let orders = this.generateOrders(numUsers * numOrders);
    let users = this.generateUsers(numUsers);
    return this.connectCollections(orders, users);
  }

  public connectCollections(orders: Array<any>, users: any){
    let limits: Array<number> = Array(15).fill(0);
    let counts: Array<number> = Array(15).fill(0);
    let notFull: Array<number> = [];
    for (let i = 0; i < users.users.length; i++ ){
      notFull.push(i);
    }
    for (let i = 0; i < orders.length; i++){
      let reception = this.receptions.indexOf(orders[i].reception.address)
      if (orders[i].history.length < 3){
        limits[reception] += orders[i].material.count;
        counts[reception] += 1;
      }

      users.admin.orders.push(orders[i]._id);
      orders[i].users.push(users.admin._id);

      if (orders[i].history.length > 2){
        let numDriver: number = this.getRandomInt(users.drivers.length);
        users.drivers[numDriver].orders.push(orders[i]._id);
        orders[i].users.push(users.drivers[numDriver]._id);
      }
      users.managers[reception].orders.push(orders[i]._id);
      orders[i].users.push(users.managers[reception]._id);


      let userNum = this.getRandomInt(notFull.length);
      users.users[notFull[userNum]].orders.push(orders[i]._id);
      orders[i].users.push(users.users[notFull[userNum]]._id);
      if(users.users[notFull[userNum]].orders.length === 15){
        notFull.splice(userNum, 1);
      }
    }

    for (let i = 0; i < limits.length; i++){
      if(limits[i] > 10000){
        let diff: number = Math.ceil((limits[i] - 10000) / counts[i]);
        for (let j = 0; j < orders.length; j++){
          let reception = this.receptions.indexOf(orders[j].reception.address)
          if(reception === i){
            if (orders[j].history < 2){
              orders[j].material.count -= diff;
            }
          }
        }
      }
    }
    return {"users": users.drivers.concat([users.admin]).concat(users.users).concat(users.managers), "orders": orders};
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
    return this.receptions[this.getRandomInt(this.receptions.length)];
  }

  public generateMaterial() {
    const types = [
      "Plastic",
      "Paper",
      "Metal",
      "Organic",
      "Glass",
      "Battery"
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
    let firstNum = this.getRandomInt(types.length);
    return {
      "title": types[firstNum],
      "subtype": subtypes[firstNum][this.getRandomInt(subtypes[firstNum].length)],
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
    let drivers = [];
    let managers = [];
    for (let i = 0; i < numUsers; i++) {
      users.push(this.generateUser(i, 'User'));
    }
    for (let i = 0; i < Math.floor(numUsers / 2); i++) {
      drivers.push(this.generateUser(i, 'Driver'));
    }
    for (let i = 0; i < 15; i++) {
      managers.push(this.generateUser(i, 'Manager'));
    }
    let admin = this.generateUser(0, 'Admin');
    return {users: users, drivers: drivers, managers: managers, admin: admin};
  }

  public generateUser(i: number, role: string) {
    let name = this.generateName();
    let surname = this.generateSurname();
    let password: string;
    let login: string;
    if (i === 0) {
      password = role.toLowerCase();
      login = role.toLowerCase();
    }
    else {
      password = this.generatePassword();
      login = this.generateLogin(name, surname, i);
    }
    return {
      "_id": new mongoose.Types.ObjectId(), "login": login,
      "password": password, "email": this.generateEmail(name, surname, i), "role": role,
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
    return names[this.getRandomInt(names.length)];
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
    return surnames[this.getRandomInt(surnames.length)];
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
    return name + "." + surname + i.toString() + "@" + domains[this.getRandomInt(domains.length)];
  }
}
