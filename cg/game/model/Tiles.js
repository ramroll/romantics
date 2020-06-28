import { d3_tiles } from "../../lib/shape/d3_tiles";
import { Model } from "../../lib";
import { Mat4 } from "../../lib/matrix";

export default class Tiles extends Model{
  constructor(map, tileSize){
    const tiles = []
    for (
      let i = 0;
      i < map.length;
      i++
    ) {
      for (
        let j = 0;
        j < map[i].length;
        j++
      ) {
        const c = map[i][j];
        let type = 1;
        switch (c) {
          case ".":
            type = 1;
            break;
          case "#":
            type = 2;
            break;
        }
        tiles.push({
          type,
        });
      }
    }

    const width = map[0].length;
    const height = map.length;
    const mesh = d3_tiles(
      tiles,
      tileSize,
      width,
      height
    );

    super(mesh);



    this.addTextureImage(
      "/texture08.jpg"
    );


  }
}