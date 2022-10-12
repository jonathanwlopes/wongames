"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'POST',
            path: '/game/populate',
            handler: 'game.populate',
            config: {
                policies: []
            },
        },
    ],
};
