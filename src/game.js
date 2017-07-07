import gameLoader from './gameLoader'
import util from './util'
import renderer from './renderer'

const loadedGame = gameLoader.loadGame()

/**
 * @desc Exits the game
 */
function exit () {
  console.log('Goodbye!')
  process.exit(0)
}

let game = {
  currentState: 'q0',
  init () {
    renderer.output.push(loadedGame[this.currentState]['prompt'])
    renderer.render()
  },
    /**
     * @desc Loops the game
     * @param {String} input - this is the input of the user.
     */
  loop (input) {
    const action = input.split(' ')[0] // Example action: use
    const gameObject1 = input.split(' ')[1] // Example gameObject: axe
    const combine = input.split(' ')[2] // Example: with
    const gameObject2 = input.split(' ')[3] // Example: door
    const possibleActions = Object.keys(loadedGame[this.currentState]['actions'])

    // Check if action is in possible actions
    if (util.isInArray(action, possibleActions)) {
      const possibleGameObjects = Object.keys(loadedGame[this.currentState]['actions'][action])
      // If user typed a valid action, check if its also on a valid gameobject
      if (util.isInArray(gameObject1, possibleGameObjects)) {
        // If a user wants to combine a valid gameobject
        if (combine === 'with' && gameObject2 !== undefined && loadedGame[this.currentState]['actions'][action][gameObject1]['with'] !== undefined) {
          const possibleGameObjectsToCombine = Object.keys(loadedGame[this.currentState]['actions'][action][gameObject1]['with'])
          if (util.isInArray(gameObject2, possibleGameObjectsToCombine)) {
            if (loadedGame[this.currentState]['actions'][action][gameObject1]['with'][gameObject2]['nextState'] !== undefined) {
              this.currentState = loadedGame[this.currentState]['actions'][action][gameObject1]['with'][gameObject2]['nextState']
              renderer.output.push(loadedGame[this.currentState]['prompt'])
            } else if (loadedGame[this.currentState]['actions'][action][gameObject1]['with'][gameObject2]['prompt'] !== undefined) {
              renderer.output.push(loadedGame[this.currentState]['actions'][action][gameObject1]['with'][gameObject2]['prompt'])
            } else {
              renderer.invalidCommand()
            }
          } else {
            renderer.invalidCommand()
          }
        }
        // If a prompt on gameobject exists, push it to renderer.output array
        else if (loadedGame[this.currentState]['actions'][action][gameObject1]['prompt'] !== undefined) {
          renderer.output.push(loadedGame[this.currentState]['actions'][action][gameObject1]['prompt'])
        }
        // If this gameObject change state, update current state with new state
        else if (loadedGame[this.currentState]['actions'][action][gameObject1]['nextState'] !== undefined) {
          this.currentState = loadedGame[this.currentState]['actions'][action][gameObject1]['nextState']
          renderer.output.push(loadedGame[this.currentState]['prompt'])
        } else {
          renderer.invalidCommand()
        }
      } else {
        renderer.invalidCommand()
      }
    } else {
      renderer.invalidCommand()
    }

    // Render renderer.output and cleanup array afterwards
    renderer.render()
    if (this.currentState === 'end') {
      exit()
    }
  }
}

export default game
