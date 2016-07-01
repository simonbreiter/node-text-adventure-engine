# README

A simple engine for text-adventures, based on Node and YAML.

## How to play
If you just just want to play install the dependencies and run app.js
```bash
npm install
node app.js
```

## How to write your own adventures
The idea is to write your adventure as a state machine in YAML. The program will 
parse this JSON file and run your game on the commandline.

To write your adventure, you have to edit game_instructions.yml in the src folder. Every state has a
prompt, which will be prompted wenn this state is active. In each state you 
can define interactions with objects, which will either result in a transition to a new
state or a new prompt. It is also possible to combine mutliple objects to create new actions. You can define as many states and many interactions and object as you like.

```yaml
---
  q0:
    prompt: "You wake up in a bed in a dark room."
    actions:
      inspect:
        room:
          prompt: "The room is pretty dark. You notice a door though."
        bed:
          prompt: "You notice a shovel under the bed."
        door:
          prompt: "A heavy door."
        shovel:
          prompt: "You want to use the shovel, but with what?"
          with:
            door:
              nextState: "q2"
```

## Author
Simon Breiter