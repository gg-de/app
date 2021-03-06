# Aplicativo GG-DE - Gerador de Grade para Desempenho Educacional

## Installation

### Install nvm

* <code>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash</code>

Close the terminal and run the following command:
* <code>command -v nvm</code>

It should print 'nvm' if the installation was successful

### Install node with nvm

* <code>nvm install node</code>

### Install expo

* <code>npm install expo-cli --global</code>

### Possible problems

#### System limit for number of file watchers reached 

* <code>echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p</code>

## Usage

### Start project
* <code>expo start</code>

### Run ESLint
* <code>npx eslint src/** --fix --no-error-on-unmatched-pattern</code>
