FROM node:22-slim

RUN apt-get update && \
    apt-get install -y \
    gnupg \
    curl \
    lsb-release \
    apt-transport-https \
    tar \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://download.opensuse.org/repositories/shells:fish:release:3/Debian_11/Release.key | apt-key add - && \
    echo "deb http://download.opensuse.org/repositories/shells:fish:release:3/Debian_11/ /" > /etc/apt/sources.list.d/shells:fish:release:3.list

RUN apt-get update && \
    apt-get install -y fish && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Baixe e instale o Starship
RUN curl -fsSL https://github.com/starship/starship/releases/latest/download/starship-x86_64-unknown-linux-musl.tar.gz | \
    tar -xzC /usr/local/bin starship

# Crie diretórios e configure o Starship para o usuário node
USER root

RUN mkdir -p /home/node/.config/fish && \
    chown -R node:node /home/node/.config && \
    echo 'starship init fish | source' > /home/node/.config/fish/config.fish

USER node

# Defina o Fish Shell como o shell padrão
SHELL ["/usr/bin/fish", "-c"]

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]
