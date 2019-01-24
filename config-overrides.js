const { InjectBabelPlugin } = require('react-app-rewired');

// Override create-react-app settings without ejecting

module.export = function override(config, env) {
    return InjectBabelPlugin('@babel/plugin-proposal-optional-chaining', config);
};