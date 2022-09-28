let instance;

class DBConnection {
  constructor(uri) {
    if (instance){
      throw new Error("You can only have 1 db connection!")
    }
    instance = this;
    this.uri = uri;
  }

  connect() {
    console.log(`DB ${this.uri} has been connected!`);
  }

  disconnect() {
    console.log('DB disconnected');
  }
}

const connection = Object.freeze(new DBConnection('mongodb://...'));
connection.connect();
connection.connect();
let newConn = new DBConnection;

