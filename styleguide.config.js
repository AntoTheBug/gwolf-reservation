const path = require('path');
const rewireLess = require('react-app-rewire-less');
const rewireSVGR = require('react-app-rewire-svgr');

module.exports = {
    title: 'react-components style guide',
    template: {
        head: {
            // TODO DAMIANO: uncomment this line when you want to enable Firebug Lite in styleguide (dev.only)
            //scripts:[{src: 'http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js', type: 'text/javascript'}],
            /* FIXME DAMIANO remove these and their files if a solution to https://github.com/facebook/create-react-app/issues/6291 is found */
            links: [
                { rel: 'stylesheet', href: 'public/react-table.static.css' },
                { rel: 'stylesheet', href: 'public/ReactToastify.static.css' },
                { rel: 'stylesheet', href: 'public/antd-grid-index.static.css' },
                { rel: 'icon', type: 'image/x-icon', href: 'public/favicon.ico' }
            ]
        }
    },
    require: [
        path.join(__dirname, 'node_modules/react-table/react-table.css'),
        path.join(__dirname, 'src/lib/Table/css/react-table-custom-styleguide.css'),
        path.join(__dirname, 'src/lib/css/ReactComponents.less'),
        'core-js/es6',
        'core-js/es7/array',
        'raf/polyfill'
    ],
    styleguideComponents: {
        Wrapper: path.join(__dirname, 'src/lib/styleguide/Wrapper')
    },
    sections: [
        {
            name: 'Note on style',
            content: './styleguide.md'
        },
        {
            name: 'Components',
            components: 'src/lib/*/**/*.jsx'
        }
    ],
    skipComponentsWithoutExample: true,
    dangerouslyUpdateWebpackConfig: function(webpackConfig, env) {
        webpackConfig = rewireLess.withLoaderOptions({
            javascriptEnabled: true
        })(webpackConfig, env);
        webpackConfig = rewireSVGR(webpackConfig, env);
        return webpackConfig;
    }
};
