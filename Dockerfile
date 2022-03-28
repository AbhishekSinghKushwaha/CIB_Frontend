FROM node:14 as builder

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force


RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN npm run build --env=dev
## Production mode build
# RUN $(npm bin)/ng build --env=staging --prod --build-optimizer


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# COPY nginx.conf /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /ng-app/dist/CIB /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]