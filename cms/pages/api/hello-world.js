// Build your own API endpoints to interact with in Sanity

export default async (req, res) => {
  return res.status(200).send({ message: 'Hello World'})
};
