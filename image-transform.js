import {Transformer} from '@parcel/plugin';

export default new Transformer({
  async transform({asset}) {
    let buffer = await asset.getBuffer();

    let result = resize(
      buffer,
      asset.query.width,
      asset.query.height
    );

    asset.setBuffer(result);
    return [asset];
  }
});