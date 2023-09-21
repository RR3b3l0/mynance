import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import prisma from "./lib/prisma";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Healthy");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

// USERS

app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: {
      expenses: true,
      movements: true,
    },
  });

  const newUser = {
    ...user,
    totalExpenses: user?.expenses.reduce(
      (acc, current) => acc + current.amount,
      0
    ),
  };
  res.json(newUser);
});

app.post("/users/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.$transaction(async (transactionPrisma) => {
      await transactionPrisma.movement.deleteMany({
        where: { userId: parseInt(id) },
      });

      await transactionPrisma.expenses.deleteMany({
        where: { userId: parseInt(id) },
      });

      await transactionPrisma.user.delete({
        where: { id: parseInt(id) },
      });
    });

    res.json({ message: "User and related records deleted successfully." });
  } catch (error) {
    console.error("Transaction failed:", error);
    res.status(500).json({ error: "Transaction failed" });
  } finally {
    await prisma.$disconnect();
  }
});

app.post("/users", async (req: Request, res: Response) => {
  const { name, balance } = req.body;
  const newUser = await prisma.user.create({
    data: {
      name,
      balance,
    },
  });
  res.status(201).json(newUser);
});

// Expenses

app.post("/users/expense/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name, amount, description } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });

  if (user) {
    const expense = await prisma.expenses.create({
      data: {
        name,
        amount,
        description,
        user: { connect: { id: user.id } }, // Connect the expense to the user
      },
    });

    if (expense) {
      res.status(201).json(expense); // Return the created expense
    } else {
      res.status(404).json({ message: "Expense creation failed." });
    }
  } else {
    res.status(404).json({ message: "User not found." });
  }
});

app.post(
  "/users/expense/:userId/delete/:id",
  async (req: Request, res: Response) => {
    const { userId, id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (user) {
      const expense = await prisma.expenses.delete({
        where: { id: parseInt(id) },
      });
      res.json(expense);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  }
);

// Movements

app.post("/users/movement/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { amount, description } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });

  if (user) {
    const newBalance = user.balance + amount;

    const movement = await prisma.movement.create({
      data: {
        amount,
        description,
        previousBalance: user.balance,
        user: { connect: { id: user.id } }, // Connect the movement to the user
      },
    });

    if (movement) {
      await prisma.user.update({
        where: { id: user.id },
        data: { balance: newBalance },
      });

      res.status(201).json(movement); // Return the created movement
    } else {
      res.status(404).json({ message: "Movement creation failed." });
    }
  } else {
    res.status(404).json({ message: "User not found." });
  }
});

app.post(
  "/users/movement/:userId/delete/:id",
  async (req: Request, res: Response) => {
    const { userId, id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (user) {
      const movement = await prisma.movement.findUnique({
        where: { id: parseInt(id) },
      });
      if (movement) {
        const newBalance = user.balance - movement.amount;

        await prisma.user.update({
          where: { id: user.id },
          data: { balance: newBalance },
        });

        await prisma.movement.delete({
          where: { id: parseInt(id) },
        });

        res.json(movement);
      }
    } else {
      res.status(404).json({ message: "User not found." });
    }
  }
);
