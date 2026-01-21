const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://<user>:<password>@cluster0.knsvpyr.mongodb.net/tasksdb'
)
.then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
