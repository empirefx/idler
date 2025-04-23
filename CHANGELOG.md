# Changelog

## [2.0.0](https://github.com/empirefx/idler/compare/v1.0.0...v2.0.0) (2025-04-23)


### ⚠ BREAKING CHANGES

* WIP redux
* state is now managed in one place (GameEngine getState)

### Features

* add logger class for console repeated data ([95b3e11](https://github.com/empirefx/idler/commit/95b3e11d84938fe344fef31a1a7e372c1c506f6c))
* display/interact enemies ([7e64538](https://github.com/empirefx/idler/commit/7e645385f706945502aed184fd5822e82d1b75ec))
* initial drop items and drop rate ([cae03b6](https://github.com/empirefx/idler/commit/cae03b682814bd227c04fd2d51dd044b532326c5))
* initial experience/level up ([b5b1c3a](https://github.com/empirefx/idler/commit/b5b1c3a0c73234d04a0ecc942ed646836c28d3b8))
* initial log ([ee599ab](https://github.com/empirefx/idler/commit/ee599ab0d033303f49d39474b408c0d0de6cfe96))
* initial player stats ([0396f94](https://github.com/empirefx/idler/commit/0396f94e4d295c024663c2aef75dc0593ee3d5ec))
* inputManager for user keyboard inputs ([a84f52c](https://github.com/empirefx/idler/commit/a84f52ccdc9ab9c5e0b69155068f8eee7ad362b3))
* new consumable items ([209ce85](https://github.com/empirefx/idler/commit/209ce851a984b9f707cc2dee33979f701518a03d))
* spawn service and event bus ([0c14990](https://github.com/empirefx/idler/commit/0c149904d58df31cb4b07e5f9f4c5fb54129f6fa))
* **test:** add vitest configuration and tests ([b087bec](https://github.com/empirefx/idler/commit/b087becde9077dea5eb6bd1947099a20c9f6c8bd))
* **ui:** overall design and add assets ([25dfae8](https://github.com/empirefx/idler/commit/25dfae804871aceb39f3d7e5172d4463347f1273))
* WIP initial player equipment ([857f4a4](https://github.com/empirefx/idler/commit/857f4a4d4a6b5800741d5c3f6a6da830cfc61513))
* WIP inventory ([3a0c2e5](https://github.com/empirefx/idler/commit/3a0c2e5f034475304eb9b70d972cf1a2e5cae6f7))
* WIP Navigation system ([709f098](https://github.com/empirefx/idler/commit/709f098963602b85d1ba2c2787b447be37ba7a76))
* WIP redux ([4b40e78](https://github.com/empirefx/idler/commit/4b40e78e8188d80249e1b0e472b8e0401c751f2d))


### Bug Fixes

* add dispatch to gameengine class ([c589218](https://github.com/empirefx/idler/commit/c589218763a896d3a2385090f3049ed6ed4aaf84))
* add enemies factory ([746d864](https://github.com/empirefx/idler/commit/746d8646c15050ef7e72fa29494880b1887087fa))
* add more slices and refactor ([8912140](https://github.com/empirefx/idler/commit/8912140355727733b3fc309a7b8e390297f3a478))
* **building:** proper productionType name ([4f68fc4](https://github.com/empirefx/idler/commit/4f68fc436ae6b23b840ed947f78e4d9a404f833e))
* **buildings:** add ancient ruins ([0b3970a](https://github.com/empirefx/idler/commit/0b3970a18cd998be6c2d5d9d2f1b7a0371d49b42))
* calc player equip items weight ([7b0c88b](https://github.com/empirefx/idler/commit/7b0c88bddeb86466f53c949f1f823cb05b2a5be1))
* card design for player, enemy. ([05d7fa0](https://github.com/empirefx/idler/commit/05d7fa0a926edbc3dcd61f29e35faeb9f4e6e829))
* despawn enemies ([bbc85ad](https://github.com/empirefx/idler/commit/bbc85adbdfe3648769b37b5475a14cba60223567))
* engage button design ([6b255bd](https://github.com/empirefx/idler/commit/6b255bd65b355e9426053138cbe7490390357113))
* equip/swap equipment items ([d631a70](https://github.com/empirefx/idler/commit/d631a703d6b00aaf3cf2e85c14210d7c72cc5475))
* **gameEngine:** ...operator was doing a shallow copy ([8bd7d1a](https://github.com/empirefx/idler/commit/8bd7d1aab9216cd99b62a06c3125c39430c53949))
* **gameState:** finally preventing double initialization ([165be7c](https://github.com/empirefx/idler/commit/165be7cd0896802ef59c636666a3ff1580ace0fd))
* initial autocombat and display state ([9aa0334](https://github.com/empirefx/idler/commit/9aa0334e138996c1043204dbdd9474fac20fc1b5))
* inventory move items ([fa6caef](https://github.com/empirefx/idler/commit/fa6caef2a812d1a8ec9135773e3581c7e05f48db))
* **inventory:** display current, max slot/weight ([dbfe00f](https://github.com/empirefx/idler/commit/dbfe00f738fdf389ab679a53ffd7fdbd85a1f807))
* **inventory:** fix items not being stackable ([a066e5e](https://github.com/empirefx/idler/commit/a066e5eca5cb397266d22b121916aed69ea904bd))
* **items:** lowercase name items ([c5e162b](https://github.com/empirefx/idler/commit/c5e162b33d79218e39afde1e3e0e8bd9d8749d26))
* log scroll and styles ([7be6b3d](https://github.com/empirefx/idler/commit/7be6b3d3ee6cbc28991e003cf10bdd6b0417d69d))
* **navigation:** add button to move to places ([5bc333d](https://github.com/empirefx/idler/commit/5bc333daa05d41b11827cfe047b324397fdf3036))
* **navigation:** refact use engine player location instead ([3d1a80d](https://github.com/empirefx/idler/commit/3d1a80daf10a1bded7a0268c08abbece55de4c05))
* **NavigationSystem:** display player current location ([69e3322](https://github.com/empirefx/idler/commit/69e3322cec77eedbbfd62fac624d0ce0c3b9672d))
* **places:** add missing oness ([546dd9e](https://github.com/empirefx/idler/commit/546dd9e21c17e1de0c1492343a43834f0ca0cc79))
* player can only assign worker if theres buildings in current place ([4bba815](https://github.com/empirefx/idler/commit/4bba8156ce7ce2a97aa2d81f76775bf4c7ae471b))
* player stats calc based on equip items ([19f0748](https://github.com/empirefx/idler/commit/19f0748c2725f95c3356ef236ad9d52e43ab9686))
* **player:** init properties & resources as Map object ([092fb35](https://github.com/empirefx/idler/commit/092fb35e09e30bdc7d7c5285a9922d9091e50c3f))
* **player:** initial player data ([69298fa](https://github.com/empirefx/idler/commit/69298fab5b86e5b5cb79d62db186c535fc202b03))
* **player:** load player data from json for init ([5694728](https://github.com/empirefx/idler/commit/5694728167ccef4b5bfb29fc7fc30888e6840dc2))
* prevent enemies being keep spawning ([dd458cc](https://github.com/empirefx/idler/commit/dd458cc4d6fdd54f54d9eda2d34b03e0d7b4d2cb))
* prevent rerender ([9db1877](https://github.com/empirefx/idler/commit/9db18776cd17d619efb2be910b5d119bccd220d2))
* Produced items by workers are stored in vault ([a27a408](https://github.com/empirefx/idler/commit/a27a40855b9b26670937cd44ec8235dca4cd8552))
* resources from redux ([0fd7bc6](https://github.com/empirefx/idler/commit/0fd7bc679ad92d3d9c95beedf9aae0960ddebc16))
* **resources:** fixes resources not being updated ([17c43ef](https://github.com/empirefx/idler/commit/17c43ef287cc9d43d0689cc1bc945d345ddcecea))
* respawn enemies ([58921d1](https://github.com/empirefx/idler/commit/58921d176dcff75d3d5ef033b22c5685b8698156))
* state is now managed in one place (GameEngine getState) ([f54e65f](https://github.com/empirefx/idler/commit/f54e65f987da8a605f093967ea5dc436e07f2c17))
* toggle level up option button ([bdff95a](https://github.com/empirefx/idler/commit/bdff95aadc55536f883e5b91070aa2cab41fd76f))
* toolTip, itemInfo, keyBind, resources section ([2a347af](https://github.com/empirefx/idler/commit/2a347af4550da4205a85f05e740e4ad335b287af))
* **ui:** display workers ([0a4d26d](https://github.com/empirefx/idler/commit/0a4d26dd6faf287b8fdb72691f187f30d7e2b76b))
* update Buildings while Player moves trougth Places ([f0e00fa](https://github.com/empirefx/idler/commit/f0e00fa6235c3e46bb5dde80cdcaad58ad21604d))
* wrap player options ([b3fa5a4](https://github.com/empirefx/idler/commit/b3fa5a4dabadf23de8a7e8575973e0e9b4f74e47))

## 1.0.0 (2025-03-26)


### Features

* added places ([6b569db](https://github.com/empirefx/idler/commit/6b569dbae8c6b942ff8950a17278e78e8d76c34e))
* implement game structure with React and CSS architecture ([341dc63](https://github.com/empirefx/idler/commit/341dc6374122da6d60dc34a5818000339f1fed51))
* update engine for Player and Worker classes ([c6bd85b](https://github.com/empirefx/idler/commit/c6bd85b249241c3459686b2f8e3edca4fbc206c0))


### Bug Fixes

* release-please.yml ([b591ce7](https://github.com/empirefx/idler/commit/b591ce7d5f61636c236df0df97a57d8158f420e0))
* remove add, remove methods for building ([ed712b5](https://github.com/empirefx/idler/commit/ed712b539b4e65d6cfbd28f9355f27140bc924bb))
* remove building card buttons ([ba7ee6e](https://github.com/empirefx/idler/commit/ba7ee6e3950f6d1c6b279aba7dc1df430250f90f))
* update places style ([5eaf89f](https://github.com/empirefx/idler/commit/5eaf89f43c5a59f40da010964e8804e76e25decb))
