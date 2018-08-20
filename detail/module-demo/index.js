const show = require("./src/show.js");
const setContainerFontSize = require("./src/test/test.js");
require("./src/index.css");
require("./src/index.less");
require("./src/index.scss");
require("./src/test/test.less")

show("webpack");
setContainerFontSize("28px");