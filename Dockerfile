FROM oven/bun:1.2 as build
WORKDIR /home/node/app

COPY . .

RUN bun install

CMD ["bun", "run", "src/index.ts"]