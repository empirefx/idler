/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $TypeError = $util.global.TypeError, $String = $util.global.String, $Boolean = $util.global.Boolean, $Number = $util.global.Number, $Array = $util.global.Array, $isFinite = $util.global.isFinite;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const game = $root.game = (() => {

    /**
     * Namespace game.
     * @exports game
     * @namespace
     */
    const game = {};

    game.JoinRequest = (function() {

        /**
         * Properties of a JoinRequest.
         * @typedef {Object} game.JoinRequest.$Properties
         * @property {string|null} [nickname] JoinRequest nickname
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a JoinRequest.
         * @memberof game
         * @interface IJoinRequest
         * @augments game.JoinRequest.$Properties
         * @deprecated Use game.JoinRequest.$Properties instead.
         */

        /**
         * Shape of a JoinRequest.
         * @typedef {game.JoinRequest.$Properties} game.JoinRequest.$Shape
         */

        /**
         * Constructs a new JoinRequest.
         * @memberof game
         * @classdesc Represents a JoinRequest.
         * @constructor
         * @param {game.JoinRequest.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const JoinRequest = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * JoinRequest nickname.
         * @member {string} nickname
         * @memberof game.JoinRequest
         * @instance
         */
        JoinRequest.prototype.nickname = "";

        /**
         * Creates a new JoinRequest instance using the specified properties.
         * @function create
         * @memberof game.JoinRequest
         * @static
         * @param {game.JoinRequest.$Properties=} [properties] Properties to set
         * @returns {game.JoinRequest} JoinRequest instance
         * @type {{
         *   (properties: game.JoinRequest.$Shape): game.JoinRequest & game.JoinRequest.$Shape;
         *   (properties?: game.JoinRequest.$Properties): game.JoinRequest;
         * }}
         */
        JoinRequest.create = function(properties) {
            return new JoinRequest(properties);
        };

        /**
         * Encodes the specified JoinRequest message. Does not implicitly {@link game.JoinRequest.verify|verify} messages.
         * @function encode
         * @memberof game.JoinRequest
         * @static
         * @param {game.JoinRequest.$Properties} message JoinRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRequest.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.nickname != null && $Object.hasOwnProperty.call(message, "nickname") && message.nickname !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.nickname);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified JoinRequest message, length delimited. Does not implicitly {@link game.JoinRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.JoinRequest
         * @static
         * @param {game.JoinRequest.$Properties} message JoinRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRequest.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a JoinRequest message from the specified reader or buffer.
         * @function decode
         * @memberof game.JoinRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.JoinRequest & game.JoinRequest.$Shape} JoinRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRequest.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.game.JoinRequest(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.nickname = value;
                        else
                            delete message.nickname;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a JoinRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.JoinRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.JoinRequest & game.JoinRequest.$Shape} JoinRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRequest.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinRequest message.
         * @function verify
         * @memberof game.JoinRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRequest.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.nickname != null && $Object.hasOwnProperty.call(message, "nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            return null;
        };

        /**
         * Creates a JoinRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.JoinRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.JoinRequest} JoinRequest
         */
        JoinRequest.fromObject = function (object, _depth) {
            if (object instanceof $root.game.JoinRequest)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".game.JoinRequest: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.game.JoinRequest();
            if (object.nickname != null)
                if (typeof object.nickname !== "string" || object.nickname.length)
                    message.nickname = $String(object.nickname);
            return message;
        };

        /**
         * Creates a plain object from a JoinRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.JoinRequest
         * @static
         * @param {game.JoinRequest} message JoinRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRequest.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.nickname = "";
            if (message.nickname != null && $Object.hasOwnProperty.call(message, "nickname"))
                object.nickname = message.nickname;
            return object;
        };

        /**
         * Converts this JoinRequest to JSON.
         * @function toJSON
         * @memberof game.JoinRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRequest.prototype.toJSON = function() {
            return JoinRequest.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for JoinRequest
         * @function getTypeUrl
         * @memberof game.JoinRequest
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        JoinRequest.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/game.JoinRequest";
        };

        return JoinRequest;
    })();

    game.JoinResponse = (function() {

        /**
         * Properties of a JoinResponse.
         * @typedef {Object} game.JoinResponse.$Properties
         * @property {string|null} [sessionId] JoinResponse sessionId
         * @property {boolean|null} [accepted] JoinResponse accepted
         * @property {string|null} [error] JoinResponse error
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a JoinResponse.
         * @memberof game
         * @interface IJoinResponse
         * @augments game.JoinResponse.$Properties
         * @deprecated Use game.JoinResponse.$Properties instead.
         */

        /**
         * Shape of a JoinResponse.
         * @typedef {game.JoinResponse.$Properties} game.JoinResponse.$Shape
         */

        /**
         * Constructs a new JoinResponse.
         * @memberof game
         * @classdesc Represents a JoinResponse.
         * @constructor
         * @param {game.JoinResponse.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const JoinResponse = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * JoinResponse sessionId.
         * @member {string} sessionId
         * @memberof game.JoinResponse
         * @instance
         */
        JoinResponse.prototype.sessionId = "";

        /**
         * JoinResponse accepted.
         * @member {boolean} accepted
         * @memberof game.JoinResponse
         * @instance
         */
        JoinResponse.prototype.accepted = false;

        /**
         * JoinResponse error.
         * @member {string} error
         * @memberof game.JoinResponse
         * @instance
         */
        JoinResponse.prototype.error = "";

        /**
         * Creates a new JoinResponse instance using the specified properties.
         * @function create
         * @memberof game.JoinResponse
         * @static
         * @param {game.JoinResponse.$Properties=} [properties] Properties to set
         * @returns {game.JoinResponse} JoinResponse instance
         * @type {{
         *   (properties: game.JoinResponse.$Shape): game.JoinResponse & game.JoinResponse.$Shape;
         *   (properties?: game.JoinResponse.$Properties): game.JoinResponse;
         * }}
         */
        JoinResponse.create = function(properties) {
            return new JoinResponse(properties);
        };

        /**
         * Encodes the specified JoinResponse message. Does not implicitly {@link game.JoinResponse.verify|verify} messages.
         * @function encode
         * @memberof game.JoinResponse
         * @static
         * @param {game.JoinResponse.$Properties} message JoinResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinResponse.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId") && message.sessionId !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sessionId);
            if (message.accepted != null && $Object.hasOwnProperty.call(message, "accepted") && message.accepted !== false)
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.accepted);
            if (message.error != null && $Object.hasOwnProperty.call(message, "error") && message.error !== "")
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.error);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified JoinResponse message, length delimited. Does not implicitly {@link game.JoinResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.JoinResponse
         * @static
         * @param {game.JoinResponse.$Properties} message JoinResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinResponse.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a JoinResponse message from the specified reader or buffer.
         * @function decode
         * @memberof game.JoinResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.JoinResponse & game.JoinResponse.$Shape} JoinResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinResponse.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.game.JoinResponse(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.sessionId = value;
                        else
                            delete message.sessionId;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.accepted = value;
                        else
                            delete message.accepted;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.error = value;
                        else
                            delete message.error;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a JoinResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.JoinResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.JoinResponse & game.JoinResponse.$Shape} JoinResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinResponse.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinResponse message.
         * @function verify
         * @memberof game.JoinResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinResponse.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId"))
                if (!$util.isString(message.sessionId))
                    return "sessionId: string expected";
            if (message.accepted != null && $Object.hasOwnProperty.call(message, "accepted"))
                if (typeof message.accepted !== "boolean")
                    return "accepted: boolean expected";
            if (message.error != null && $Object.hasOwnProperty.call(message, "error"))
                if (!$util.isString(message.error))
                    return "error: string expected";
            return null;
        };

        /**
         * Creates a JoinResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.JoinResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.JoinResponse} JoinResponse
         */
        JoinResponse.fromObject = function (object, _depth) {
            if (object instanceof $root.game.JoinResponse)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".game.JoinResponse: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.game.JoinResponse();
            if (object.sessionId != null)
                if (typeof object.sessionId !== "string" || object.sessionId.length)
                    message.sessionId = $String(object.sessionId);
            if (object.accepted != null)
                if (object.accepted)
                    message.accepted = $Boolean(object.accepted);
            if (object.error != null)
                if (typeof object.error !== "string" || object.error.length)
                    message.error = $String(object.error);
            return message;
        };

        /**
         * Creates a plain object from a JoinResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.JoinResponse
         * @static
         * @param {game.JoinResponse} message JoinResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinResponse.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.sessionId = "";
                object.accepted = false;
                object.error = "";
            }
            if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId"))
                object.sessionId = message.sessionId;
            if (message.accepted != null && $Object.hasOwnProperty.call(message, "accepted"))
                object.accepted = message.accepted;
            if (message.error != null && $Object.hasOwnProperty.call(message, "error"))
                object.error = message.error;
            return object;
        };

        /**
         * Converts this JoinResponse to JSON.
         * @function toJSON
         * @memberof game.JoinResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinResponse.prototype.toJSON = function() {
            return JoinResponse.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for JoinResponse
         * @function getTypeUrl
         * @memberof game.JoinResponse
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        JoinResponse.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/game.JoinResponse";
        };

        return JoinResponse;
    })();

    game.LeaveNotification = (function() {

        /**
         * Properties of a LeaveNotification.
         * @typedef {Object} game.LeaveNotification.$Properties
         * @property {string|null} [reason] LeaveNotification reason
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a LeaveNotification.
         * @memberof game
         * @interface ILeaveNotification
         * @augments game.LeaveNotification.$Properties
         * @deprecated Use game.LeaveNotification.$Properties instead.
         */

        /**
         * Shape of a LeaveNotification.
         * @typedef {game.LeaveNotification.$Properties} game.LeaveNotification.$Shape
         */

        /**
         * Constructs a new LeaveNotification.
         * @memberof game
         * @classdesc Represents a LeaveNotification.
         * @constructor
         * @param {game.LeaveNotification.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const LeaveNotification = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * LeaveNotification reason.
         * @member {string} reason
         * @memberof game.LeaveNotification
         * @instance
         */
        LeaveNotification.prototype.reason = "";

        /**
         * Creates a new LeaveNotification instance using the specified properties.
         * @function create
         * @memberof game.LeaveNotification
         * @static
         * @param {game.LeaveNotification.$Properties=} [properties] Properties to set
         * @returns {game.LeaveNotification} LeaveNotification instance
         * @type {{
         *   (properties: game.LeaveNotification.$Shape): game.LeaveNotification & game.LeaveNotification.$Shape;
         *   (properties?: game.LeaveNotification.$Properties): game.LeaveNotification;
         * }}
         */
        LeaveNotification.create = function(properties) {
            return new LeaveNotification(properties);
        };

        /**
         * Encodes the specified LeaveNotification message. Does not implicitly {@link game.LeaveNotification.verify|verify} messages.
         * @function encode
         * @memberof game.LeaveNotification
         * @static
         * @param {game.LeaveNotification.$Properties} message LeaveNotification message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveNotification.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.reason != null && $Object.hasOwnProperty.call(message, "reason") && message.reason !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.reason);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified LeaveNotification message, length delimited. Does not implicitly {@link game.LeaveNotification.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.LeaveNotification
         * @static
         * @param {game.LeaveNotification.$Properties} message LeaveNotification message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveNotification.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a LeaveNotification message from the specified reader or buffer.
         * @function decode
         * @memberof game.LeaveNotification
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.LeaveNotification & game.LeaveNotification.$Shape} LeaveNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveNotification.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.game.LeaveNotification(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.reason = value;
                        else
                            delete message.reason;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a LeaveNotification message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.LeaveNotification
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.LeaveNotification & game.LeaveNotification.$Shape} LeaveNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveNotification.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LeaveNotification message.
         * @function verify
         * @memberof game.LeaveNotification
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LeaveNotification.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.reason != null && $Object.hasOwnProperty.call(message, "reason"))
                if (!$util.isString(message.reason))
                    return "reason: string expected";
            return null;
        };

        /**
         * Creates a LeaveNotification message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.LeaveNotification
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.LeaveNotification} LeaveNotification
         */
        LeaveNotification.fromObject = function (object, _depth) {
            if (object instanceof $root.game.LeaveNotification)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".game.LeaveNotification: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.game.LeaveNotification();
            if (object.reason != null)
                if (typeof object.reason !== "string" || object.reason.length)
                    message.reason = $String(object.reason);
            return message;
        };

        /**
         * Creates a plain object from a LeaveNotification message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.LeaveNotification
         * @static
         * @param {game.LeaveNotification} message LeaveNotification
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LeaveNotification.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.reason = "";
            if (message.reason != null && $Object.hasOwnProperty.call(message, "reason"))
                object.reason = message.reason;
            return object;
        };

        /**
         * Converts this LeaveNotification to JSON.
         * @function toJSON
         * @memberof game.LeaveNotification
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeaveNotification.prototype.toJSON = function() {
            return LeaveNotification.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for LeaveNotification
         * @function getTypeUrl
         * @memberof game.LeaveNotification
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        LeaveNotification.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/game.LeaveNotification";
        };

        return LeaveNotification;
    })();

    game.InventoryAction = (function() {

        /**
         * Properties of an InventoryAction.
         * @typedef {Object} game.InventoryAction.$Properties
         * @property {string|null} [actionType] InventoryAction actionType
         * @property {string|null} [itemId] InventoryAction itemId
         * @property {string|null} [templateId] InventoryAction templateId
         * @property {number|null} [quantity] InventoryAction quantity
         * @property {string|null} [fromInventory] InventoryAction fromInventory
         * @property {string|null} [toInventory] InventoryAction toInventory
         * @property {string|null} [slot] InventoryAction slot
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of an InventoryAction.
         * @memberof game
         * @interface IInventoryAction
         * @augments game.InventoryAction.$Properties
         * @deprecated Use game.InventoryAction.$Properties instead.
         */

        /**
         * Shape of an InventoryAction.
         * @typedef {game.InventoryAction.$Properties} game.InventoryAction.$Shape
         */

        /**
         * Constructs a new InventoryAction.
         * @memberof game
         * @classdesc Represents an InventoryAction.
         * @constructor
         * @param {game.InventoryAction.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const InventoryAction = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * InventoryAction actionType.
         * @member {string} actionType
         * @memberof game.InventoryAction
         * @instance
         */
        InventoryAction.prototype.actionType = "";

        /**
         * InventoryAction itemId.
         * @member {string} itemId
         * @memberof game.InventoryAction
         * @instance
         */
        InventoryAction.prototype.itemId = "";

        /**
         * InventoryAction templateId.
         * @member {string} templateId
         * @memberof game.InventoryAction
         * @instance
         */
        InventoryAction.prototype.templateId = "";

        /**
         * InventoryAction quantity.
         * @member {number} quantity
         * @memberof game.InventoryAction
         * @instance
         */
        InventoryAction.prototype.quantity = 0;

        /**
         * InventoryAction fromInventory.
         * @member {string} fromInventory
         * @memberof game.InventoryAction
         * @instance
         */
        InventoryAction.prototype.fromInventory = "";

        /**
         * InventoryAction toInventory.
         * @member {string} toInventory
         * @memberof game.InventoryAction
         * @instance
         */
        InventoryAction.prototype.toInventory = "";

        /**
         * InventoryAction slot.
         * @member {string} slot
         * @memberof game.InventoryAction
         * @instance
         */
        InventoryAction.prototype.slot = "";

        /**
         * Creates a new InventoryAction instance using the specified properties.
         * @function create
         * @memberof game.InventoryAction
         * @static
         * @param {game.InventoryAction.$Properties=} [properties] Properties to set
         * @returns {game.InventoryAction} InventoryAction instance
         * @type {{
         *   (properties: game.InventoryAction.$Shape): game.InventoryAction & game.InventoryAction.$Shape;
         *   (properties?: game.InventoryAction.$Properties): game.InventoryAction;
         * }}
         */
        InventoryAction.create = function(properties) {
            return new InventoryAction(properties);
        };

        /**
         * Encodes the specified InventoryAction message. Does not implicitly {@link game.InventoryAction.verify|verify} messages.
         * @function encode
         * @memberof game.InventoryAction
         * @static
         * @param {game.InventoryAction.$Properties} message InventoryAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InventoryAction.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.actionType != null && $Object.hasOwnProperty.call(message, "actionType") && message.actionType !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.actionType);
            if (message.itemId != null && $Object.hasOwnProperty.call(message, "itemId") && message.itemId !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.itemId);
            if (message.templateId != null && $Object.hasOwnProperty.call(message, "templateId") && message.templateId !== "")
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.templateId);
            if (message.quantity != null && $Object.hasOwnProperty.call(message, "quantity") && message.quantity !== 0)
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.quantity);
            if (message.fromInventory != null && $Object.hasOwnProperty.call(message, "fromInventory") && message.fromInventory !== "")
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.fromInventory);
            if (message.toInventory != null && $Object.hasOwnProperty.call(message, "toInventory") && message.toInventory !== "")
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.toInventory);
            if (message.slot != null && $Object.hasOwnProperty.call(message, "slot") && message.slot !== "")
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.slot);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified InventoryAction message, length delimited. Does not implicitly {@link game.InventoryAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.InventoryAction
         * @static
         * @param {game.InventoryAction.$Properties} message InventoryAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InventoryAction.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes an InventoryAction message from the specified reader or buffer.
         * @function decode
         * @memberof game.InventoryAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.InventoryAction & game.InventoryAction.$Shape} InventoryAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InventoryAction.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.game.InventoryAction(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.actionType = value;
                        else
                            delete message.actionType;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.itemId = value;
                        else
                            delete message.itemId;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.templateId = value;
                        else
                            delete message.templateId;
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.quantity = value;
                        else
                            delete message.quantity;
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.fromInventory = value;
                        else
                            delete message.fromInventory;
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.toInventory = value;
                        else
                            delete message.toInventory;
                        continue;
                    }
                case 7: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.slot = value;
                        else
                            delete message.slot;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes an InventoryAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.InventoryAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.InventoryAction & game.InventoryAction.$Shape} InventoryAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InventoryAction.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InventoryAction message.
         * @function verify
         * @memberof game.InventoryAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InventoryAction.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.actionType != null && $Object.hasOwnProperty.call(message, "actionType"))
                if (!$util.isString(message.actionType))
                    return "actionType: string expected";
            if (message.itemId != null && $Object.hasOwnProperty.call(message, "itemId"))
                if (!$util.isString(message.itemId))
                    return "itemId: string expected";
            if (message.templateId != null && $Object.hasOwnProperty.call(message, "templateId"))
                if (!$util.isString(message.templateId))
                    return "templateId: string expected";
            if (message.quantity != null && $Object.hasOwnProperty.call(message, "quantity"))
                if (!$util.isInteger(message.quantity))
                    return "quantity: integer expected";
            if (message.fromInventory != null && $Object.hasOwnProperty.call(message, "fromInventory"))
                if (!$util.isString(message.fromInventory))
                    return "fromInventory: string expected";
            if (message.toInventory != null && $Object.hasOwnProperty.call(message, "toInventory"))
                if (!$util.isString(message.toInventory))
                    return "toInventory: string expected";
            if (message.slot != null && $Object.hasOwnProperty.call(message, "slot"))
                if (!$util.isString(message.slot))
                    return "slot: string expected";
            return null;
        };

        /**
         * Creates an InventoryAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.InventoryAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.InventoryAction} InventoryAction
         */
        InventoryAction.fromObject = function (object, _depth) {
            if (object instanceof $root.game.InventoryAction)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".game.InventoryAction: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.game.InventoryAction();
            if (object.actionType != null)
                if (typeof object.actionType !== "string" || object.actionType.length)
                    message.actionType = $String(object.actionType);
            if (object.itemId != null)
                if (typeof object.itemId !== "string" || object.itemId.length)
                    message.itemId = $String(object.itemId);
            if (object.templateId != null)
                if (typeof object.templateId !== "string" || object.templateId.length)
                    message.templateId = $String(object.templateId);
            if (object.quantity != null)
                if ($Number(object.quantity) !== 0)
                    message.quantity = object.quantity | 0;
            if (object.fromInventory != null)
                if (typeof object.fromInventory !== "string" || object.fromInventory.length)
                    message.fromInventory = $String(object.fromInventory);
            if (object.toInventory != null)
                if (typeof object.toInventory !== "string" || object.toInventory.length)
                    message.toInventory = $String(object.toInventory);
            if (object.slot != null)
                if (typeof object.slot !== "string" || object.slot.length)
                    message.slot = $String(object.slot);
            return message;
        };

        /**
         * Creates a plain object from an InventoryAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.InventoryAction
         * @static
         * @param {game.InventoryAction} message InventoryAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InventoryAction.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.actionType = "";
                object.itemId = "";
                object.templateId = "";
                object.quantity = 0;
                object.fromInventory = "";
                object.toInventory = "";
                object.slot = "";
            }
            if (message.actionType != null && $Object.hasOwnProperty.call(message, "actionType"))
                object.actionType = message.actionType;
            if (message.itemId != null && $Object.hasOwnProperty.call(message, "itemId"))
                object.itemId = message.itemId;
            if (message.templateId != null && $Object.hasOwnProperty.call(message, "templateId"))
                object.templateId = message.templateId;
            if (message.quantity != null && $Object.hasOwnProperty.call(message, "quantity"))
                object.quantity = message.quantity;
            if (message.fromInventory != null && $Object.hasOwnProperty.call(message, "fromInventory"))
                object.fromInventory = message.fromInventory;
            if (message.toInventory != null && $Object.hasOwnProperty.call(message, "toInventory"))
                object.toInventory = message.toInventory;
            if (message.slot != null && $Object.hasOwnProperty.call(message, "slot"))
                object.slot = message.slot;
            return object;
        };

        /**
         * Converts this InventoryAction to JSON.
         * @function toJSON
         * @memberof game.InventoryAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InventoryAction.prototype.toJSON = function() {
            return InventoryAction.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for InventoryAction
         * @function getTypeUrl
         * @memberof game.InventoryAction
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        InventoryAction.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/game.InventoryAction";
        };

        return InventoryAction;
    })();

    game.InventorySnapshot = (function() {

        /**
         * Properties of an InventorySnapshot.
         * @typedef {Object} game.InventorySnapshot.$Properties
         * @property {string|null} [inventoryId] InventorySnapshot inventoryId
         * @property {Array.<game.Item.$Properties>|null} [items] InventorySnapshot items
         * @property {number|null} [maxSlots] InventorySnapshot maxSlots
         * @property {number|null} [maxWeight] InventorySnapshot maxWeight
         * @property {number|null} [currentWeight] InventorySnapshot currentWeight
         * @property {Object.<string,game.Item.$Properties>|null} [equipment] InventorySnapshot equipment
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of an InventorySnapshot.
         * @memberof game
         * @interface IInventorySnapshot
         * @augments game.InventorySnapshot.$Properties
         * @deprecated Use game.InventorySnapshot.$Properties instead.
         */

        /**
         * Shape of an InventorySnapshot.
         * @typedef {game.InventorySnapshot.$Properties} game.InventorySnapshot.$Shape
         */

        /**
         * Constructs a new InventorySnapshot.
         * @memberof game
         * @classdesc Represents an InventorySnapshot.
         * @constructor
         * @param {game.InventorySnapshot.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const InventorySnapshot = function (properties) {
            this.items = [];
            this.equipment = {};
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * InventorySnapshot inventoryId.
         * @member {string} inventoryId
         * @memberof game.InventorySnapshot
         * @instance
         */
        InventorySnapshot.prototype.inventoryId = "";

        /**
         * InventorySnapshot items.
         * @member {Array.<game.Item.$Properties>} items
         * @memberof game.InventorySnapshot
         * @instance
         */
        InventorySnapshot.prototype.items = $util.emptyArray;

        /**
         * InventorySnapshot maxSlots.
         * @member {number} maxSlots
         * @memberof game.InventorySnapshot
         * @instance
         */
        InventorySnapshot.prototype.maxSlots = 0;

        /**
         * InventorySnapshot maxWeight.
         * @member {number} maxWeight
         * @memberof game.InventorySnapshot
         * @instance
         */
        InventorySnapshot.prototype.maxWeight = 0;

        /**
         * InventorySnapshot currentWeight.
         * @member {number} currentWeight
         * @memberof game.InventorySnapshot
         * @instance
         */
        InventorySnapshot.prototype.currentWeight = 0;

        /**
         * InventorySnapshot equipment.
         * @member {Object.<string,game.Item.$Properties>} equipment
         * @memberof game.InventorySnapshot
         * @instance
         */
        InventorySnapshot.prototype.equipment = $util.emptyObject;

        /**
         * Creates a new InventorySnapshot instance using the specified properties.
         * @function create
         * @memberof game.InventorySnapshot
         * @static
         * @param {game.InventorySnapshot.$Properties=} [properties] Properties to set
         * @returns {game.InventorySnapshot} InventorySnapshot instance
         * @type {{
         *   (properties: game.InventorySnapshot.$Shape): game.InventorySnapshot & game.InventorySnapshot.$Shape;
         *   (properties?: game.InventorySnapshot.$Properties): game.InventorySnapshot;
         * }}
         */
        InventorySnapshot.create = function(properties) {
            return new InventorySnapshot(properties);
        };

        /**
         * Encodes the specified InventorySnapshot message. Does not implicitly {@link game.InventorySnapshot.verify|verify} messages.
         * @function encode
         * @memberof game.InventorySnapshot
         * @static
         * @param {game.InventorySnapshot.$Properties} message InventorySnapshot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InventorySnapshot.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.inventoryId != null && $Object.hasOwnProperty.call(message, "inventoryId") && message.inventoryId !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.inventoryId);
            if (message.items != null && message.items.length)
                for (let i = 0; i < message.items.length; ++i)
                    $root.game.Item.encode(message.items[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.maxSlots != null && $Object.hasOwnProperty.call(message, "maxSlots") && message.maxSlots !== 0)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.maxSlots);
            if (message.maxWeight != null && $Object.hasOwnProperty.call(message, "maxWeight") && !$Object.is(message.maxWeight, 0))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.maxWeight);
            if (message.currentWeight != null && $Object.hasOwnProperty.call(message, "currentWeight") && !$Object.is(message.currentWeight, 0))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.currentWeight);
            if (message.equipment != null && $Object.hasOwnProperty.call(message, "equipment"))
                for (let keys = $Object.keys(message.equipment), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 6, wireType 2 =*/50).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.game.Item.encode(message.equipment[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim().ldelim();
                }
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified InventorySnapshot message, length delimited. Does not implicitly {@link game.InventorySnapshot.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.InventorySnapshot
         * @static
         * @param {game.InventorySnapshot.$Properties} message InventorySnapshot message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InventorySnapshot.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes an InventorySnapshot message from the specified reader or buffer.
         * @function decode
         * @memberof game.InventorySnapshot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.InventorySnapshot & game.InventorySnapshot.$Shape} InventorySnapshot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InventorySnapshot.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.game.InventorySnapshot(), key, value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.inventoryId = value;
                        else
                            delete message.inventoryId;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.game.Item.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.maxSlots = value;
                        else
                            delete message.maxSlots;
                        continue;
                    }
                case 4: {
                        if (wireType !== 5)
                            break;
                        if (!$Object.is(value = reader.float(), 0))
                            message.maxWeight = value;
                        else
                            delete message.maxWeight;
                        continue;
                    }
                case 5: {
                        if (wireType !== 5)
                            break;
                        if (!$Object.is(value = reader.float(), 0))
                            message.currentWeight = value;
                        else
                            delete message.currentWeight;
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        if (message.equipment === $util.emptyObject)
                            message.equipment = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = null;
                        while (reader.pos < end2) {
                            let tag2 = reader.tag();
                            wireType = tag2 & 7;
                            switch (tag2 >>>= 3) {
                            case 1:
                                if (wireType !== 2)
                                    break;
                                key = reader.stringVerify();
                                continue;
                            case 2:
                                if (wireType !== 2)
                                    break;
                                value = $root.game.Item.decode(reader, reader.uint32(), $undefined, _depth + 1, value);
                                continue;
                            }
                            reader.skipType(wireType, _depth, tag2);
                        }
                        if (key === "__proto__")
                            $util.makeProp(message.equipment, key);
                        message.equipment[key] = value || new $root.game.Item();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes an InventorySnapshot message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.InventorySnapshot
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.InventorySnapshot & game.InventorySnapshot.$Shape} InventorySnapshot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InventorySnapshot.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InventorySnapshot message.
         * @function verify
         * @memberof game.InventorySnapshot
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InventorySnapshot.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.inventoryId != null && $Object.hasOwnProperty.call(message, "inventoryId"))
                if (!$util.isString(message.inventoryId))
                    return "inventoryId: string expected";
            if (message.items != null && $Object.hasOwnProperty.call(message, "items")) {
                if (!$Array.isArray(message.items))
                    return "items: array expected";
                for (let i = 0; i < message.items.length; ++i) {
                    let error = $root.game.Item.verify(message.items[i], _depth + 1);
                    if (error)
                        return "items." + error;
                }
            }
            if (message.maxSlots != null && $Object.hasOwnProperty.call(message, "maxSlots"))
                if (!$util.isInteger(message.maxSlots))
                    return "maxSlots: integer expected";
            if (message.maxWeight != null && $Object.hasOwnProperty.call(message, "maxWeight"))
                if (typeof message.maxWeight !== "number")
                    return "maxWeight: number expected";
            if (message.currentWeight != null && $Object.hasOwnProperty.call(message, "currentWeight"))
                if (typeof message.currentWeight !== "number")
                    return "currentWeight: number expected";
            if (message.equipment != null && $Object.hasOwnProperty.call(message, "equipment")) {
                if (!$util.isObject(message.equipment))
                    return "equipment: object expected";
                let key = $Object.keys(message.equipment);
                for (let i = 0; i < key.length; ++i) {
                    let error = $root.game.Item.verify(message.equipment[key[i]], _depth + 1);
                    if (error)
                        return "equipment." + error;
                }
            }
            return null;
        };

        /**
         * Creates an InventorySnapshot message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.InventorySnapshot
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.InventorySnapshot} InventorySnapshot
         */
        InventorySnapshot.fromObject = function (object, _depth) {
            if (object instanceof $root.game.InventorySnapshot)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".game.InventorySnapshot: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.game.InventorySnapshot();
            if (object.inventoryId != null)
                if (typeof object.inventoryId !== "string" || object.inventoryId.length)
                    message.inventoryId = $String(object.inventoryId);
            if (object.items) {
                if (!$Array.isArray(object.items))
                    throw $TypeError(".game.InventorySnapshot.items: array expected");
                message.items = $Array(object.items.length);
                for (let i = 0; i < object.items.length; ++i) {
                    if (!$util.isObject(object.items[i]))
                        throw $TypeError(".game.InventorySnapshot.items: object expected");
                    message.items[i] = $root.game.Item.fromObject(object.items[i], _depth + 1);
                }
            }
            if (object.maxSlots != null)
                if ($Number(object.maxSlots) !== 0)
                    message.maxSlots = object.maxSlots | 0;
            if (object.maxWeight != null)
                if (!$Object.is($Number(object.maxWeight), 0))
                    message.maxWeight = $Number(object.maxWeight);
            if (object.currentWeight != null)
                if (!$Object.is($Number(object.currentWeight), 0))
                    message.currentWeight = $Number(object.currentWeight);
            if (object.equipment) {
                if (!$util.isObject(object.equipment))
                    throw $TypeError(".game.InventorySnapshot.equipment: object expected");
                message.equipment = {};
                for (let keys = $Object.keys(object.equipment), i = 0; i < keys.length; ++i) {
                    if (keys[i] === "__proto__")
                        $util.makeProp(message.equipment, keys[i]);
                    if (!$util.isObject(object.equipment[keys[i]]))
                        throw $TypeError(".game.InventorySnapshot.equipment: object expected");
                    message.equipment[keys[i]] = $root.game.Item.fromObject(object.equipment[keys[i]], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an InventorySnapshot message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.InventorySnapshot
         * @static
         * @param {game.InventorySnapshot} message InventorySnapshot
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InventorySnapshot.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (options.objects || options.defaults)
                object.equipment = {};
            if (options.defaults) {
                object.inventoryId = "";
                object.maxSlots = 0;
                object.maxWeight = 0;
                object.currentWeight = 0;
            }
            if (message.inventoryId != null && $Object.hasOwnProperty.call(message, "inventoryId"))
                object.inventoryId = message.inventoryId;
            if (message.items && message.items.length) {
                object.items = $Array(message.items.length);
                for (let j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.game.Item.toObject(message.items[j], options, _depth + 1);
            }
            if (message.maxSlots != null && $Object.hasOwnProperty.call(message, "maxSlots"))
                object.maxSlots = message.maxSlots;
            if (message.maxWeight != null && $Object.hasOwnProperty.call(message, "maxWeight"))
                object.maxWeight = options.json && !$isFinite(message.maxWeight) ? $String(message.maxWeight) : message.maxWeight;
            if (message.currentWeight != null && $Object.hasOwnProperty.call(message, "currentWeight"))
                object.currentWeight = options.json && !$isFinite(message.currentWeight) ? $String(message.currentWeight) : message.currentWeight;
            let keys2;
            if (message.equipment && (keys2 = $Object.keys(message.equipment)).length) {
                object.equipment = {};
                for (let j = 0; j < keys2.length; ++j) {
                    if (keys2[j] === "__proto__")
                        $util.makeProp(object.equipment, keys2[j]);
                    object.equipment[keys2[j]] = $root.game.Item.toObject(message.equipment[keys2[j]], options, _depth + 1);
                }
            }
            return object;
        };

        /**
         * Converts this InventorySnapshot to JSON.
         * @function toJSON
         * @memberof game.InventorySnapshot
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InventorySnapshot.prototype.toJSON = function() {
            return InventorySnapshot.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for InventorySnapshot
         * @function getTypeUrl
         * @memberof game.InventorySnapshot
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        InventorySnapshot.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/game.InventorySnapshot";
        };

        return InventorySnapshot;
    })();

    game.InventoryDiff = (function() {

        /**
         * Properties of an InventoryDiff.
         * @typedef {Object} game.InventoryDiff.$Properties
         * @property {string|null} [inventoryId] InventoryDiff inventoryId
         * @property {string|null} [action] InventoryDiff action
         * @property {game.Item.$Properties|null} [item] InventoryDiff item
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of an InventoryDiff.
         * @memberof game
         * @interface IInventoryDiff
         * @augments game.InventoryDiff.$Properties
         * @deprecated Use game.InventoryDiff.$Properties instead.
         */

        /**
         * Shape of an InventoryDiff.
         * @typedef {game.InventoryDiff.$Properties} game.InventoryDiff.$Shape
         */

        /**
         * Constructs a new InventoryDiff.
         * @memberof game
         * @classdesc Represents an InventoryDiff.
         * @constructor
         * @param {game.InventoryDiff.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const InventoryDiff = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * InventoryDiff inventoryId.
         * @member {string} inventoryId
         * @memberof game.InventoryDiff
         * @instance
         */
        InventoryDiff.prototype.inventoryId = "";

        /**
         * InventoryDiff action.
         * @member {string} action
         * @memberof game.InventoryDiff
         * @instance
         */
        InventoryDiff.prototype.action = "";

        /**
         * InventoryDiff item.
         * @member {game.Item.$Properties|null|undefined} item
         * @memberof game.InventoryDiff
         * @instance
         */
        InventoryDiff.prototype.item = null;

        /**
         * Creates a new InventoryDiff instance using the specified properties.
         * @function create
         * @memberof game.InventoryDiff
         * @static
         * @param {game.InventoryDiff.$Properties=} [properties] Properties to set
         * @returns {game.InventoryDiff} InventoryDiff instance
         * @type {{
         *   (properties: game.InventoryDiff.$Shape): game.InventoryDiff & game.InventoryDiff.$Shape;
         *   (properties?: game.InventoryDiff.$Properties): game.InventoryDiff;
         * }}
         */
        InventoryDiff.create = function(properties) {
            return new InventoryDiff(properties);
        };

        /**
         * Encodes the specified InventoryDiff message. Does not implicitly {@link game.InventoryDiff.verify|verify} messages.
         * @function encode
         * @memberof game.InventoryDiff
         * @static
         * @param {game.InventoryDiff.$Properties} message InventoryDiff message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InventoryDiff.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.inventoryId != null && $Object.hasOwnProperty.call(message, "inventoryId") && message.inventoryId !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.inventoryId);
            if (message.action != null && $Object.hasOwnProperty.call(message, "action") && message.action !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.action);
            if (message.item != null && $Object.hasOwnProperty.call(message, "item"))
                $root.game.Item.encode(message.item, writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified InventoryDiff message, length delimited. Does not implicitly {@link game.InventoryDiff.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.InventoryDiff
         * @static
         * @param {game.InventoryDiff.$Properties} message InventoryDiff message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InventoryDiff.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes an InventoryDiff message from the specified reader or buffer.
         * @function decode
         * @memberof game.InventoryDiff
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.InventoryDiff & game.InventoryDiff.$Shape} InventoryDiff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InventoryDiff.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.game.InventoryDiff(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.inventoryId = value;
                        else
                            delete message.inventoryId;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.action = value;
                        else
                            delete message.action;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.item = $root.game.Item.decode(reader, reader.uint32(), $undefined, _depth + 1, message.item);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes an InventoryDiff message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.InventoryDiff
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.InventoryDiff & game.InventoryDiff.$Shape} InventoryDiff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InventoryDiff.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InventoryDiff message.
         * @function verify
         * @memberof game.InventoryDiff
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InventoryDiff.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.inventoryId != null && $Object.hasOwnProperty.call(message, "inventoryId"))
                if (!$util.isString(message.inventoryId))
                    return "inventoryId: string expected";
            if (message.action != null && $Object.hasOwnProperty.call(message, "action"))
                if (!$util.isString(message.action))
                    return "action: string expected";
            if (message.item != null && $Object.hasOwnProperty.call(message, "item")) {
                let error = $root.game.Item.verify(message.item, _depth + 1);
                if (error)
                    return "item." + error;
            }
            return null;
        };

        /**
         * Creates an InventoryDiff message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.InventoryDiff
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.InventoryDiff} InventoryDiff
         */
        InventoryDiff.fromObject = function (object, _depth) {
            if (object instanceof $root.game.InventoryDiff)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".game.InventoryDiff: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.game.InventoryDiff();
            if (object.inventoryId != null)
                if (typeof object.inventoryId !== "string" || object.inventoryId.length)
                    message.inventoryId = $String(object.inventoryId);
            if (object.action != null)
                if (typeof object.action !== "string" || object.action.length)
                    message.action = $String(object.action);
            if (object.item != null) {
                if (!$util.isObject(object.item))
                    throw $TypeError(".game.InventoryDiff.item: object expected");
                message.item = $root.game.Item.fromObject(object.item, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an InventoryDiff message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.InventoryDiff
         * @static
         * @param {game.InventoryDiff} message InventoryDiff
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InventoryDiff.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.inventoryId = "";
                object.action = "";
                object.item = null;
            }
            if (message.inventoryId != null && $Object.hasOwnProperty.call(message, "inventoryId"))
                object.inventoryId = message.inventoryId;
            if (message.action != null && $Object.hasOwnProperty.call(message, "action"))
                object.action = message.action;
            if (message.item != null && $Object.hasOwnProperty.call(message, "item"))
                object.item = $root.game.Item.toObject(message.item, options, _depth + 1);
            return object;
        };

        /**
         * Converts this InventoryDiff to JSON.
         * @function toJSON
         * @memberof game.InventoryDiff
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InventoryDiff.prototype.toJSON = function() {
            return InventoryDiff.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for InventoryDiff
         * @function getTypeUrl
         * @memberof game.InventoryDiff
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        InventoryDiff.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/game.InventoryDiff";
        };

        return InventoryDiff;
    })();

    game.Item = (function() {

        /**
         * Properties of an Item.
         * @typedef {Object} game.Item.$Properties
         * @property {string|null} [id] Item id
         * @property {string|null} [templateId] Item templateId
         * @property {string|null} [name] Item name
         * @property {string|null} [type] Item type
         * @property {string|null} [icon] Item icon
         * @property {string|null} [description] Item description
         * @property {number|null} [quantity] Item quantity
         * @property {number|null} [weight] Item weight
         * @property {Object.<string,number>|null} [stats] Item stats
         * @property {Object.<string,number>|null} [consumable] Item consumable
         * @property {string|null} [damageType] Item damageType
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of an Item.
         * @memberof game
         * @interface IItem
         * @augments game.Item.$Properties
         * @deprecated Use game.Item.$Properties instead.
         */

        /**
         * Shape of an Item.
         * @typedef {game.Item.$Properties} game.Item.$Shape
         */

        /**
         * Constructs a new Item.
         * @memberof game
         * @classdesc Represents an Item.
         * @constructor
         * @param {game.Item.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const Item = function (properties) {
            this.stats = {};
            this.consumable = {};
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * Item id.
         * @member {string} id
         * @memberof game.Item
         * @instance
         */
        Item.prototype.id = "";

        /**
         * Item templateId.
         * @member {string} templateId
         * @memberof game.Item
         * @instance
         */
        Item.prototype.templateId = "";

        /**
         * Item name.
         * @member {string} name
         * @memberof game.Item
         * @instance
         */
        Item.prototype.name = "";

        /**
         * Item type.
         * @member {string} type
         * @memberof game.Item
         * @instance
         */
        Item.prototype.type = "";

        /**
         * Item icon.
         * @member {string} icon
         * @memberof game.Item
         * @instance
         */
        Item.prototype.icon = "";

        /**
         * Item description.
         * @member {string} description
         * @memberof game.Item
         * @instance
         */
        Item.prototype.description = "";

        /**
         * Item quantity.
         * @member {number} quantity
         * @memberof game.Item
         * @instance
         */
        Item.prototype.quantity = 0;

        /**
         * Item weight.
         * @member {number} weight
         * @memberof game.Item
         * @instance
         */
        Item.prototype.weight = 0;

        /**
         * Item stats.
         * @member {Object.<string,number>} stats
         * @memberof game.Item
         * @instance
         */
        Item.prototype.stats = $util.emptyObject;

        /**
         * Item consumable.
         * @member {Object.<string,number>} consumable
         * @memberof game.Item
         * @instance
         */
        Item.prototype.consumable = $util.emptyObject;

        /**
         * Item damageType.
         * @member {string} damageType
         * @memberof game.Item
         * @instance
         */
        Item.prototype.damageType = "";

        /**
         * Creates a new Item instance using the specified properties.
         * @function create
         * @memberof game.Item
         * @static
         * @param {game.Item.$Properties=} [properties] Properties to set
         * @returns {game.Item} Item instance
         * @type {{
         *   (properties: game.Item.$Shape): game.Item & game.Item.$Shape;
         *   (properties?: game.Item.$Properties): game.Item;
         * }}
         */
        Item.create = function(properties) {
            return new Item(properties);
        };

        /**
         * Encodes the specified Item message. Does not implicitly {@link game.Item.verify|verify} messages.
         * @function encode
         * @memberof game.Item
         * @static
         * @param {game.Item.$Properties} message Item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Item.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.id != null && $Object.hasOwnProperty.call(message, "id") && message.id !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.templateId != null && $Object.hasOwnProperty.call(message, "templateId") && message.templateId !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.templateId);
            if (message.name != null && $Object.hasOwnProperty.call(message, "name") && message.name !== "")
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            if (message.type != null && $Object.hasOwnProperty.call(message, "type") && message.type !== "")
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.type);
            if (message.icon != null && $Object.hasOwnProperty.call(message, "icon") && message.icon !== "")
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.icon);
            if (message.description != null && $Object.hasOwnProperty.call(message, "description") && message.description !== "")
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.description);
            if (message.quantity != null && $Object.hasOwnProperty.call(message, "quantity") && message.quantity !== 0)
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.quantity);
            if (message.weight != null && $Object.hasOwnProperty.call(message, "weight") && !$Object.is(message.weight, 0))
                writer.uint32(/* id 8, wireType 5 =*/69).float(message.weight);
            if (message.stats != null && $Object.hasOwnProperty.call(message, "stats"))
                for (let keys = $Object.keys(message.stats), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 9, wireType 2 =*/74).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.stats[keys[i]]).ldelim();
            if (message.consumable != null && $Object.hasOwnProperty.call(message, "consumable"))
                for (let keys = $Object.keys(message.consumable), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 10, wireType 2 =*/82).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.consumable[keys[i]]).ldelim();
            if (message.damageType != null && $Object.hasOwnProperty.call(message, "damageType") && message.damageType !== "")
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.damageType);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified Item message, length delimited. Does not implicitly {@link game.Item.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.Item
         * @static
         * @param {game.Item.$Properties} message Item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Item.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes an Item message from the specified reader or buffer.
         * @function decode
         * @memberof game.Item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.Item & game.Item.$Shape} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Item.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.game.Item(), key, value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.id = value;
                        else
                            delete message.id;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.templateId = value;
                        else
                            delete message.templateId;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.name = value;
                        else
                            delete message.name;
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.type = value;
                        else
                            delete message.type;
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.icon = value;
                        else
                            delete message.icon;
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.description = value;
                        else
                            delete message.description;
                        continue;
                    }
                case 7: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.quantity = value;
                        else
                            delete message.quantity;
                        continue;
                    }
                case 8: {
                        if (wireType !== 5)
                            break;
                        if (!$Object.is(value = reader.float(), 0))
                            message.weight = value;
                        else
                            delete message.weight;
                        continue;
                    }
                case 9: {
                        if (wireType !== 2)
                            break;
                        if (message.stats === $util.emptyObject)
                            message.stats = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = 0;
                        while (reader.pos < end2) {
                            let tag2 = reader.tag();
                            wireType = tag2 & 7;
                            switch (tag2 >>>= 3) {
                            case 1:
                                if (wireType !== 2)
                                    break;
                                key = reader.stringVerify();
                                continue;
                            case 2:
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                continue;
                            }
                            reader.skipType(wireType, _depth, tag2);
                        }
                        if (key === "__proto__")
                            $util.makeProp(message.stats, key);
                        message.stats[key] = value;
                        continue;
                    }
                case 10: {
                        if (wireType !== 2)
                            break;
                        if (message.consumable === $util.emptyObject)
                            message.consumable = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = 0;
                        while (reader.pos < end2) {
                            let tag2 = reader.tag();
                            wireType = tag2 & 7;
                            switch (tag2 >>>= 3) {
                            case 1:
                                if (wireType !== 2)
                                    break;
                                key = reader.stringVerify();
                                continue;
                            case 2:
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                continue;
                            }
                            reader.skipType(wireType, _depth, tag2);
                        }
                        if (key === "__proto__")
                            $util.makeProp(message.consumable, key);
                        message.consumable[key] = value;
                        continue;
                    }
                case 11: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.damageType = value;
                        else
                            delete message.damageType;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes an Item message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.Item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.Item & game.Item.$Shape} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Item.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Item message.
         * @function verify
         * @memberof game.Item
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Item.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.templateId != null && $Object.hasOwnProperty.call(message, "templateId"))
                if (!$util.isString(message.templateId))
                    return "templateId: string expected";
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.type != null && $Object.hasOwnProperty.call(message, "type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.icon != null && $Object.hasOwnProperty.call(message, "icon"))
                if (!$util.isString(message.icon))
                    return "icon: string expected";
            if (message.description != null && $Object.hasOwnProperty.call(message, "description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.quantity != null && $Object.hasOwnProperty.call(message, "quantity"))
                if (!$util.isInteger(message.quantity))
                    return "quantity: integer expected";
            if (message.weight != null && $Object.hasOwnProperty.call(message, "weight"))
                if (typeof message.weight !== "number")
                    return "weight: number expected";
            if (message.stats != null && $Object.hasOwnProperty.call(message, "stats")) {
                if (!$util.isObject(message.stats))
                    return "stats: object expected";
                let key = $Object.keys(message.stats);
                for (let i = 0; i < key.length; ++i)
                    if (!$util.isInteger(message.stats[key[i]]))
                        return "stats: integer{k:string} expected";
            }
            if (message.consumable != null && $Object.hasOwnProperty.call(message, "consumable")) {
                if (!$util.isObject(message.consumable))
                    return "consumable: object expected";
                let key = $Object.keys(message.consumable);
                for (let i = 0; i < key.length; ++i)
                    if (!$util.isInteger(message.consumable[key[i]]))
                        return "consumable: integer{k:string} expected";
            }
            if (message.damageType != null && $Object.hasOwnProperty.call(message, "damageType"))
                if (!$util.isString(message.damageType))
                    return "damageType: string expected";
            return null;
        };

        /**
         * Creates an Item message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.Item
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.Item} Item
         */
        Item.fromObject = function (object, _depth) {
            if (object instanceof $root.game.Item)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".game.Item: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.game.Item();
            if (object.id != null)
                if (typeof object.id !== "string" || object.id.length)
                    message.id = $String(object.id);
            if (object.templateId != null)
                if (typeof object.templateId !== "string" || object.templateId.length)
                    message.templateId = $String(object.templateId);
            if (object.name != null)
                if (typeof object.name !== "string" || object.name.length)
                    message.name = $String(object.name);
            if (object.type != null)
                if (typeof object.type !== "string" || object.type.length)
                    message.type = $String(object.type);
            if (object.icon != null)
                if (typeof object.icon !== "string" || object.icon.length)
                    message.icon = $String(object.icon);
            if (object.description != null)
                if (typeof object.description !== "string" || object.description.length)
                    message.description = $String(object.description);
            if (object.quantity != null)
                if ($Number(object.quantity) !== 0)
                    message.quantity = object.quantity | 0;
            if (object.weight != null)
                if (!$Object.is($Number(object.weight), 0))
                    message.weight = $Number(object.weight);
            if (object.stats) {
                if (!$util.isObject(object.stats))
                    throw $TypeError(".game.Item.stats: object expected");
                message.stats = {};
                for (let keys = $Object.keys(object.stats), i = 0; i < keys.length; ++i) {
                    if (keys[i] === "__proto__")
                        $util.makeProp(message.stats, keys[i]);
                    message.stats[keys[i]] = object.stats[keys[i]] | 0;
                }
            }
            if (object.consumable) {
                if (!$util.isObject(object.consumable))
                    throw $TypeError(".game.Item.consumable: object expected");
                message.consumable = {};
                for (let keys = $Object.keys(object.consumable), i = 0; i < keys.length; ++i) {
                    if (keys[i] === "__proto__")
                        $util.makeProp(message.consumable, keys[i]);
                    message.consumable[keys[i]] = object.consumable[keys[i]] | 0;
                }
            }
            if (object.damageType != null)
                if (typeof object.damageType !== "string" || object.damageType.length)
                    message.damageType = $String(object.damageType);
            return message;
        };

        /**
         * Creates a plain object from an Item message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.Item
         * @static
         * @param {game.Item} message Item
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Item.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.objects || options.defaults) {
                object.stats = {};
                object.consumable = {};
            }
            if (options.defaults) {
                object.id = "";
                object.templateId = "";
                object.name = "";
                object.type = "";
                object.icon = "";
                object.description = "";
                object.quantity = 0;
                object.weight = 0;
                object.damageType = "";
            }
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                object.id = message.id;
            if (message.templateId != null && $Object.hasOwnProperty.call(message, "templateId"))
                object.templateId = message.templateId;
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.type != null && $Object.hasOwnProperty.call(message, "type"))
                object.type = message.type;
            if (message.icon != null && $Object.hasOwnProperty.call(message, "icon"))
                object.icon = message.icon;
            if (message.description != null && $Object.hasOwnProperty.call(message, "description"))
                object.description = message.description;
            if (message.quantity != null && $Object.hasOwnProperty.call(message, "quantity"))
                object.quantity = message.quantity;
            if (message.weight != null && $Object.hasOwnProperty.call(message, "weight"))
                object.weight = options.json && !$isFinite(message.weight) ? $String(message.weight) : message.weight;
            let keys2;
            if (message.stats && (keys2 = $Object.keys(message.stats)).length) {
                object.stats = {};
                for (let j = 0; j < keys2.length; ++j) {
                    if (keys2[j] === "__proto__")
                        $util.makeProp(object.stats, keys2[j]);
                    object.stats[keys2[j]] = message.stats[keys2[j]];
                }
            }
            if (message.consumable && (keys2 = $Object.keys(message.consumable)).length) {
                object.consumable = {};
                for (let j = 0; j < keys2.length; ++j) {
                    if (keys2[j] === "__proto__")
                        $util.makeProp(object.consumable, keys2[j]);
                    object.consumable[keys2[j]] = message.consumable[keys2[j]];
                }
            }
            if (message.damageType != null && $Object.hasOwnProperty.call(message, "damageType"))
                object.damageType = message.damageType;
            return object;
        };

        /**
         * Converts this Item to JSON.
         * @function toJSON
         * @memberof game.Item
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Item.prototype.toJSON = function() {
            return Item.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for Item
         * @function getTypeUrl
         * @memberof game.Item
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        Item.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/game.Item";
        };

        return Item;
    })();

    game.ErrorResponse = (function() {

        /**
         * Properties of an ErrorResponse.
         * @typedef {Object} game.ErrorResponse.$Properties
         * @property {string|null} [code] ErrorResponse code
         * @property {string|null} [message] ErrorResponse message
         * @property {string|null} [originalAction] ErrorResponse originalAction
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of an ErrorResponse.
         * @memberof game
         * @interface IErrorResponse
         * @augments game.ErrorResponse.$Properties
         * @deprecated Use game.ErrorResponse.$Properties instead.
         */

        /**
         * Shape of an ErrorResponse.
         * @typedef {game.ErrorResponse.$Properties} game.ErrorResponse.$Shape
         */

        /**
         * Constructs a new ErrorResponse.
         * @memberof game
         * @classdesc Represents an ErrorResponse.
         * @constructor
         * @param {game.ErrorResponse.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const ErrorResponse = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * ErrorResponse code.
         * @member {string} code
         * @memberof game.ErrorResponse
         * @instance
         */
        ErrorResponse.prototype.code = "";

        /**
         * ErrorResponse message.
         * @member {string} message
         * @memberof game.ErrorResponse
         * @instance
         */
        ErrorResponse.prototype.message = "";

        /**
         * ErrorResponse originalAction.
         * @member {string} originalAction
         * @memberof game.ErrorResponse
         * @instance
         */
        ErrorResponse.prototype.originalAction = "";

        /**
         * Creates a new ErrorResponse instance using the specified properties.
         * @function create
         * @memberof game.ErrorResponse
         * @static
         * @param {game.ErrorResponse.$Properties=} [properties] Properties to set
         * @returns {game.ErrorResponse} ErrorResponse instance
         * @type {{
         *   (properties: game.ErrorResponse.$Shape): game.ErrorResponse & game.ErrorResponse.$Shape;
         *   (properties?: game.ErrorResponse.$Properties): game.ErrorResponse;
         * }}
         */
        ErrorResponse.create = function(properties) {
            return new ErrorResponse(properties);
        };

        /**
         * Encodes the specified ErrorResponse message. Does not implicitly {@link game.ErrorResponse.verify|verify} messages.
         * @function encode
         * @memberof game.ErrorResponse
         * @static
         * @param {game.ErrorResponse.$Properties} message ErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorResponse.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.code != null && $Object.hasOwnProperty.call(message, "code") && message.code !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.code);
            if (message.message != null && $Object.hasOwnProperty.call(message, "message") && message.message !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            if (message.originalAction != null && $Object.hasOwnProperty.call(message, "originalAction") && message.originalAction !== "")
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.originalAction);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link game.ErrorResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.ErrorResponse
         * @static
         * @param {game.ErrorResponse.$Properties} message ErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorResponse.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer.
         * @function decode
         * @memberof game.ErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.ErrorResponse & game.ErrorResponse.$Shape} ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorResponse.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.game.ErrorResponse(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.code = value;
                        else
                            delete message.code;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.message = value;
                        else
                            delete message.message;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.originalAction = value;
                        else
                            delete message.originalAction;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.ErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.ErrorResponse & game.ErrorResponse.$Shape} ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorResponse.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ErrorResponse message.
         * @function verify
         * @memberof game.ErrorResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ErrorResponse.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.code != null && $Object.hasOwnProperty.call(message, "code"))
                if (!$util.isString(message.code))
                    return "code: string expected";
            if (message.message != null && $Object.hasOwnProperty.call(message, "message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.originalAction != null && $Object.hasOwnProperty.call(message, "originalAction"))
                if (!$util.isString(message.originalAction))
                    return "originalAction: string expected";
            return null;
        };

        /**
         * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.ErrorResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.ErrorResponse} ErrorResponse
         */
        ErrorResponse.fromObject = function (object, _depth) {
            if (object instanceof $root.game.ErrorResponse)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".game.ErrorResponse: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.game.ErrorResponse();
            if (object.code != null)
                if (typeof object.code !== "string" || object.code.length)
                    message.code = $String(object.code);
            if (object.message != null)
                if (typeof object.message !== "string" || object.message.length)
                    message.message = $String(object.message);
            if (object.originalAction != null)
                if (typeof object.originalAction !== "string" || object.originalAction.length)
                    message.originalAction = $String(object.originalAction);
            return message;
        };

        /**
         * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.ErrorResponse
         * @static
         * @param {game.ErrorResponse} message ErrorResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ErrorResponse.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.code = "";
                object.message = "";
                object.originalAction = "";
            }
            if (message.code != null && $Object.hasOwnProperty.call(message, "code"))
                object.code = message.code;
            if (message.message != null && $Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            if (message.originalAction != null && $Object.hasOwnProperty.call(message, "originalAction"))
                object.originalAction = message.originalAction;
            return object;
        };

        /**
         * Converts this ErrorResponse to JSON.
         * @function toJSON
         * @memberof game.ErrorResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorResponse.prototype.toJSON = function() {
            return ErrorResponse.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for ErrorResponse
         * @function getTypeUrl
         * @memberof game.ErrorResponse
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        ErrorResponse.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/game.ErrorResponse";
        };

        return ErrorResponse;
    })();

    game.GameMessage = (function() {

        /**
         * Properties of a GameMessage.
         * @typedef {Object} game.GameMessage.$Properties
         * @property {string|null} [type] GameMessage type
         * @property {Uint8Array|null} [data] GameMessage data
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a GameMessage.
         * @memberof game
         * @interface IGameMessage
         * @augments game.GameMessage.$Properties
         * @deprecated Use game.GameMessage.$Properties instead.
         */

        /**
         * Shape of a GameMessage.
         * @typedef {game.GameMessage.$Properties} game.GameMessage.$Shape
         */

        /**
         * Constructs a new GameMessage.
         * @memberof game
         * @classdesc Represents a GameMessage.
         * @constructor
         * @param {game.GameMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const GameMessage = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * GameMessage type.
         * @member {string} type
         * @memberof game.GameMessage
         * @instance
         */
        GameMessage.prototype.type = "";

        /**
         * GameMessage data.
         * @member {Uint8Array} data
         * @memberof game.GameMessage
         * @instance
         */
        GameMessage.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new GameMessage instance using the specified properties.
         * @function create
         * @memberof game.GameMessage
         * @static
         * @param {game.GameMessage.$Properties=} [properties] Properties to set
         * @returns {game.GameMessage} GameMessage instance
         * @type {{
         *   (properties: game.GameMessage.$Shape): game.GameMessage & game.GameMessage.$Shape;
         *   (properties?: game.GameMessage.$Properties): game.GameMessage;
         * }}
         */
        GameMessage.create = function(properties) {
            return new GameMessage(properties);
        };

        /**
         * Encodes the specified GameMessage message. Does not implicitly {@link game.GameMessage.verify|verify} messages.
         * @function encode
         * @memberof game.GameMessage
         * @static
         * @param {game.GameMessage.$Properties} message GameMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameMessage.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.type != null && $Object.hasOwnProperty.call(message, "type") && message.type !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
            if (message.data != null && $Object.hasOwnProperty.call(message, "data") && message.data.length)
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified GameMessage message, length delimited. Does not implicitly {@link game.GameMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.GameMessage
         * @static
         * @param {game.GameMessage.$Properties} message GameMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameMessage.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a GameMessage message from the specified reader or buffer.
         * @function decode
         * @memberof game.GameMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.GameMessage & game.GameMessage.$Shape} GameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameMessage.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.game.GameMessage(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.type = value;
                        else
                            delete message.type;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.bytes()).length)
                            message.data = value;
                        else
                            delete message.data;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a GameMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.GameMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.GameMessage & game.GameMessage.$Shape} GameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameMessage.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameMessage message.
         * @function verify
         * @memberof game.GameMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameMessage.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.type != null && $Object.hasOwnProperty.call(message, "type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };

        /**
         * Creates a GameMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.GameMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.GameMessage} GameMessage
         */
        GameMessage.fromObject = function (object, _depth) {
            if (object instanceof $root.game.GameMessage)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".game.GameMessage: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.game.GameMessage();
            if (object.type != null)
                if (typeof object.type !== "string" || object.type.length)
                    message.type = $String(object.type);
            if (object.data != null)
                if (object.data.length)
                    if (typeof object.data === "string")
                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                    else if (object.data.length >= 0)
                        message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a GameMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.GameMessage
         * @static
         * @param {game.GameMessage} message GameMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameMessage.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.type = "";
                if (options.bytes === $String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== $Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.type != null && $Object.hasOwnProperty.call(message, "type"))
                object.type = message.type;
            if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === $String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this GameMessage to JSON.
         * @function toJSON
         * @memberof game.GameMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameMessage.prototype.toJSON = function() {
            return GameMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for GameMessage
         * @function getTypeUrl
         * @memberof game.GameMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        GameMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/game.GameMessage";
        };

        return GameMessage;
    })();

    return game;
})();

export {
  $root as default
};
