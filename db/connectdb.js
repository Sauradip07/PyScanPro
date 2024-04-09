mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected"); // Success!
  })
  .catch((err) => {
    console.log("err", err);
  });