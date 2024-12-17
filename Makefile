install:
	python3 -m pip install --upgrade pip
	pip install -r requirements.txt

test:
	pytest tests/

format:
	black .
	isort .

lint:
	flake8 .

run:
	python3 app.py