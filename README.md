# README

A simple engine for text-adventures, based on Node.js and YAML.

## How to play
If you just just want to play install the dependencies and run app.js
```bash
npm install
node app.js
```

## How to write your own adventures
The idea is to write your adventure as a state machine in YAML. The program will 
parse this YAML file and run your game on the commandline.

To write your adventure, you have to edit game_instructions.yml in the src folder. Every state has a
prompt, which will be prompted wenn this state is active. In each state you 
can define interactions with objects, which will either result in a transition to a new
state or a new prompt. It is also possible to combine multiple objects to create new actions. You can define as many states and many interactions and object as you like.

```yaml
---
  # Define as many states as you want
  q0:
    # Every state has a prompt, which will be prompted when state becomes active
    prompt: "You wake up in a bed in a dark room."
    # In every state, you can define interactions (verbs) with your environment
    actions:
      inspect:
        # You can define gameobjects (nouns) to interact with
        room:
          # Each interactions with a gameobject leads to a new prompt on the same state... 
          prompt: "The room is pretty dark. You notice a door."
      take:
        axe: 
          # ... or even a new state
          nextState: "q1"
      use:
        shovel:
          prompt: "You want to use the shovel, but with what?"
          # You can even combine gameobjects and create new interactions
          with:
            door:
              nextState: "q2"
```

## Author
Simon Breiter