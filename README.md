## Neat innit?

Keep track of who's in the lead in our World Cup bracket thing.

## Development

```bash
# Run the local dev server
bun run dev

# Build into ./dist
bun run build
```

The app hits this [World Cup 2026 API](https://github.com/rezarahiminia/worldcup2026) to get the latest games data. The API can be a bit slow so I've also pre-fetched the games data and dumped it into `./src/games.json` which is preloaded before the API fetch. This keeps things snappy on first load.

To pre-fetch the data again:

```bash
# Fetch the data, get the `games` value out, format it, and drop it into the file
curl https://worldcup26.ir/get/games | jq .games > src/games.json
# Push the new data and let it deploy
git add .
git commit -m "Update pre-fetched data"
git push
```

## Deployment

Deploys happen automatically on merge to `main` via a Github action
