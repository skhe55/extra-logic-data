const fs = require('fs');

class AppService {
    getStaticPage(fileName = '', res) {
        try {
            fs.createReadStream(`${process.cwd()}/public/${fileName}`).pipe(res);
        } catch(error) {
            console.error(`AppService | getStaticPage: ${error}`);
        }
    }
}

module.exports = new AppService();