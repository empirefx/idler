import { Transformer } from "@parcel/plugin";

export default new Transformer({
  async transform({ asset }) {
    const buffer = await asset.getBuffer();

    const result = resize(buffer, asset.query.width, asset.query.height);

    asset.setBuffer(result);
    return [asset];
  },
});
