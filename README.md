# Idler

Very early stage for an RPG-idler(browser) game built with React, Redux & Parcel.

![screenshot](static/screenshot.png)

## TO-DO

### Player

- [ ] `Player` death & punishment(15% lost EXP)
- [x] `Player` skills and buffs
- [ ] `Player` AOE skills
- [x] Display `Player` active buffs ui

### Enemies

- [x] `Enemy` pool should attack(all at once) in different delay times
- [x] `Enemy` pool should have different `enemies`
- [ ] `Enemy`(some) should have a chance to become a `worker`

### Mechanics

- [x] Calculate DMG/DEF with `stats`, `equipment`, `skills`
- [x] `Inventory` should display a slider when item quantity is more than 1
- [x] `Recipes` ex 10x apple's -> apple-pie, player needs to know recipe first to craft it
- [x] Able to sell items for gold(through `NPC`)
- [ ] Melt equipment for crafting materials
- [x] `Building` can be upgraded by gold, unlocking new mats
- [x] `Crafting` equipment(cost gold/crafting materials) or know items recipe(ex apple-pie)
- [x] `NPC` able to talk to them, sell stuff, buy recipes, give/complete quest
- [x] `Dialog` ui
- [x] `Quest` log

### Other

- [x] `Log` better format for better readability
- [x] Alert `player` he can't carry that much `weight`
- [x] `Engine` better performance iterations, maybe abstract to a class? for reuse
- [x] Icons equipment/weapon/items
- [ ] List drops ui
- [ ] Populate `Enemy` drops trash for sell to `NPC`

## Setup

### Install

```bash
npm install
```

### Environments

Create `.env.development` and `.env.production` at project root:

```env
API_URL=...
```

### Scripts

- `npm start` → dev server (Parcel)
- `npm run build` → production build
- `npm test` → run tests (Vitest)

## Project Structure

```text
src/
  game/
    engine/      # core game loop & mechanics
    factory/     # entity factories (items, monsters)
    services/    # game services (inventory, combat)
    utils/       # utility functions
  ui/
    layouts/
      GameLayout.js   # root layout combining UI sections
    hooks/
      useGameState.js # hook to access & dispatch game state
    components/
      common/
      sections/
      display/
  store/
    slices/     # Redux slices (combat, places, inventory, etc.)
  assets/       # static assets
```

## How It Works

The app is bundled by Parcel, renders a React application, and uses Redux for state management. Services and factories encapsulate game logic.

## Game Mechanics

- Idle resource generation: items/resources accumulate over time or via actions.
- Combat system: toggle combat state via Redux slice to simulate battles.
- Inventory management: add/remove items per location with `InventoryService`.
- Factories: generate game entities (items, monsters, etc.) at startup.

## Assets

### Backgrounds/avatars/icons

- **Perchance**: <https://perchance.org/ai-text-to-image-generator>
- **Idylwilds Armory**: <https://idylwild.itch.io/idylwilds-armory>

## Libraries & Packages

### Production dependencies

- **react**, **react-dom**: UI framework
- **redux**, **react-redux**, **@reduxjs/toolkit**: state management

### Dev dependencies

- **parcel**, **@parcel/config-default**, **@parcel/plugin**, **@parcel/resolver-glob**, **@parcel/transformer-image**: bundler & plugins
- **cross-env**: cross-platform environment variables
- **vitest**: testing framework
- **@babel/core**, **@babel/preset-react**: transpilation
- **process**, **sharp**: polyfills & image transformations

## License

MIT
