const MongoClient = require('mongodb').MongoClient;
const original_id = require('mongodb').ObjectID;

const connectionString = 'mongodb://admin:kirill201299@ds135255.mlab.com:35255/instructions';

const users = [
  {email: 'star@gmail.com', password: '1234567', isActive: false, isAdmin: false},
  {email: 'kirill@yandex.by', password: '0987654345', isActive: false, isAdmin: false},
  {email: 'archi@mail.ru', password: '126hasbjasdf', isActive: false, isAdmin: false},
  {email: 'kasnd@yandex.by', password: 'alsdkmsaldmaks', isActive: false, isAdmin: false},
  {email: 'aksdjglh@gmail.com', password: 'klsnjkasda', isActive: false, isAdmin: false},
];

const insertUsers = () => {
  MongoClient.connect(connectionString, async (err, client) => {
    const db = client.db('instructions');
    const r = await db.collection('users').insertMany(users);
    // console.log('r', r);
    client.close();
  });
};

const deleteAllUsers = () => {
  MongoClient.connect(connectionString, (err, client) => {
    const db = client.db('instructions');
    users.forEach((user) => db.collection('users').deleteMany(user));
    client.close();
  });
};

module.exports = {
  insertUsers, deleteAllUsers
};


