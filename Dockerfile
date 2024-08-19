FROM node:22-slim

# Atualiza os pacotes e instala as dependências
RUN apt-get update && \
    apt-get install -y \
    gnupg \
    curl \
    lsb-release \
    apt-transport-https

# Adiciona o repositório oficial do Fish Shell
RUN curl -fsSL https://download.opensuse.org/repositories/shells:fish:release:3/Debian_11/Release.key | apt-key add - && \
    echo "deb http://download.opensuse.org/repositories/shells:fish:release:3/Debian_11/ /" > /etc/apt/sources.list.d/shells:fish:release:3.list

# Atualiza os pacotes e instala o Fish Shell
RUN apt-get update && \
    apt-get install -y fish && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Define o Fish Shell como shell padrão
SHELL ["/usr/bin/fish", "-c"]

USER node

WORKDIR  /home/node/app

CMD [ "tail", "-f", "/dev/null" ]