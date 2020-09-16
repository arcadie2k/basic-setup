"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const utils_1 = require("./utils");
const exampleMiddleware_1 = require("./middleware/exampleMiddleware");
const Post_1 = require("./entity/Post");
dotenv_1.default.config();
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Post_1.Post],
        logging: true,
        synchronize: true
    });
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(exampleMiddleware_1.exampleMiddleware);
    app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield Post_1.Post.find();
        res.json(posts);
    }));
    if (utils_1.PROD) {
        app.use(express_1.default.static(path_1.default.resolve(__dirname, '../client/build')));
    }
    app.listen(utils_1.PORT, () => console.log(`APP RUNNING ON ** http://localhost:${utils_1.PORT} **`));
});
init();
