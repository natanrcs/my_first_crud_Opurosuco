FROM python:3.12-slim

RUN apt update && apt install -y wget 

WORKDIR /backend

COPY . .

RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]