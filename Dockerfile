FROM ubuntu:22.04

LABEL org.opencontainers.image.source https://github.com/marcaureln/tg-dl-bot

ARG BUILD_TYPE=Release

RUN apt-get update && \
    apt-get install -y make git zlib1g-dev libssl-dev gperf cmake clang-14 libc++-dev libc++abi-dev && \ 
    rm -rf /var/lib/apt/lists/* && \ 
    apt-get clean

RUN git clone --recursive https://github.com/tdlib/telegram-bot-api.git && \
    cd telegram-bot-api && \
    rm -rf build && \
    mkdir build && \
    cd build && \
    CXXFLAGS="-stdlib=libc++" CC=/usr/bin/clang-14 CXX=/usr/bin/clang++-14 cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX:PATH=/usr/local .. && \
    cmake --build . --target install

CMD telegram-bot-api --local

EXPOSE 8081