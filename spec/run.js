import Jasmine from 'jasmine'

// Jasmine and ES6: https://gist.github.com/mauvm/172878a9646095d03fd7

const jasmine = new Jasmine()
jasmine.loadConfigFile('./spec/support/jasmine.json')
jasmine.execute()
