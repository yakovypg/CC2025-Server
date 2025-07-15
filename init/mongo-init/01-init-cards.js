print("Initializing database...");

db = db.getSiblingDB("cc2025db");

const filePath = path.join(__dirname, "cards-ru.json");
const content = fs.readFileSync(filePath, "utf8");
const cards = JSON.parse(content);

db.cards.drop();
db.cards.insertMany(cards);

print("Database initialized with cards.");
