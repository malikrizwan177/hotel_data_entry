export const createUser = async (db, name, email, password) => {
  return db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
};

export const getAllUsers = async (db) => {
  return db.all("SELECT id, name, email FROM users");
};

export const getUserById = async (db, id) => {
  return db.get("SELECT id, name, email FROM users WHERE id = ?", [id]);
};

export const updateUser = async (db, id, name, email) => {
  return db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [
    name,
    email,
    id,
  ]);
};

export const deleteUser = async (db, id) => {
  return db.run("DELETE FROM users WHERE id = ?", [id]);
};
