/**
 * @desc The renderer writes the output to the terminal
 */
const renderer = {
  output: [],
  clearOutput () {
    this.output = []
  },
    /**
     * @desc Clears screen and tell user that he can't do this.
     */
  invalidCommand () {
    this.clearScreen()
    this.output.push('You can\'t do that.')
  },
    /**
     * @desc Render screen
     */
  render () {
    this.clearScreen()
    console.log(this.output.join('\n'))
    this.clearOutput()
  },
    /**
     * @desc Clear screen
     */
  clearScreen () {
    process.stdout.write('\u001b[2J\u001b[0;0H')
  }
}

export default renderer
