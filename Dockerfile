FROM node:18

LABEL org.opencontainers.image.source https://github.com/marcaureln/tg-dl-bot

RUN apt-get update && \
    apt-get install -y make git zlib1g-dev libssl-dev gperf cmake clang libc++-dev libc++abi-dev && \ 
    rm -rf /var/lib/apt/lists/* && \ 
    apt-get clean

RUN git clone --recursive https://github.com/tdlib/telegram-bot-api.git && \
    cd telegram-bot-api && \
    rm -rf build && \
    mkdir build && \
    cd build && \
    CXXFLAGS="-stdlib=libc++" CC=/usr/bin/clang CXX=/usr/bin/clang++ cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX:PATH=/usr/local .. && \
    cmake --build . --target install

COPY . /tg-dl-bot

RUN cd /tg-dl-bot && \
    yarn install && \
    yarn build

WORKDIR /tg-dl-bot

CMD telegram-bot-api --local & \
    node dist/index.js

EXPOSE 8081