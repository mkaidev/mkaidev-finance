import { config } from "dotenv";
import { subDays } from "date-fns";
import { neon } from "@neondatabase/serverless";
import { categories, transactions, accounts } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { eachDayOfInterval, format } from "date-fns";
import { convertAmountToMiliunits } from "@/lib/utils";

config({ path: ".env.local" });

const sql: any = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = process.env.CLERK_USER_ID!!;

const SEED_CATEGORIES = [
  { id: "category_1", name: "Food", userId: SEED_USER_ID, plaidID: null },
  { id: "category_2", name: "Drink", userId: SEED_USER_ID, plaidID: null },
  { id: "category_3", name: "Rent", userId: SEED_USER_ID, plaidID: null },
  { id: "category_4", name: "Home", userId: SEED_USER_ID, plaidID: null },
  { id: "category_5", name: "Utilities", userId: SEED_USER_ID, plaidID: null },
  { id: "category_6", name: "Services", userId: SEED_USER_ID, plaidID: null },
  { id: "category_7", name: "Shopping", userId: SEED_USER_ID, plaidID: null },
  { id: "category_8", name: "Health", userId: SEED_USER_ID, plaidID: null },
  {
    id: "category_9",
    name: "Transportation",
    userId: SEED_USER_ID,
    plaidID: null,
  },
  {
    id: "category_10",
    name: "Entertainment",
    userId: SEED_USER_ID,
    plaidID: null,
  },
  {
    id: "category_11",
    name: "Miscellaneous",
    userId: SEED_USER_ID,
    plaidID: null,
  },
];

const SEED_ACCOUNTS = [
  { id: "account_1", name: "Checking", userId: SEED_USER_ID, plaidID: null },
  { id: "account_2", name: "Savings", userId: SEED_USER_ID, plaidID: null },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: (typeof transactions.$inferInsert)[] = [];

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case "Food":
    case "Drink":
      return Math.random() * 300000 + 10;
    case "Rent":
    case "Home":
      return Math.random() * 3000000 + 70;
    case "Utilities":
    case "Services":
      return Math.random() * 2000000 + 50;
    case "Shopping":
    case "Entertainment":
    case "Miscellaneous":
      return Math.random() * 1000000 + 20;
    case "Health":
    case "Transportation":
      return Math.random() * 500000 + 15;
    default:
      return Math.random() * 500000 + 10;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1; // 1 to 4 transactions per day
  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6; // 60% chance of being an expense
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountToMiliunits(
      isExpense ? -amount : amount // negative for expense
    );

    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id, // Assuming always using the first account for simplicity
      // accountId: !isExpense ? SEED_ACCOUNTS[1].id : SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: "Merchant",
      notes: "Random transaction",
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach((day) => generateTransactionsForDay(day));
};

generateTransactions();

const main = async () => {
  try {
    // Reset database
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();
    // Seed categories
    await db.insert(categories).values(SEED_CATEGORIES).execute();
    // Seed accounts
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();
    // Seed transactions
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
  } catch (error) {
    console.log("error during seed", error);
    process.exit(1);
  }
};

main();
