let path = require('path');
let fs = require('fs');
let appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => {
    return path.resolve(appDirectory, relativePath);
};

// Config after eject: we're in ./config/
module.exports = {
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('docs/index.js'),
    buildIndexJs: resolveApp('components/index.tsx'),
    appSrc: resolveApp('lib')
};
