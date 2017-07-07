import yamljs from 'yamljs'
import path from 'path'

/**
 * @desc Loads game
 */

const gameLoader = {
    /**
     * @desc Loads game
     */
  loadGame () {
    return yamljs.load(path.join(__dirname, '/../data/game_instructions.yml'))
  }
}

export default gameLoader
