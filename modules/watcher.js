const fs = require('fs');
const path = require('path');
const csv = require('convert-csv-to-json');

class Watcher {
  constructor(args) {
    this.path = args.path;
    this.emitter = args.emitter;
    this.cleanup();
  }

  getItemName(file) {
    const result = file.match(/-(.*?)-/);
    return result[1];
  }

  start() {
    fs.watch(this.path, { persistent: true }, (event, file) => {
      if (event == 'rename') {
        const filepath = path.join(this.path, file);
        const name = this.getItemName(file);
        setTimeout(() => {
          const data = csv.fieldDelimiter(',').getJsonFromCsv(filepath);
          this.emitter.emit('file', { name: name, orders: data });
        }, 200);
      }
    });
  }

  cleanup() {
    const files = fs.readdirSync(this.path);
    files.forEach(file => fs.unlinkSync(path.join(this.path, file)));
  }
}

module.exports = { Watcher };
