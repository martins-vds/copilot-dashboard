FROM mcr.microsoft.com/devcontainers/typescript-node:1-18-bullseye

RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg && \
    mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg && \
    sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/debian/$(lsb_release -rs | cut -d'.' -f 1)/prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list' && \
    apt update && apt -y upgrade && \
    apt install azure-functions-core-tools-4 && \
    curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash && \
    az upgrade --all --yes --only-show-errors && \
    az bicep install && \
    npm install -g npm@latest && \
    npm install -g typescript && \
    npm install -g @azure/static-web-apps-cli && \
    npm install -g npm-check-updates