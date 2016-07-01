# README

A simple engine for text-adventures, based on Node and JSON.

## How to use
The idea is to write your adventure as a state machine in JSON. The program will 
parse this JSON file and run your game on the commandline.

To write your adventure, you have to edit game_instructions.json in the src folder. Every state has a
prompt, which will be prompted wenn this state is active. In each state you 
can define interactions with objects, which will result in a transition to a new
state. You can define as many states and many interactions and object as you like.

```json
{
    "q1":{
        "prompt":"You wake up in a dark Room.",
        "actions": {
            "inspect": {
                "room": "q2"
            },
            "take": {
                "shovel": "q3"
            }

        }
    },
    "q2":{
        "prompt":"The room looks pretty empty. You notice a door.",
        "actions": {}
    }
}
```

## Author
Simon Breiter