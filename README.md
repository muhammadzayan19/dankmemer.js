# 🎉 dankmemer.js

A lightweight **TypeScript/JavaScript wrapper** for the **DankAlert API**, inspired by the original `dankmemer.py` package.

This library provides:

* 🚀 **Async API client**
* ⚡ **Built-in caching** with configurable TTL
* 🎯 **Powerful filters** (Exact, Fuzzy, IN, Range, Above, Below)
* 🛡️ **Auto rate-limit handling**
* 📦 **Fully typed models** (Items, NPCs, and more)

This project is currently in **alpha** — only Items and NPCs routes are fully implemented.
More endpoints will be added soon.

---

## 📦 Installation

Install using npm, yarn, or pnpm:

```bash
npm install dankmemer.js
# or
yarn add dankmemer.js
# or
pnpm add dankmemer.js
```

---

## ✨ Quick Example (TypeScript / JavaScript)

```ts
import { DankMemerClient, IN, Fuzzy } from "dankmemer.js";

async function main() {
  const client = new DankMemerClient({ cacheTTL: 5000 });

  // Fetch all items
  const items = await client.items.query();
  console.log("All items:", items);

  // Fuzzy search on item names
  const fuzzyItems = await client.items.query(
    Fuzzy("name", "trash", 80)
  );
  console.log("Fuzzy result:", fuzzyItems);

  // Membership filter (IN) on NPC names
  const npcs = await client.npcs.query(
    IN("name", "chad", "john")
  );
  console.log("Filtered NPCs:", npcs);
}

main();
```

---

## 🛠 Available Routes

* `all`
* `baits`
* `buckets`
* `creatures`
* `decorations`
* `events`
* `items`
* `locations`
* `npcs`
* `seasons`
* `skills`
* `skillsdata`
* `tanks`
* `tools`

---

## 🔹 Filters

You can use built-in filters to search the data:

* `IN(field, ...values)` — membership filter
* `Fuzzy(field, term, cutoff)` — fuzzy search
* `Above(field, number)` — numeric >
* `Below(field, number)` — numeric <
* `Range(field, min, max)` — numeric range
* Combine filters with `and(...)` / `or(...)`

Example:

```ts
import { Fuzzy, IN, and } from "dankmemer.js";

const filter = and(
  Fuzzy("name", "trash", 80),
  IN("category", "common", "rare")
);

const results = await client.items.query(filter);
```

---

## ⚡ Features

* **Caching:** Prevents repeated API calls with configurable TTL
* **Async/Await support:** Easy to use with modern JS/TS
* **Rate-limit handling:** Automatically waits if API responds with 429
* **TypeScript support:** Full typings for routes and entities

---

## 📚 Documentation & References

- **Python original:** [dankmemer.py docs](https://dankmemerpy.readthedocs.io/en/latest/)
- **DankAlert API:** [https://api.dankalert.xyz/dank](https://api.dankalert.xyz/dank)
- **GitHub repo:** [dankmemer.js](https://github.com/muhammadzayan19/dankmemer.js)

---

## ⚠️ Notes

* This is an **alpha release**. Some endpoints or filters may be incomplete.
* Contributions are welcome! Submit issues or pull requests via GitHub.
