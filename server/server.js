const PORT = process.env.PORT ?? 8000;
const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
// Routes pour obtenir tout les tâches
app.get("/task/:userEmail", async (req, res) => {
  const { userEmail } = req.params;

  try {
    const task = await pool.query("SELECT * FROM task WHERE user_email = $1", [
      userEmail,
    ]);
    res.json(task.rows);
  } catch (err) {
    console.error(err);
  }
});

// Creer une nouvelle tache
app.post("/task", async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(user_email, title, progress, date);
  const id = uuidv4();
  try {
    await pool.query(
      `INSERT INTO task(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
      [id, user_email, title, progress, date]
    );
    res.status(201).json({ message: "Tâche créée avec succès", taskId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création de la tâche",
    });
  }
});

// Modifier une tache
app.put("/task/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;

  try {
    const editTask = await pool.query(
      "UPDATE task SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5",
      [user_email, title, progress, date, id]
    );
    res.json({ message: "Tâche modifiée avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la modification de la tâche",
    });
  }
});

// Suppression d'un tache
app.delete("/task/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM task WHERE id = $1", [id]);
    res.json({ message: "Tâche supprimée avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la suppression de la tâche",
    });
  }
});

// inscription

// inscription
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const signUp = await pool.query(
      `INSERT INTO users (email, hashed_password) VALUES ($1,$2)`,
      [email, hashedPassword]
    );

    // Générez le jeton JWT ici
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    // Ajoutez le jeton à la réponse
    res.json({ email, token });
  } catch (err) {
    console.error(err);
    if (err) {
      res.json({ detail: err.detail });
    }
  }
});

// connexion

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ detail: "Tes identifiants sont incorrects. Réessaye." });
    }

    const hashedPassword = user.rows[0].hashed_password;

    if (!bcrypt.compareSync(password, hashedPassword)) {
      return res.status(401).json({ detail: "Mot de passe incorrect." });
    }

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    res.json({ email, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Une erreur s'est produite." });
  }
});

app.listen(PORT, () => console.log(`serveur exécuté sur le port ${PORT}`));
