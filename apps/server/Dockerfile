FROM golang:1.18

WORKDIR /app

COPY dist .
COPY .env .

RUN chmod +x main

CMD ["./main"]
