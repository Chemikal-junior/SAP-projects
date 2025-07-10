# Small language model in Python

It is 6-gram language model trained on [Shakespeare](./input.txt). 

More information on [Wikipedia](https://en.wikipedia.org/wiki/Word_n-gram_language_model).

## Installation

Install [Python](https://www.python.org/downloads/).

## Running the program
To train LM, use Python to run [training.py](./training.py). LM will be saved in [analysis.json](./analysis.json).

```bash
python training.py
```

To generete some text, run [generate.py](./generate.py).

```bash
python generate.py
```

## License

Copyright © 2025 Dvořák Milan

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
