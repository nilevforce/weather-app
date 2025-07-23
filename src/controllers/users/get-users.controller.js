const getUsers = async (req, res) => {
  res.status(200).json({ ok: true, data: [1, 2, 3] });
};

export default getUsers;
