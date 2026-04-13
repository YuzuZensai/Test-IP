FROM oven/bun:1 as build
WORKDIR /home/node/app

COPY . .

RUN bun install

CMD ["bun", "run", "src/index.ts"]