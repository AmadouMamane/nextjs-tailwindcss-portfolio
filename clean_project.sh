rm -rf .next node_modules package-lock.json yarn.lock
npm cache clean --force
npm install
npm run build
npm run dev


npm install next@latest react@latest react-dom@latest --force
npm install
npm run build
npm run dev



npm install framer-motion@latest
rm -rf node_modules package-lock.json .next
npm install
npm run build
npm run dev


brew install trash
trash node_modules
rm -rf ~/.Trash/*

npm install
