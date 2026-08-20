import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace game. */
export namespace game {

    /**
     * Properties of a GameMessage.
     * @deprecated Use game.GameMessage.$Properties instead.
     */
    interface IGameMessage extends game.GameMessage.$Properties {
    }

    /** Represents a GameMessage. */
    class GameMessage {

        /**
         * Constructs a new GameMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.GameMessage.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** GameMessage type. */
        type: string;

        /** GameMessage payload. */
        payload: Uint8Array;

        /**
         * Creates a new GameMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameMessage instance
         */
        static create(properties: game.GameMessage.$Shape): game.GameMessage & game.GameMessage.$Shape;
        static create(properties?: game.GameMessage.$Properties): game.GameMessage;

        /**
         * Encodes the specified GameMessage message. Does not implicitly {@link game.GameMessage.verify|verify} messages.
         * @param message GameMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.GameMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameMessage message, length delimited. Does not implicitly {@link game.GameMessage.verify|verify} messages.
         * @param message GameMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.GameMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.GameMessage & game.GameMessage.$Shape} GameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.GameMessage & game.GameMessage.$Shape;

        /**
         * Decodes a GameMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.GameMessage & game.GameMessage.$Shape} GameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.GameMessage & game.GameMessage.$Shape;

        /**
         * Verifies a GameMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameMessage
         */
        static fromObject(object: { [k: string]: any }): game.GameMessage;

        /**
         * Creates a plain object from a GameMessage message. Also converts values to other types if specified.
         * @param message GameMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.GameMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for GameMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace GameMessage {

        /** Properties of a GameMessage. */
        interface $Properties {

            /** GameMessage type */
            type?: (string|null);

            /** GameMessage payload */
            payload?: (Uint8Array|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a GameMessage. */
        type $Shape = game.GameMessage.$Properties;
    }

    /**
     * Properties of an ErrorResponse.
     * @deprecated Use game.ErrorResponse.$Properties instead.
     */
    interface IErrorResponse extends game.ErrorResponse.$Properties {
    }

    /** Represents an ErrorResponse. */
    class ErrorResponse {

        /**
         * Constructs a new ErrorResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.ErrorResponse.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** ErrorResponse code. */
        code: string;

        /** ErrorResponse message. */
        message: string;

        /**
         * Creates a new ErrorResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrorResponse instance
         */
        static create(properties: game.ErrorResponse.$Shape): game.ErrorResponse & game.ErrorResponse.$Shape;
        static create(properties?: game.ErrorResponse.$Properties): game.ErrorResponse;

        /**
         * Encodes the specified ErrorResponse message. Does not implicitly {@link game.ErrorResponse.verify|verify} messages.
         * @param message ErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.ErrorResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link game.ErrorResponse.verify|verify} messages.
         * @param message ErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.ErrorResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.ErrorResponse & game.ErrorResponse.$Shape} ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.ErrorResponse & game.ErrorResponse.$Shape;

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.ErrorResponse & game.ErrorResponse.$Shape} ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.ErrorResponse & game.ErrorResponse.$Shape;

        /**
         * Verifies an ErrorResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ErrorResponse
         */
        static fromObject(object: { [k: string]: any }): game.ErrorResponse;

        /**
         * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
         * @param message ErrorResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.ErrorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ErrorResponse to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for ErrorResponse
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace ErrorResponse {

        /** Properties of an ErrorResponse. */
        interface $Properties {

            /** ErrorResponse code */
            code?: (string|null);

            /** ErrorResponse message */
            message?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an ErrorResponse. */
        type $Shape = game.ErrorResponse.$Properties;
    }

    /**
     * Properties of a Stats.
     * @deprecated Use game.Stats.$Properties instead.
     */
    interface IStats extends game.Stats.$Properties {
    }

    /** Represents a Stats. */
    class Stats {

        /**
         * Constructs a new Stats.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Stats.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Stats strength. */
        strength: number;

        /** Stats defense. */
        defense: number;

        /** Stats agility. */
        agility: number;

        /** Stats vitality. */
        vitality: number;

        /** Stats intelligence. */
        intelligence: number;

        /** Stats wisdom. */
        wisdom: number;

        /**
         * Creates a new Stats instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Stats instance
         */
        static create(properties: game.Stats.$Shape): game.Stats & game.Stats.$Shape;
        static create(properties?: game.Stats.$Properties): game.Stats;

        /**
         * Encodes the specified Stats message. Does not implicitly {@link game.Stats.verify|verify} messages.
         * @param message Stats message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Stats.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Stats message, length delimited. Does not implicitly {@link game.Stats.verify|verify} messages.
         * @param message Stats message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Stats.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Stats message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Stats & game.Stats.$Shape} Stats
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Stats & game.Stats.$Shape;

        /**
         * Decodes a Stats message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Stats & game.Stats.$Shape} Stats
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Stats & game.Stats.$Shape;

        /**
         * Verifies a Stats message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Stats message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Stats
         */
        static fromObject(object: { [k: string]: any }): game.Stats;

        /**
         * Creates a plain object from a Stats message. Also converts values to other types if specified.
         * @param message Stats
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Stats, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Stats to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Stats
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Stats {

        /** Properties of a Stats. */
        interface $Properties {

            /** Stats strength */
            strength?: (number|null);

            /** Stats defense */
            defense?: (number|null);

            /** Stats agility */
            agility?: (number|null);

            /** Stats vitality */
            vitality?: (number|null);

            /** Stats intelligence */
            intelligence?: (number|null);

            /** Stats wisdom */
            wisdom?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Stats. */
        type $Shape = game.Stats.$Properties;
    }

    /**
     * Properties of a DerivedStats.
     * @deprecated Use game.DerivedStats.$Properties instead.
     */
    interface IDerivedStats extends game.DerivedStats.$Properties {
    }

    /** Represents a DerivedStats. */
    class DerivedStats {

        /**
         * Constructs a new DerivedStats.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.DerivedStats.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** DerivedStats defense. */
        defense: number;

        /** DerivedStats damageType. */
        damageType: string;

        /** DerivedStats damage. */
        damage: number;

        /** DerivedStats hitChance. */
        hitChance: number;

        /** DerivedStats critChance. */
        critChance: number;

        /** DerivedStats equipmentBonus. */
        equipmentBonus: { [k: string]: number };

        /**
         * Creates a new DerivedStats instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DerivedStats instance
         */
        static create(properties: game.DerivedStats.$Shape): game.DerivedStats & game.DerivedStats.$Shape;
        static create(properties?: game.DerivedStats.$Properties): game.DerivedStats;

        /**
         * Encodes the specified DerivedStats message. Does not implicitly {@link game.DerivedStats.verify|verify} messages.
         * @param message DerivedStats message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.DerivedStats.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DerivedStats message, length delimited. Does not implicitly {@link game.DerivedStats.verify|verify} messages.
         * @param message DerivedStats message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.DerivedStats.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DerivedStats message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.DerivedStats & game.DerivedStats.$Shape} DerivedStats
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.DerivedStats & game.DerivedStats.$Shape;

        /**
         * Decodes a DerivedStats message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.DerivedStats & game.DerivedStats.$Shape} DerivedStats
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.DerivedStats & game.DerivedStats.$Shape;

        /**
         * Verifies a DerivedStats message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DerivedStats message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DerivedStats
         */
        static fromObject(object: { [k: string]: any }): game.DerivedStats;

        /**
         * Creates a plain object from a DerivedStats message. Also converts values to other types if specified.
         * @param message DerivedStats
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.DerivedStats, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DerivedStats to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for DerivedStats
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace DerivedStats {

        /** Properties of a DerivedStats. */
        interface $Properties {

            /** DerivedStats defense */
            defense?: (number|null);

            /** DerivedStats damageType */
            damageType?: (string|null);

            /** DerivedStats damage */
            damage?: (number|null);

            /** DerivedStats hitChance */
            hitChance?: (number|null);

            /** DerivedStats critChance */
            critChance?: (number|null);

            /** DerivedStats equipmentBonus */
            equipmentBonus?: ({ [k: string]: number }|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a DerivedStats. */
        type $Shape = game.DerivedStats.$Properties;
    }

    /**
     * Properties of a Buff.
     * @deprecated Use game.Buff.$Properties instead.
     */
    interface IBuff extends game.Buff.$Properties {
    }

    /** Represents a Buff. */
    class Buff {

        /**
         * Constructs a new Buff.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Buff.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Buff skillId. */
        skillId: string;

        /** Buff stat. */
        stat: string;

        /** Buff value. */
        value: number;

        /** Buff duration. */
        duration: (number|Long);

        /** Buff expiresAt. */
        expiresAt: (number|Long);

        /**
         * Creates a new Buff instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Buff instance
         */
        static create(properties: game.Buff.$Shape): game.Buff & game.Buff.$Shape;
        static create(properties?: game.Buff.$Properties): game.Buff;

        /**
         * Encodes the specified Buff message. Does not implicitly {@link game.Buff.verify|verify} messages.
         * @param message Buff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Buff.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Buff message, length delimited. Does not implicitly {@link game.Buff.verify|verify} messages.
         * @param message Buff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Buff.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Buff message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Buff & game.Buff.$Shape} Buff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Buff & game.Buff.$Shape;

        /**
         * Decodes a Buff message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Buff & game.Buff.$Shape} Buff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Buff & game.Buff.$Shape;

        /**
         * Verifies a Buff message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Buff message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Buff
         */
        static fromObject(object: { [k: string]: any }): game.Buff;

        /**
         * Creates a plain object from a Buff message. Also converts values to other types if specified.
         * @param message Buff
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Buff, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Buff to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Buff
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Buff {

        /** Properties of a Buff. */
        interface $Properties {

            /** Buff skillId */
            skillId?: (string|null);

            /** Buff stat */
            stat?: (string|null);

            /** Buff value */
            value?: (number|null);

            /** Buff duration */
            duration?: (number|Long|null);

            /** Buff expiresAt */
            expiresAt?: (number|Long|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Buff. */
        type $Shape = game.Buff.$Properties;
    }

    /**
     * Properties of a Buffs.
     * @deprecated Use game.Buffs.$Properties instead.
     */
    interface IBuffs extends game.Buffs.$Properties {
    }

    /** Represents a Buffs. */
    class Buffs {

        /**
         * Constructs a new Buffs.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Buffs.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Buffs buffs. */
        buffs: game.Buff.$Properties[];

        /**
         * Creates a new Buffs instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Buffs instance
         */
        static create(properties: game.Buffs.$Shape): game.Buffs & game.Buffs.$Shape;
        static create(properties?: game.Buffs.$Properties): game.Buffs;

        /**
         * Encodes the specified Buffs message. Does not implicitly {@link game.Buffs.verify|verify} messages.
         * @param message Buffs message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Buffs.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Buffs message, length delimited. Does not implicitly {@link game.Buffs.verify|verify} messages.
         * @param message Buffs message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Buffs.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Buffs message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Buffs & game.Buffs.$Shape} Buffs
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Buffs & game.Buffs.$Shape;

        /**
         * Decodes a Buffs message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Buffs & game.Buffs.$Shape} Buffs
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Buffs & game.Buffs.$Shape;

        /**
         * Verifies a Buffs message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Buffs message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Buffs
         */
        static fromObject(object: { [k: string]: any }): game.Buffs;

        /**
         * Creates a plain object from a Buffs message. Also converts values to other types if specified.
         * @param message Buffs
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Buffs, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Buffs to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Buffs
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Buffs {

        /** Properties of a Buffs. */
        interface $Properties {

            /** Buffs buffs */
            buffs?: (game.Buff.$Properties[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Buffs. */
        type $Shape = game.Buffs.$Properties;
    }

    /**
     * Properties of a Cooldowns.
     * @deprecated Use game.Cooldowns.$Properties instead.
     */
    interface ICooldowns extends game.Cooldowns.$Properties {
    }

    /** Represents a Cooldowns. */
    class Cooldowns {

        /**
         * Constructs a new Cooldowns.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Cooldowns.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Cooldowns cooldowns. */
        cooldowns: { [k: string]: (number|Long) };

        /**
         * Creates a new Cooldowns instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Cooldowns instance
         */
        static create(properties: game.Cooldowns.$Shape): game.Cooldowns & game.Cooldowns.$Shape;
        static create(properties?: game.Cooldowns.$Properties): game.Cooldowns;

        /**
         * Encodes the specified Cooldowns message. Does not implicitly {@link game.Cooldowns.verify|verify} messages.
         * @param message Cooldowns message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Cooldowns.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Cooldowns message, length delimited. Does not implicitly {@link game.Cooldowns.verify|verify} messages.
         * @param message Cooldowns message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Cooldowns.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Cooldowns message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Cooldowns & game.Cooldowns.$Shape} Cooldowns
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Cooldowns & game.Cooldowns.$Shape;

        /**
         * Decodes a Cooldowns message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Cooldowns & game.Cooldowns.$Shape} Cooldowns
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Cooldowns & game.Cooldowns.$Shape;

        /**
         * Verifies a Cooldowns message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Cooldowns message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Cooldowns
         */
        static fromObject(object: { [k: string]: any }): game.Cooldowns;

        /**
         * Creates a plain object from a Cooldowns message. Also converts values to other types if specified.
         * @param message Cooldowns
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Cooldowns, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Cooldowns to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Cooldowns
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Cooldowns {

        /** Properties of a Cooldowns. */
        interface $Properties {

            /** Cooldowns cooldowns */
            cooldowns?: ({ [k: string]: (number|Long) }|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Cooldowns. */
        type $Shape = game.Cooldowns.$Properties;
    }

    /**
     * Properties of a SkillsRanks.
     * @deprecated Use game.SkillsRanks.$Properties instead.
     */
    interface ISkillsRanks extends game.SkillsRanks.$Properties {
    }

    /** Represents a SkillsRanks. */
    class SkillsRanks {

        /**
         * Constructs a new SkillsRanks.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.SkillsRanks.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** SkillsRanks ranks. */
        ranks: { [k: string]: number };

        /**
         * Creates a new SkillsRanks instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SkillsRanks instance
         */
        static create(properties: game.SkillsRanks.$Shape): game.SkillsRanks & game.SkillsRanks.$Shape;
        static create(properties?: game.SkillsRanks.$Properties): game.SkillsRanks;

        /**
         * Encodes the specified SkillsRanks message. Does not implicitly {@link game.SkillsRanks.verify|verify} messages.
         * @param message SkillsRanks message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.SkillsRanks.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SkillsRanks message, length delimited. Does not implicitly {@link game.SkillsRanks.verify|verify} messages.
         * @param message SkillsRanks message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.SkillsRanks.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SkillsRanks message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.SkillsRanks & game.SkillsRanks.$Shape} SkillsRanks
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.SkillsRanks & game.SkillsRanks.$Shape;

        /**
         * Decodes a SkillsRanks message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.SkillsRanks & game.SkillsRanks.$Shape} SkillsRanks
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.SkillsRanks & game.SkillsRanks.$Shape;

        /**
         * Verifies a SkillsRanks message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SkillsRanks message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SkillsRanks
         */
        static fromObject(object: { [k: string]: any }): game.SkillsRanks;

        /**
         * Creates a plain object from a SkillsRanks message. Also converts values to other types if specified.
         * @param message SkillsRanks
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.SkillsRanks, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SkillsRanks to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for SkillsRanks
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace SkillsRanks {

        /** Properties of a SkillsRanks. */
        interface $Properties {

            /** SkillsRanks ranks */
            ranks?: ({ [k: string]: number }|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a SkillsRanks. */
        type $Shape = game.SkillsRanks.$Properties;
    }

    /**
     * Properties of a Player.
     * @deprecated Use game.Player.$Properties instead.
     */
    interface IPlayer extends game.Player.$Properties {
    }

    /** Represents a Player. */
    class Player {

        /**
         * Constructs a new Player.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Player.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Player level. */
        level: number;

        /** Player gold. */
        gold: (number|Long);

        /** Player exp. */
        exp: (number|Long);

        /** Player expToNext. */
        expToNext: (number|Long);

        /** Player hp. */
        hp: (number|Long);

        /** Player maxHp. */
        maxHp: (number|Long);

        /** Player avatar. */
        avatar: string;

        /** Player stats. */
        stats?: (game.Stats.$Properties|null);

        /** Player skillPoints. */
        skillPoints: number;

        /** Player currentPlaceId. */
        currentPlaceId: string;

        /** Player lastSeenAt. */
        lastSeenAt: (number|Long);

        /** Player attackCooldown. */
        attackCooldown: (number|Long);

        /** Player lastAttackTime. */
        lastAttackTime: (number|Long);

        /** Player activeBuffs. */
        activeBuffs: game.Buff.$Properties[];

        /** Player activeCooldowns. */
        activeCooldowns: { [k: string]: (number|Long) };

        /** Player pausedCooldowns. */
        pausedCooldowns: { [k: string]: (number|Long) };

        /** Player skillJobIds. */
        skillJobIds: { [k: string]: string };

        /** Player autoCombat. */
        autoCombat: boolean;

        /** Player isDead. */
        isDead: boolean;

        /** Player derivedStats. */
        derivedStats?: (game.DerivedStats.$Properties|null);

        /** Player skills. */
        skills: { [k: string]: number };

        /** Player targetEnemyId. */
        targetEnemyId: string;

        /**
         * Creates a new Player instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Player instance
         */
        static create(properties: game.Player.$Shape): game.Player & game.Player.$Shape;
        static create(properties?: game.Player.$Properties): game.Player;

        /**
         * Encodes the specified Player message. Does not implicitly {@link game.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Player.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link game.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Player.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Player & game.Player.$Shape} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Player & game.Player.$Shape;

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Player & game.Player.$Shape} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Player & game.Player.$Shape;

        /**
         * Verifies a Player message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Player
         */
        static fromObject(object: { [k: string]: any }): game.Player;

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @param message Player
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Player, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Player to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Player
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Player {

        /** Properties of a Player. */
        interface $Properties {

            /** Player level */
            level?: (number|null);

            /** Player gold */
            gold?: (number|Long|null);

            /** Player exp */
            exp?: (number|Long|null);

            /** Player expToNext */
            expToNext?: (number|Long|null);

            /** Player hp */
            hp?: (number|Long|null);

            /** Player maxHp */
            maxHp?: (number|Long|null);

            /** Player avatar */
            avatar?: (string|null);

            /** Player stats */
            stats?: (game.Stats.$Properties|null);

            /** Player skillPoints */
            skillPoints?: (number|null);

            /** Player currentPlaceId */
            currentPlaceId?: (string|null);

            /** Player lastSeenAt */
            lastSeenAt?: (number|Long|null);

            /** Player attackCooldown */
            attackCooldown?: (number|Long|null);

            /** Player lastAttackTime */
            lastAttackTime?: (number|Long|null);

            /** Player activeBuffs */
            activeBuffs?: (game.Buff.$Properties[]|null);

            /** Player activeCooldowns */
            activeCooldowns?: ({ [k: string]: (number|Long) }|null);

            /** Player pausedCooldowns */
            pausedCooldowns?: ({ [k: string]: (number|Long) }|null);

            /** Player skillJobIds */
            skillJobIds?: ({ [k: string]: string }|null);

            /** Player autoCombat */
            autoCombat?: (boolean|null);

            /** Player isDead */
            isDead?: (boolean|null);

            /** Player derivedStats */
            derivedStats?: (game.DerivedStats.$Properties|null);

            /** Player skills */
            skills?: ({ [k: string]: number }|null);

            /** Player targetEnemyId */
            targetEnemyId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Player. */
        type $Shape = game.Player.$Properties;
    }

    /**
     * Properties of an Item.
     * @deprecated Use game.Item.$Properties instead.
     */
    interface IItem extends game.Item.$Properties {
    }

    /** Represents an Item. */
    class Item {

        /**
         * Constructs a new Item.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Item.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Item id. */
        id: (number|Long);

        /** Item templateId. */
        templateId: string;

        /** Item name. */
        name: string;

        /** Item icon. */
        icon: string;

        /** Item description. */
        description: string;

        /** Item type. */
        type: string;

        /** Item quantity. */
        quantity: number;

        /** Item weight. */
        weight: number;

        /** Item stats. */
        stats: { [k: string]: number };

        /** Item consumable. */
        consumable: { [k: string]: (number|Long) };

        /** Item damageType. */
        damageType: string;

        /** Item primaryStat. */
        primaryStat: string;

        /** Item recipeId. */
        recipeId: string;

        /** Item buy. */
        buy: { [k: string]: (number|Long) };

        /** Item sellable. */
        sellable: { [k: string]: (number|Long) };

        /**
         * Creates a new Item instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Item instance
         */
        static create(properties: game.Item.$Shape): game.Item & game.Item.$Shape;
        static create(properties?: game.Item.$Properties): game.Item;

        /**
         * Encodes the specified Item message. Does not implicitly {@link game.Item.verify|verify} messages.
         * @param message Item message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Item.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Item message, length delimited. Does not implicitly {@link game.Item.verify|verify} messages.
         * @param message Item message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Item.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Item message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Item & game.Item.$Shape} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Item & game.Item.$Shape;

        /**
         * Decodes an Item message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Item & game.Item.$Shape} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Item & game.Item.$Shape;

        /**
         * Verifies an Item message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Item message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Item
         */
        static fromObject(object: { [k: string]: any }): game.Item;

        /**
         * Creates a plain object from an Item message. Also converts values to other types if specified.
         * @param message Item
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Item, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Item to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Item
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Item {

        /** Properties of an Item. */
        interface $Properties {

            /** Item id */
            id?: (number|Long|null);

            /** Item templateId */
            templateId?: (string|null);

            /** Item name */
            name?: (string|null);

            /** Item icon */
            icon?: (string|null);

            /** Item description */
            description?: (string|null);

            /** Item type */
            type?: (string|null);

            /** Item quantity */
            quantity?: (number|null);

            /** Item weight */
            weight?: (number|null);

            /** Item stats */
            stats?: ({ [k: string]: number }|null);

            /** Item consumable */
            consumable?: ({ [k: string]: (number|Long) }|null);

            /** Item damageType */
            damageType?: (string|null);

            /** Item primaryStat */
            primaryStat?: (string|null);

            /** Item recipeId */
            recipeId?: (string|null);

            /** Item buy */
            buy?: ({ [k: string]: (number|Long) }|null);

            /** Item sellable */
            sellable?: ({ [k: string]: (number|Long) }|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an Item. */
        type $Shape = game.Item.$Properties;
    }

    /**
     * Properties of an Inventory.
     * @deprecated Use game.Inventory.$Properties instead.
     */
    interface IInventory extends game.Inventory.$Properties {
    }

    /** Represents an Inventory. */
    class Inventory {

        /**
         * Constructs a new Inventory.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Inventory.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Inventory id. */
        id: string;

        /** Inventory type. */
        type: string;

        /** Inventory placeId. */
        placeId: string;

        /** Inventory npcId. */
        npcId: string;

        /** Inventory maxSlots. */
        maxSlots: number;

        /** Inventory maxWeight. */
        maxWeight: number;

        /** Inventory items. */
        items: game.Item.$Properties[];

        /** Inventory equipment. */
        equipment: { [k: string]: game.Item.$Properties };

        /**
         * Creates a new Inventory instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Inventory instance
         */
        static create(properties: game.Inventory.$Shape): game.Inventory & game.Inventory.$Shape;
        static create(properties?: game.Inventory.$Properties): game.Inventory;

        /**
         * Encodes the specified Inventory message. Does not implicitly {@link game.Inventory.verify|verify} messages.
         * @param message Inventory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Inventory.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Inventory message, length delimited. Does not implicitly {@link game.Inventory.verify|verify} messages.
         * @param message Inventory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Inventory.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Inventory message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Inventory & game.Inventory.$Shape} Inventory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Inventory & game.Inventory.$Shape;

        /**
         * Decodes an Inventory message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Inventory & game.Inventory.$Shape} Inventory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Inventory & game.Inventory.$Shape;

        /**
         * Verifies an Inventory message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Inventory message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Inventory
         */
        static fromObject(object: { [k: string]: any }): game.Inventory;

        /**
         * Creates a plain object from an Inventory message. Also converts values to other types if specified.
         * @param message Inventory
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Inventory, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Inventory to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Inventory
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Inventory {

        /** Properties of an Inventory. */
        interface $Properties {

            /** Inventory id */
            id?: (string|null);

            /** Inventory type */
            type?: (string|null);

            /** Inventory placeId */
            placeId?: (string|null);

            /** Inventory npcId */
            npcId?: (string|null);

            /** Inventory maxSlots */
            maxSlots?: (number|null);

            /** Inventory maxWeight */
            maxWeight?: (number|null);

            /** Inventory items */
            items?: (game.Item.$Properties[]|null);

            /** Inventory equipment */
            equipment?: ({ [k: string]: game.Item.$Properties }|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an Inventory. */
        type $Shape = game.Inventory.$Properties;
    }

    /**
     * Properties of a Building.
     * @deprecated Use game.Building.$Properties instead.
     */
    interface IBuilding extends game.Building.$Properties {
    }

    /** Represents a Building. */
    class Building {

        /**
         * Constructs a new Building.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Building.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Building id. */
        id: string;

        /** Building level. */
        level: number;

        /** Building placeId. */
        placeId: string;

        /** Building socketIndex. */
        socketIndex: number;

        /**
         * Creates a new Building instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Building instance
         */
        static create(properties: game.Building.$Shape): game.Building & game.Building.$Shape;
        static create(properties?: game.Building.$Properties): game.Building;

        /**
         * Encodes the specified Building message. Does not implicitly {@link game.Building.verify|verify} messages.
         * @param message Building message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Building.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Building message, length delimited. Does not implicitly {@link game.Building.verify|verify} messages.
         * @param message Building message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Building.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Building message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Building & game.Building.$Shape} Building
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Building & game.Building.$Shape;

        /**
         * Decodes a Building message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Building & game.Building.$Shape} Building
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Building & game.Building.$Shape;

        /**
         * Verifies a Building message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Building message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Building
         */
        static fromObject(object: { [k: string]: any }): game.Building;

        /**
         * Creates a plain object from a Building message. Also converts values to other types if specified.
         * @param message Building
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Building, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Building to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Building
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Building {

        /** Properties of a Building. */
        interface $Properties {

            /** Building id */
            id?: (string|null);

            /** Building level */
            level?: (number|null);

            /** Building placeId */
            placeId?: (string|null);

            /** Building socketIndex */
            socketIndex?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Building. */
        type $Shape = game.Building.$Properties;
    }

    /**
     * Properties of a Socket.
     * @deprecated Use game.Socket.$Properties instead.
     */
    interface ISocket extends game.Socket.$Properties {
    }

    /** Represents a Socket. */
    class Socket {

        /**
         * Constructs a new Socket.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Socket.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Socket placeId. */
        placeId: string;

        /** Socket socketIndex. */
        socketIndex: number;

        /** Socket status. */
        status: string;

        /** Socket buildingId. */
        buildingId: string;

        /** Socket level. */
        level: number;

        /**
         * Creates a new Socket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Socket instance
         */
        static create(properties: game.Socket.$Shape): game.Socket & game.Socket.$Shape;
        static create(properties?: game.Socket.$Properties): game.Socket;

        /**
         * Encodes the specified Socket message. Does not implicitly {@link game.Socket.verify|verify} messages.
         * @param message Socket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Socket.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Socket message, length delimited. Does not implicitly {@link game.Socket.verify|verify} messages.
         * @param message Socket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Socket.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Socket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Socket & game.Socket.$Shape} Socket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Socket & game.Socket.$Shape;

        /**
         * Decodes a Socket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Socket & game.Socket.$Shape} Socket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Socket & game.Socket.$Shape;

        /**
         * Verifies a Socket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Socket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Socket
         */
        static fromObject(object: { [k: string]: any }): game.Socket;

        /**
         * Creates a plain object from a Socket message. Also converts values to other types if specified.
         * @param message Socket
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Socket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Socket to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Socket
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Socket {

        /** Properties of a Socket. */
        interface $Properties {

            /** Socket placeId */
            placeId?: (string|null);

            /** Socket socketIndex */
            socketIndex?: (number|null);

            /** Socket status */
            status?: (string|null);

            /** Socket buildingId */
            buildingId?: (string|null);

            /** Socket level */
            level?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Socket. */
        type $Shape = game.Socket.$Properties;
    }

    /**
     * Properties of an Enemy.
     * @deprecated Use game.Enemy.$Properties instead.
     */
    interface IEnemy extends game.Enemy.$Properties {
    }

    /** Represents an Enemy. */
    class Enemy {

        /**
         * Constructs a new Enemy.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Enemy.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Enemy id. */
        id: string;

        /** Enemy placeId. */
        placeId: string;

        /** Enemy type. */
        type: string;

        /** Enemy name. */
        name: string;

        /** Enemy avatar. */
        avatar: string;

        /** Enemy hp. */
        hp: (number|Long);

        /** Enemy maxHp. */
        maxHp: (number|Long);

        /** Enemy strength. */
        strength: number;

        /** Enemy defense. */
        defense: number;

        /** Enemy agility. */
        agility: number;

        /** Enemy wisdom. */
        wisdom: number;

        /** Enemy intelligence. */
        intelligence: number;

        /** Enemy damageType. */
        damageType: string;

        /** Enemy attack. */
        attack: number;

        /** Enemy speed. */
        speed: number;

        /** Enemy attackPattern. */
        attackPattern: string;

        /** Enemy attackDelayRange. */
        attackDelayRange: number[];

        /** Enemy exp. */
        exp: (number|Long);

        /** Enemy gold. */
        gold: (number|Long);

        /** Enemy isDead. */
        isDead: boolean;

        /** Enemy nextAttackAt. */
        nextAttackAt: (number|Long);

        /** Enemy nextAttackDelay. */
        nextAttackDelay: (number|Long);

        /**
         * Creates a new Enemy instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Enemy instance
         */
        static create(properties: game.Enemy.$Shape): game.Enemy & game.Enemy.$Shape;
        static create(properties?: game.Enemy.$Properties): game.Enemy;

        /**
         * Encodes the specified Enemy message. Does not implicitly {@link game.Enemy.verify|verify} messages.
         * @param message Enemy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Enemy.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Enemy message, length delimited. Does not implicitly {@link game.Enemy.verify|verify} messages.
         * @param message Enemy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Enemy.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Enemy message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Enemy & game.Enemy.$Shape} Enemy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Enemy & game.Enemy.$Shape;

        /**
         * Decodes an Enemy message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Enemy & game.Enemy.$Shape} Enemy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Enemy & game.Enemy.$Shape;

        /**
         * Verifies an Enemy message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Enemy message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Enemy
         */
        static fromObject(object: { [k: string]: any }): game.Enemy;

        /**
         * Creates a plain object from an Enemy message. Also converts values to other types if specified.
         * @param message Enemy
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Enemy, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Enemy to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Enemy
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Enemy {

        /** Properties of an Enemy. */
        interface $Properties {

            /** Enemy id */
            id?: (string|null);

            /** Enemy placeId */
            placeId?: (string|null);

            /** Enemy type */
            type?: (string|null);

            /** Enemy name */
            name?: (string|null);

            /** Enemy avatar */
            avatar?: (string|null);

            /** Enemy hp */
            hp?: (number|Long|null);

            /** Enemy maxHp */
            maxHp?: (number|Long|null);

            /** Enemy strength */
            strength?: (number|null);

            /** Enemy defense */
            defense?: (number|null);

            /** Enemy agility */
            agility?: (number|null);

            /** Enemy wisdom */
            wisdom?: (number|null);

            /** Enemy intelligence */
            intelligence?: (number|null);

            /** Enemy damageType */
            damageType?: (string|null);

            /** Enemy attack */
            attack?: (number|null);

            /** Enemy speed */
            speed?: (number|null);

            /** Enemy attackPattern */
            attackPattern?: (string|null);

            /** Enemy attackDelayRange */
            attackDelayRange?: (number[]|null);

            /** Enemy exp */
            exp?: (number|Long|null);

            /** Enemy gold */
            gold?: (number|Long|null);

            /** Enemy isDead */
            isDead?: (boolean|null);

            /** Enemy nextAttackAt */
            nextAttackAt?: (number|Long|null);

            /** Enemy nextAttackDelay */
            nextAttackDelay?: (number|Long|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an Enemy. */
        type $Shape = game.Enemy.$Properties;
    }

    /**
     * Properties of an Assignment.
     * @deprecated Use game.Assignment.$Properties instead.
     */
    interface IAssignment extends game.Assignment.$Properties {
    }

    /** Represents an Assignment. */
    class Assignment {

        /**
         * Constructs a new Assignment.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Assignment.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Assignment placeId. */
        placeId: string;

        /** Assignment socketIndex. */
        socketIndex: number;

        /** Assignment material. */
        material: string;

        /**
         * Creates a new Assignment instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Assignment instance
         */
        static create(properties: game.Assignment.$Shape): game.Assignment & game.Assignment.$Shape;
        static create(properties?: game.Assignment.$Properties): game.Assignment;

        /**
         * Encodes the specified Assignment message. Does not implicitly {@link game.Assignment.verify|verify} messages.
         * @param message Assignment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Assignment.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Assignment message, length delimited. Does not implicitly {@link game.Assignment.verify|verify} messages.
         * @param message Assignment message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Assignment.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Assignment message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Assignment & game.Assignment.$Shape} Assignment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Assignment & game.Assignment.$Shape;

        /**
         * Decodes an Assignment message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Assignment & game.Assignment.$Shape} Assignment
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Assignment & game.Assignment.$Shape;

        /**
         * Verifies an Assignment message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Assignment message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Assignment
         */
        static fromObject(object: { [k: string]: any }): game.Assignment;

        /**
         * Creates a plain object from an Assignment message. Also converts values to other types if specified.
         * @param message Assignment
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Assignment, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Assignment to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Assignment
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Assignment {

        /** Properties of an Assignment. */
        interface $Properties {

            /** Assignment placeId */
            placeId?: (string|null);

            /** Assignment socketIndex */
            socketIndex?: (number|null);

            /** Assignment material */
            material?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an Assignment. */
        type $Shape = game.Assignment.$Properties;
    }

    /**
     * Properties of a Worker.
     * @deprecated Use game.Worker.$Properties instead.
     */
    interface IWorker extends game.Worker.$Properties {
    }

    /** Represents a Worker. */
    class Worker {

        /**
         * Constructs a new Worker.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Worker.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Worker id. */
        id: string;

        /** Worker firstName. */
        firstName: string;

        /** Worker name. */
        name: string;

        /** Worker gender. */
        gender: string;

        /** Worker avatar. */
        avatar: string;

        /** Worker assignment. */
        assignment?: (game.Assignment.$Properties|null);

        /**
         * Creates a new Worker instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Worker instance
         */
        static create(properties: game.Worker.$Shape): game.Worker & game.Worker.$Shape;
        static create(properties?: game.Worker.$Properties): game.Worker;

        /**
         * Encodes the specified Worker message. Does not implicitly {@link game.Worker.verify|verify} messages.
         * @param message Worker message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Worker.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Worker message, length delimited. Does not implicitly {@link game.Worker.verify|verify} messages.
         * @param message Worker message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Worker.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Worker message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Worker & game.Worker.$Shape} Worker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Worker & game.Worker.$Shape;

        /**
         * Decodes a Worker message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Worker & game.Worker.$Shape} Worker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Worker & game.Worker.$Shape;

        /**
         * Verifies a Worker message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Worker message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Worker
         */
        static fromObject(object: { [k: string]: any }): game.Worker;

        /**
         * Creates a plain object from a Worker message. Also converts values to other types if specified.
         * @param message Worker
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Worker, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Worker to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Worker
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Worker {

        /** Properties of a Worker. */
        interface $Properties {

            /** Worker id */
            id?: (string|null);

            /** Worker firstName */
            firstName?: (string|null);

            /** Worker name */
            name?: (string|null);

            /** Worker gender */
            gender?: (string|null);

            /** Worker avatar */
            avatar?: (string|null);

            /** Worker assignment */
            assignment?: (game.Assignment.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Worker. */
        type $Shape = game.Worker.$Properties;
    }

    /**
     * Properties of a Workers.
     * @deprecated Use game.Workers.$Properties instead.
     */
    interface IWorkers extends game.Workers.$Properties {
    }

    /** Represents a Workers. */
    class Workers {

        /**
         * Constructs a new Workers.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Workers.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Workers hired. */
        hired: game.Worker.$Properties[];

        /** Workers available. */
        available: game.Worker.$Properties[];

        /** Workers workerSlots. */
        workerSlots: number;

        /**
         * Creates a new Workers instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Workers instance
         */
        static create(properties: game.Workers.$Shape): game.Workers & game.Workers.$Shape;
        static create(properties?: game.Workers.$Properties): game.Workers;

        /**
         * Encodes the specified Workers message. Does not implicitly {@link game.Workers.verify|verify} messages.
         * @param message Workers message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Workers.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Workers message, length delimited. Does not implicitly {@link game.Workers.verify|verify} messages.
         * @param message Workers message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Workers.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Workers message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Workers & game.Workers.$Shape} Workers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Workers & game.Workers.$Shape;

        /**
         * Decodes a Workers message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Workers & game.Workers.$Shape} Workers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Workers & game.Workers.$Shape;

        /**
         * Verifies a Workers message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Workers message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Workers
         */
        static fromObject(object: { [k: string]: any }): game.Workers;

        /**
         * Creates a plain object from a Workers message. Also converts values to other types if specified.
         * @param message Workers
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Workers, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Workers to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Workers
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Workers {

        /** Properties of a Workers. */
        interface $Properties {

            /** Workers hired */
            hired?: (game.Worker.$Properties[]|null);

            /** Workers available */
            available?: (game.Worker.$Properties[]|null);

            /** Workers workerSlots */
            workerSlots?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Workers. */
        type $Shape = game.Workers.$Properties;
    }

    /**
     * Properties of a QuestEntry.
     * @deprecated Use game.QuestEntry.$Properties instead.
     */
    interface IQuestEntry extends game.QuestEntry.$Properties {
    }

    /** Represents a QuestEntry. */
    class QuestEntry {

        /**
         * Constructs a new QuestEntry.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.QuestEntry.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** QuestEntry questId. */
        questId: string;

        /** QuestEntry startedAt. */
        startedAt: (number|Long);

        /** QuestEntry progress. */
        progress: { [k: string]: (number|Long) };

        /**
         * Creates a new QuestEntry instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QuestEntry instance
         */
        static create(properties: game.QuestEntry.$Shape): game.QuestEntry & game.QuestEntry.$Shape;
        static create(properties?: game.QuestEntry.$Properties): game.QuestEntry;

        /**
         * Encodes the specified QuestEntry message. Does not implicitly {@link game.QuestEntry.verify|verify} messages.
         * @param message QuestEntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.QuestEntry.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified QuestEntry message, length delimited. Does not implicitly {@link game.QuestEntry.verify|verify} messages.
         * @param message QuestEntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.QuestEntry.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a QuestEntry message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.QuestEntry & game.QuestEntry.$Shape} QuestEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.QuestEntry & game.QuestEntry.$Shape;

        /**
         * Decodes a QuestEntry message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.QuestEntry & game.QuestEntry.$Shape} QuestEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.QuestEntry & game.QuestEntry.$Shape;

        /**
         * Verifies a QuestEntry message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a QuestEntry message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns QuestEntry
         */
        static fromObject(object: { [k: string]: any }): game.QuestEntry;

        /**
         * Creates a plain object from a QuestEntry message. Also converts values to other types if specified.
         * @param message QuestEntry
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.QuestEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this QuestEntry to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for QuestEntry
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace QuestEntry {

        /** Properties of a QuestEntry. */
        interface $Properties {

            /** QuestEntry questId */
            questId?: (string|null);

            /** QuestEntry startedAt */
            startedAt?: (number|Long|null);

            /** QuestEntry progress */
            progress?: ({ [k: string]: (number|Long) }|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a QuestEntry. */
        type $Shape = game.QuestEntry.$Properties;
    }

    /**
     * Properties of a CompletedQuest.
     * @deprecated Use game.CompletedQuest.$Properties instead.
     */
    interface ICompletedQuest extends game.CompletedQuest.$Properties {
    }

    /** Represents a CompletedQuest. */
    class CompletedQuest {

        /**
         * Constructs a new CompletedQuest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.CompletedQuest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CompletedQuest completedAt. */
        completedAt: (number|Long);

        /**
         * Creates a new CompletedQuest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CompletedQuest instance
         */
        static create(properties: game.CompletedQuest.$Shape): game.CompletedQuest & game.CompletedQuest.$Shape;
        static create(properties?: game.CompletedQuest.$Properties): game.CompletedQuest;

        /**
         * Encodes the specified CompletedQuest message. Does not implicitly {@link game.CompletedQuest.verify|verify} messages.
         * @param message CompletedQuest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.CompletedQuest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CompletedQuest message, length delimited. Does not implicitly {@link game.CompletedQuest.verify|verify} messages.
         * @param message CompletedQuest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.CompletedQuest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CompletedQuest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.CompletedQuest & game.CompletedQuest.$Shape} CompletedQuest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.CompletedQuest & game.CompletedQuest.$Shape;

        /**
         * Decodes a CompletedQuest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.CompletedQuest & game.CompletedQuest.$Shape} CompletedQuest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.CompletedQuest & game.CompletedQuest.$Shape;

        /**
         * Verifies a CompletedQuest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CompletedQuest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CompletedQuest
         */
        static fromObject(object: { [k: string]: any }): game.CompletedQuest;

        /**
         * Creates a plain object from a CompletedQuest message. Also converts values to other types if specified.
         * @param message CompletedQuest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.CompletedQuest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CompletedQuest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CompletedQuest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CompletedQuest {

        /** Properties of a CompletedQuest. */
        interface $Properties {

            /** CompletedQuest completedAt */
            completedAt?: (number|Long|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CompletedQuest. */
        type $Shape = game.CompletedQuest.$Properties;
    }

    /**
     * Properties of a Quests.
     * @deprecated Use game.Quests.$Properties instead.
     */
    interface IQuests extends game.Quests.$Properties {
    }

    /** Represents a Quests. */
    class Quests {

        /**
         * Constructs a new Quests.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Quests.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Quests active. */
        active: { [k: string]: game.QuestEntry.$Properties };

        /** Quests completed. */
        completed: { [k: string]: game.CompletedQuest.$Properties };

        /**
         * Creates a new Quests instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Quests instance
         */
        static create(properties: game.Quests.$Shape): game.Quests & game.Quests.$Shape;
        static create(properties?: game.Quests.$Properties): game.Quests;

        /**
         * Encodes the specified Quests message. Does not implicitly {@link game.Quests.verify|verify} messages.
         * @param message Quests message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Quests.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Quests message, length delimited. Does not implicitly {@link game.Quests.verify|verify} messages.
         * @param message Quests message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Quests.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Quests message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Quests & game.Quests.$Shape} Quests
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Quests & game.Quests.$Shape;

        /**
         * Decodes a Quests message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Quests & game.Quests.$Shape} Quests
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Quests & game.Quests.$Shape;

        /**
         * Verifies a Quests message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Quests message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Quests
         */
        static fromObject(object: { [k: string]: any }): game.Quests;

        /**
         * Creates a plain object from a Quests message. Also converts values to other types if specified.
         * @param message Quests
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Quests, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Quests to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Quests
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Quests {

        /** Properties of a Quests. */
        interface $Properties {

            /** Quests active */
            active?: ({ [k: string]: game.QuestEntry.$Properties }|null);

            /** Quests completed */
            completed?: ({ [k: string]: game.CompletedQuest.$Properties }|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Quests. */
        type $Shape = game.Quests.$Properties;
    }

    /**
     * Properties of a Rewards.
     * @deprecated Use game.Rewards.$Properties instead.
     */
    interface IRewards extends game.Rewards.$Properties {
    }

    /** Represents a Rewards. */
    class Rewards {

        /**
         * Constructs a new Rewards.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Rewards.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Rewards gold. */
        gold: (number|Long);

        /** Rewards exp. */
        exp: (number|Long);

        /** Rewards items. */
        items: game.Item.$Properties[];

        /**
         * Creates a new Rewards instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Rewards instance
         */
        static create(properties: game.Rewards.$Shape): game.Rewards & game.Rewards.$Shape;
        static create(properties?: game.Rewards.$Properties): game.Rewards;

        /**
         * Encodes the specified Rewards message. Does not implicitly {@link game.Rewards.verify|verify} messages.
         * @param message Rewards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Rewards.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Rewards message, length delimited. Does not implicitly {@link game.Rewards.verify|verify} messages.
         * @param message Rewards message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Rewards.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Rewards message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Rewards & game.Rewards.$Shape} Rewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Rewards & game.Rewards.$Shape;

        /**
         * Decodes a Rewards message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Rewards & game.Rewards.$Shape} Rewards
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Rewards & game.Rewards.$Shape;

        /**
         * Verifies a Rewards message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Rewards message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Rewards
         */
        static fromObject(object: { [k: string]: any }): game.Rewards;

        /**
         * Creates a plain object from a Rewards message. Also converts values to other types if specified.
         * @param message Rewards
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Rewards, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Rewards to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Rewards
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Rewards {

        /** Properties of a Rewards. */
        interface $Properties {

            /** Rewards gold */
            gold?: (number|Long|null);

            /** Rewards exp */
            exp?: (number|Long|null);

            /** Rewards items */
            items?: (game.Item.$Properties[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Rewards. */
        type $Shape = game.Rewards.$Properties;
    }

    /**
     * Properties of a JoinRequest.
     * @deprecated Use game.JoinRequest.$Properties instead.
     */
    interface IJoinRequest extends game.JoinRequest.$Properties {
    }

    /** Represents a JoinRequest. */
    class JoinRequest {

        /**
         * Constructs a new JoinRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.JoinRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** JoinRequest nickname. */
        nickname: string;

        /** JoinRequest protocolVersion. */
        protocolVersion: number;

        /**
         * Creates a new JoinRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinRequest instance
         */
        static create(properties: game.JoinRequest.$Shape): game.JoinRequest & game.JoinRequest.$Shape;
        static create(properties?: game.JoinRequest.$Properties): game.JoinRequest;

        /**
         * Encodes the specified JoinRequest message. Does not implicitly {@link game.JoinRequest.verify|verify} messages.
         * @param message JoinRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.JoinRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinRequest message, length delimited. Does not implicitly {@link game.JoinRequest.verify|verify} messages.
         * @param message JoinRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.JoinRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.JoinRequest & game.JoinRequest.$Shape} JoinRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.JoinRequest & game.JoinRequest.$Shape;

        /**
         * Decodes a JoinRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.JoinRequest & game.JoinRequest.$Shape} JoinRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.JoinRequest & game.JoinRequest.$Shape;

        /**
         * Verifies a JoinRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinRequest
         */
        static fromObject(object: { [k: string]: any }): game.JoinRequest;

        /**
         * Creates a plain object from a JoinRequest message. Also converts values to other types if specified.
         * @param message JoinRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.JoinRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for JoinRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace JoinRequest {

        /** Properties of a JoinRequest. */
        interface $Properties {

            /** JoinRequest nickname */
            nickname?: (string|null);

            /** JoinRequest protocolVersion */
            protocolVersion?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a JoinRequest. */
        type $Shape = game.JoinRequest.$Properties;
    }

    /**
     * Properties of a ResumeRequest.
     * @deprecated Use game.ResumeRequest.$Properties instead.
     */
    interface IResumeRequest extends game.ResumeRequest.$Properties {
    }

    /** Represents a ResumeRequest. */
    class ResumeRequest {

        /**
         * Constructs a new ResumeRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.ResumeRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** ResumeRequest sessionId. */
        sessionId: string;

        /** ResumeRequest nickname. */
        nickname: string;

        /** ResumeRequest protocolVersion. */
        protocolVersion: number;

        /**
         * Creates a new ResumeRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResumeRequest instance
         */
        static create(properties: game.ResumeRequest.$Shape): game.ResumeRequest & game.ResumeRequest.$Shape;
        static create(properties?: game.ResumeRequest.$Properties): game.ResumeRequest;

        /**
         * Encodes the specified ResumeRequest message. Does not implicitly {@link game.ResumeRequest.verify|verify} messages.
         * @param message ResumeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.ResumeRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResumeRequest message, length delimited. Does not implicitly {@link game.ResumeRequest.verify|verify} messages.
         * @param message ResumeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.ResumeRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResumeRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.ResumeRequest & game.ResumeRequest.$Shape} ResumeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.ResumeRequest & game.ResumeRequest.$Shape;

        /**
         * Decodes a ResumeRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.ResumeRequest & game.ResumeRequest.$Shape} ResumeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.ResumeRequest & game.ResumeRequest.$Shape;

        /**
         * Verifies a ResumeRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResumeRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResumeRequest
         */
        static fromObject(object: { [k: string]: any }): game.ResumeRequest;

        /**
         * Creates a plain object from a ResumeRequest message. Also converts values to other types if specified.
         * @param message ResumeRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.ResumeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResumeRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for ResumeRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace ResumeRequest {

        /** Properties of a ResumeRequest. */
        interface $Properties {

            /** ResumeRequest sessionId */
            sessionId?: (string|null);

            /** ResumeRequest nickname */
            nickname?: (string|null);

            /** ResumeRequest protocolVersion */
            protocolVersion?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a ResumeRequest. */
        type $Shape = game.ResumeRequest.$Properties;
    }

    /**
     * Properties of a ToggleAutoCombat.
     * @deprecated Use game.ToggleAutoCombat.$Properties instead.
     */
    interface IToggleAutoCombat extends game.ToggleAutoCombat.$Properties {
    }

    /** Represents a ToggleAutoCombat. */
    class ToggleAutoCombat {

        /**
         * Constructs a new ToggleAutoCombat.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.ToggleAutoCombat.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /**
         * Creates a new ToggleAutoCombat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ToggleAutoCombat instance
         */
        static create(properties: game.ToggleAutoCombat.$Shape): game.ToggleAutoCombat & game.ToggleAutoCombat.$Shape;
        static create(properties?: game.ToggleAutoCombat.$Properties): game.ToggleAutoCombat;

        /**
         * Encodes the specified ToggleAutoCombat message. Does not implicitly {@link game.ToggleAutoCombat.verify|verify} messages.
         * @param message ToggleAutoCombat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.ToggleAutoCombat.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ToggleAutoCombat message, length delimited. Does not implicitly {@link game.ToggleAutoCombat.verify|verify} messages.
         * @param message ToggleAutoCombat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.ToggleAutoCombat.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ToggleAutoCombat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.ToggleAutoCombat & game.ToggleAutoCombat.$Shape} ToggleAutoCombat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.ToggleAutoCombat & game.ToggleAutoCombat.$Shape;

        /**
         * Decodes a ToggleAutoCombat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.ToggleAutoCombat & game.ToggleAutoCombat.$Shape} ToggleAutoCombat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.ToggleAutoCombat & game.ToggleAutoCombat.$Shape;

        /**
         * Verifies a ToggleAutoCombat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ToggleAutoCombat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ToggleAutoCombat
         */
        static fromObject(object: { [k: string]: any }): game.ToggleAutoCombat;

        /**
         * Creates a plain object from a ToggleAutoCombat message. Also converts values to other types if specified.
         * @param message ToggleAutoCombat
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.ToggleAutoCombat, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ToggleAutoCombat to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for ToggleAutoCombat
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace ToggleAutoCombat {

        /** Properties of a ToggleAutoCombat. */
        interface $Properties {

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a ToggleAutoCombat. */
        type $Shape = game.ToggleAutoCombat.$Properties;
    }

    /**
     * Properties of a ReviveRequest.
     * @deprecated Use game.ReviveRequest.$Properties instead.
     */
    interface IReviveRequest extends game.ReviveRequest.$Properties {
    }

    /** Represents a ReviveRequest. */
    class ReviveRequest {

        /**
         * Constructs a new ReviveRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.ReviveRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /**
         * Creates a new ReviveRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReviveRequest instance
         */
        static create(properties: game.ReviveRequest.$Shape): game.ReviveRequest & game.ReviveRequest.$Shape;
        static create(properties?: game.ReviveRequest.$Properties): game.ReviveRequest;

        /**
         * Encodes the specified ReviveRequest message. Does not implicitly {@link game.ReviveRequest.verify|verify} messages.
         * @param message ReviveRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.ReviveRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReviveRequest message, length delimited. Does not implicitly {@link game.ReviveRequest.verify|verify} messages.
         * @param message ReviveRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.ReviveRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReviveRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.ReviveRequest & game.ReviveRequest.$Shape} ReviveRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.ReviveRequest & game.ReviveRequest.$Shape;

        /**
         * Decodes a ReviveRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.ReviveRequest & game.ReviveRequest.$Shape} ReviveRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.ReviveRequest & game.ReviveRequest.$Shape;

        /**
         * Verifies a ReviveRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReviveRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReviveRequest
         */
        static fromObject(object: { [k: string]: any }): game.ReviveRequest;

        /**
         * Creates a plain object from a ReviveRequest message. Also converts values to other types if specified.
         * @param message ReviveRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.ReviveRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReviveRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for ReviveRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace ReviveRequest {

        /** Properties of a ReviveRequest. */
        interface $Properties {

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a ReviveRequest. */
        type $Shape = game.ReviveRequest.$Properties;
    }

    /**
     * Properties of a SpendSkillPoint.
     * @deprecated Use game.SpendSkillPoint.$Properties instead.
     */
    interface ISpendSkillPoint extends game.SpendSkillPoint.$Properties {
    }

    /** Represents a SpendSkillPoint. */
    class SpendSkillPoint {

        /**
         * Constructs a new SpendSkillPoint.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.SpendSkillPoint.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** SpendSkillPoint skillId. */
        skillId: string;

        /**
         * Creates a new SpendSkillPoint instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SpendSkillPoint instance
         */
        static create(properties: game.SpendSkillPoint.$Shape): game.SpendSkillPoint & game.SpendSkillPoint.$Shape;
        static create(properties?: game.SpendSkillPoint.$Properties): game.SpendSkillPoint;

        /**
         * Encodes the specified SpendSkillPoint message. Does not implicitly {@link game.SpendSkillPoint.verify|verify} messages.
         * @param message SpendSkillPoint message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.SpendSkillPoint.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SpendSkillPoint message, length delimited. Does not implicitly {@link game.SpendSkillPoint.verify|verify} messages.
         * @param message SpendSkillPoint message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.SpendSkillPoint.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SpendSkillPoint message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.SpendSkillPoint & game.SpendSkillPoint.$Shape} SpendSkillPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.SpendSkillPoint & game.SpendSkillPoint.$Shape;

        /**
         * Decodes a SpendSkillPoint message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.SpendSkillPoint & game.SpendSkillPoint.$Shape} SpendSkillPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.SpendSkillPoint & game.SpendSkillPoint.$Shape;

        /**
         * Verifies a SpendSkillPoint message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SpendSkillPoint message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SpendSkillPoint
         */
        static fromObject(object: { [k: string]: any }): game.SpendSkillPoint;

        /**
         * Creates a plain object from a SpendSkillPoint message. Also converts values to other types if specified.
         * @param message SpendSkillPoint
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.SpendSkillPoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SpendSkillPoint to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for SpendSkillPoint
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace SpendSkillPoint {

        /** Properties of a SpendSkillPoint. */
        interface $Properties {

            /** SpendSkillPoint skillId */
            skillId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a SpendSkillPoint. */
        type $Shape = game.SpendSkillPoint.$Properties;
    }

    /**
     * Properties of a LevelUpRequest.
     * @deprecated Use game.LevelUpRequest.$Properties instead.
     */
    interface ILevelUpRequest extends game.LevelUpRequest.$Properties {
    }

    /** Represents a LevelUpRequest. */
    class LevelUpRequest {

        /**
         * Constructs a new LevelUpRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.LevelUpRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** LevelUpRequest bonuses. */
        bonuses?: (game.Stats.$Properties|null);

        /**
         * Creates a new LevelUpRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LevelUpRequest instance
         */
        static create(properties: game.LevelUpRequest.$Shape): game.LevelUpRequest & game.LevelUpRequest.$Shape;
        static create(properties?: game.LevelUpRequest.$Properties): game.LevelUpRequest;

        /**
         * Encodes the specified LevelUpRequest message. Does not implicitly {@link game.LevelUpRequest.verify|verify} messages.
         * @param message LevelUpRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.LevelUpRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LevelUpRequest message, length delimited. Does not implicitly {@link game.LevelUpRequest.verify|verify} messages.
         * @param message LevelUpRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.LevelUpRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LevelUpRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.LevelUpRequest & game.LevelUpRequest.$Shape} LevelUpRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.LevelUpRequest & game.LevelUpRequest.$Shape;

        /**
         * Decodes a LevelUpRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.LevelUpRequest & game.LevelUpRequest.$Shape} LevelUpRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.LevelUpRequest & game.LevelUpRequest.$Shape;

        /**
         * Verifies a LevelUpRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LevelUpRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LevelUpRequest
         */
        static fromObject(object: { [k: string]: any }): game.LevelUpRequest;

        /**
         * Creates a plain object from a LevelUpRequest message. Also converts values to other types if specified.
         * @param message LevelUpRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.LevelUpRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LevelUpRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for LevelUpRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace LevelUpRequest {

        /** Properties of a LevelUpRequest. */
        interface $Properties {

            /** LevelUpRequest bonuses */
            bonuses?: (game.Stats.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a LevelUpRequest. */
        type $Shape = game.LevelUpRequest.$Properties;
    }

    /**
     * Properties of a NavigateRequest.
     * @deprecated Use game.NavigateRequest.$Properties instead.
     */
    interface INavigateRequest extends game.NavigateRequest.$Properties {
    }

    /** Represents a NavigateRequest. */
    class NavigateRequest {

        /**
         * Constructs a new NavigateRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.NavigateRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** NavigateRequest placeId. */
        placeId: string;

        /**
         * Creates a new NavigateRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NavigateRequest instance
         */
        static create(properties: game.NavigateRequest.$Shape): game.NavigateRequest & game.NavigateRequest.$Shape;
        static create(properties?: game.NavigateRequest.$Properties): game.NavigateRequest;

        /**
         * Encodes the specified NavigateRequest message. Does not implicitly {@link game.NavigateRequest.verify|verify} messages.
         * @param message NavigateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.NavigateRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NavigateRequest message, length delimited. Does not implicitly {@link game.NavigateRequest.verify|verify} messages.
         * @param message NavigateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.NavigateRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NavigateRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.NavigateRequest & game.NavigateRequest.$Shape} NavigateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.NavigateRequest & game.NavigateRequest.$Shape;

        /**
         * Decodes a NavigateRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.NavigateRequest & game.NavigateRequest.$Shape} NavigateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.NavigateRequest & game.NavigateRequest.$Shape;

        /**
         * Verifies a NavigateRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NavigateRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NavigateRequest
         */
        static fromObject(object: { [k: string]: any }): game.NavigateRequest;

        /**
         * Creates a plain object from a NavigateRequest message. Also converts values to other types if specified.
         * @param message NavigateRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.NavigateRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NavigateRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for NavigateRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace NavigateRequest {

        /** Properties of a NavigateRequest. */
        interface $Properties {

            /** NavigateRequest placeId */
            placeId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a NavigateRequest. */
        type $Shape = game.NavigateRequest.$Properties;
    }

    /**
     * Properties of a BuySocket.
     * @deprecated Use game.BuySocket.$Properties instead.
     */
    interface IBuySocket extends game.BuySocket.$Properties {
    }

    /** Represents a BuySocket. */
    class BuySocket {

        /**
         * Constructs a new BuySocket.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.BuySocket.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** BuySocket placeId. */
        placeId: string;

        /** BuySocket socketIndex. */
        socketIndex: number;

        /**
         * Creates a new BuySocket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BuySocket instance
         */
        static create(properties: game.BuySocket.$Shape): game.BuySocket & game.BuySocket.$Shape;
        static create(properties?: game.BuySocket.$Properties): game.BuySocket;

        /**
         * Encodes the specified BuySocket message. Does not implicitly {@link game.BuySocket.verify|verify} messages.
         * @param message BuySocket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.BuySocket.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BuySocket message, length delimited. Does not implicitly {@link game.BuySocket.verify|verify} messages.
         * @param message BuySocket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.BuySocket.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BuySocket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.BuySocket & game.BuySocket.$Shape} BuySocket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.BuySocket & game.BuySocket.$Shape;

        /**
         * Decodes a BuySocket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.BuySocket & game.BuySocket.$Shape} BuySocket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.BuySocket & game.BuySocket.$Shape;

        /**
         * Verifies a BuySocket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BuySocket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BuySocket
         */
        static fromObject(object: { [k: string]: any }): game.BuySocket;

        /**
         * Creates a plain object from a BuySocket message. Also converts values to other types if specified.
         * @param message BuySocket
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.BuySocket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BuySocket to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for BuySocket
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace BuySocket {

        /** Properties of a BuySocket. */
        interface $Properties {

            /** BuySocket placeId */
            placeId?: (string|null);

            /** BuySocket socketIndex */
            socketIndex?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a BuySocket. */
        type $Shape = game.BuySocket.$Properties;
    }

    /**
     * Properties of a BuildRequest.
     * @deprecated Use game.BuildRequest.$Properties instead.
     */
    interface IBuildRequest extends game.BuildRequest.$Properties {
    }

    /** Represents a BuildRequest. */
    class BuildRequest {

        /**
         * Constructs a new BuildRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.BuildRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** BuildRequest placeId. */
        placeId: string;

        /** BuildRequest socketIndex. */
        socketIndex: number;

        /** BuildRequest buildingId. */
        buildingId: string;

        /**
         * Creates a new BuildRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BuildRequest instance
         */
        static create(properties: game.BuildRequest.$Shape): game.BuildRequest & game.BuildRequest.$Shape;
        static create(properties?: game.BuildRequest.$Properties): game.BuildRequest;

        /**
         * Encodes the specified BuildRequest message. Does not implicitly {@link game.BuildRequest.verify|verify} messages.
         * @param message BuildRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.BuildRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BuildRequest message, length delimited. Does not implicitly {@link game.BuildRequest.verify|verify} messages.
         * @param message BuildRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.BuildRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BuildRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.BuildRequest & game.BuildRequest.$Shape} BuildRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.BuildRequest & game.BuildRequest.$Shape;

        /**
         * Decodes a BuildRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.BuildRequest & game.BuildRequest.$Shape} BuildRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.BuildRequest & game.BuildRequest.$Shape;

        /**
         * Verifies a BuildRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BuildRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BuildRequest
         */
        static fromObject(object: { [k: string]: any }): game.BuildRequest;

        /**
         * Creates a plain object from a BuildRequest message. Also converts values to other types if specified.
         * @param message BuildRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.BuildRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BuildRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for BuildRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace BuildRequest {

        /** Properties of a BuildRequest. */
        interface $Properties {

            /** BuildRequest placeId */
            placeId?: (string|null);

            /** BuildRequest socketIndex */
            socketIndex?: (number|null);

            /** BuildRequest buildingId */
            buildingId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a BuildRequest. */
        type $Shape = game.BuildRequest.$Properties;
    }

    /**
     * Properties of an UpgradeBuilding.
     * @deprecated Use game.UpgradeBuilding.$Properties instead.
     */
    interface IUpgradeBuilding extends game.UpgradeBuilding.$Properties {
    }

    /** Represents an UpgradeBuilding. */
    class UpgradeBuilding {

        /**
         * Constructs a new UpgradeBuilding.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.UpgradeBuilding.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** UpgradeBuilding placeId. */
        placeId: string;

        /** UpgradeBuilding socketIndex. */
        socketIndex: number;

        /**
         * Creates a new UpgradeBuilding instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpgradeBuilding instance
         */
        static create(properties: game.UpgradeBuilding.$Shape): game.UpgradeBuilding & game.UpgradeBuilding.$Shape;
        static create(properties?: game.UpgradeBuilding.$Properties): game.UpgradeBuilding;

        /**
         * Encodes the specified UpgradeBuilding message. Does not implicitly {@link game.UpgradeBuilding.verify|verify} messages.
         * @param message UpgradeBuilding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.UpgradeBuilding.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpgradeBuilding message, length delimited. Does not implicitly {@link game.UpgradeBuilding.verify|verify} messages.
         * @param message UpgradeBuilding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.UpgradeBuilding.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpgradeBuilding message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.UpgradeBuilding & game.UpgradeBuilding.$Shape} UpgradeBuilding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.UpgradeBuilding & game.UpgradeBuilding.$Shape;

        /**
         * Decodes an UpgradeBuilding message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.UpgradeBuilding & game.UpgradeBuilding.$Shape} UpgradeBuilding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.UpgradeBuilding & game.UpgradeBuilding.$Shape;

        /**
         * Verifies an UpgradeBuilding message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpgradeBuilding message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpgradeBuilding
         */
        static fromObject(object: { [k: string]: any }): game.UpgradeBuilding;

        /**
         * Creates a plain object from an UpgradeBuilding message. Also converts values to other types if specified.
         * @param message UpgradeBuilding
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.UpgradeBuilding, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpgradeBuilding to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for UpgradeBuilding
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace UpgradeBuilding {

        /** Properties of an UpgradeBuilding. */
        interface $Properties {

            /** UpgradeBuilding placeId */
            placeId?: (string|null);

            /** UpgradeBuilding socketIndex */
            socketIndex?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an UpgradeBuilding. */
        type $Shape = game.UpgradeBuilding.$Properties;
    }

    /**
     * Properties of a Demolish.
     * @deprecated Use game.Demolish.$Properties instead.
     */
    interface IDemolish extends game.Demolish.$Properties {
    }

    /** Represents a Demolish. */
    class Demolish {

        /**
         * Constructs a new Demolish.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Demolish.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Demolish placeId. */
        placeId: string;

        /** Demolish socketIndex. */
        socketIndex: number;

        /**
         * Creates a new Demolish instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Demolish instance
         */
        static create(properties: game.Demolish.$Shape): game.Demolish & game.Demolish.$Shape;
        static create(properties?: game.Demolish.$Properties): game.Demolish;

        /**
         * Encodes the specified Demolish message. Does not implicitly {@link game.Demolish.verify|verify} messages.
         * @param message Demolish message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Demolish.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Demolish message, length delimited. Does not implicitly {@link game.Demolish.verify|verify} messages.
         * @param message Demolish message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Demolish.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Demolish message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Demolish & game.Demolish.$Shape} Demolish
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Demolish & game.Demolish.$Shape;

        /**
         * Decodes a Demolish message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Demolish & game.Demolish.$Shape} Demolish
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Demolish & game.Demolish.$Shape;

        /**
         * Verifies a Demolish message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Demolish message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Demolish
         */
        static fromObject(object: { [k: string]: any }): game.Demolish;

        /**
         * Creates a plain object from a Demolish message. Also converts values to other types if specified.
         * @param message Demolish
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Demolish, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Demolish to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Demolish
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Demolish {

        /** Properties of a Demolish. */
        interface $Properties {

            /** Demolish placeId */
            placeId?: (string|null);

            /** Demolish socketIndex */
            socketIndex?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Demolish. */
        type $Shape = game.Demolish.$Properties;
    }

    /**
     * Properties of an AssignWorker.
     * @deprecated Use game.AssignWorker.$Properties instead.
     */
    interface IAssignWorker extends game.AssignWorker.$Properties {
    }

    /** Represents an AssignWorker. */
    class AssignWorker {

        /**
         * Constructs a new AssignWorker.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.AssignWorker.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** AssignWorker placeId. */
        placeId: string;

        /** AssignWorker socketIndex. */
        socketIndex: number;

        /** AssignWorker workerId. */
        workerId: string;

        /** AssignWorker material. */
        material: string;

        /**
         * Creates a new AssignWorker instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AssignWorker instance
         */
        static create(properties: game.AssignWorker.$Shape): game.AssignWorker & game.AssignWorker.$Shape;
        static create(properties?: game.AssignWorker.$Properties): game.AssignWorker;

        /**
         * Encodes the specified AssignWorker message. Does not implicitly {@link game.AssignWorker.verify|verify} messages.
         * @param message AssignWorker message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.AssignWorker.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AssignWorker message, length delimited. Does not implicitly {@link game.AssignWorker.verify|verify} messages.
         * @param message AssignWorker message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.AssignWorker.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AssignWorker message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.AssignWorker & game.AssignWorker.$Shape} AssignWorker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.AssignWorker & game.AssignWorker.$Shape;

        /**
         * Decodes an AssignWorker message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.AssignWorker & game.AssignWorker.$Shape} AssignWorker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.AssignWorker & game.AssignWorker.$Shape;

        /**
         * Verifies an AssignWorker message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AssignWorker message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AssignWorker
         */
        static fromObject(object: { [k: string]: any }): game.AssignWorker;

        /**
         * Creates a plain object from an AssignWorker message. Also converts values to other types if specified.
         * @param message AssignWorker
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.AssignWorker, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AssignWorker to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AssignWorker
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AssignWorker {

        /** Properties of an AssignWorker. */
        interface $Properties {

            /** AssignWorker placeId */
            placeId?: (string|null);

            /** AssignWorker socketIndex */
            socketIndex?: (number|null);

            /** AssignWorker workerId */
            workerId?: (string|null);

            /** AssignWorker material */
            material?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AssignWorker. */
        type $Shape = game.AssignWorker.$Properties;
    }

    /**
     * Properties of an UnassignWorker.
     * @deprecated Use game.UnassignWorker.$Properties instead.
     */
    interface IUnassignWorker extends game.UnassignWorker.$Properties {
    }

    /** Represents an UnassignWorker. */
    class UnassignWorker {

        /**
         * Constructs a new UnassignWorker.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.UnassignWorker.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** UnassignWorker placeId. */
        placeId: string;

        /** UnassignWorker socketIndex. */
        socketIndex: number;

        /** UnassignWorker workerId. */
        workerId: string;

        /**
         * Creates a new UnassignWorker instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UnassignWorker instance
         */
        static create(properties: game.UnassignWorker.$Shape): game.UnassignWorker & game.UnassignWorker.$Shape;
        static create(properties?: game.UnassignWorker.$Properties): game.UnassignWorker;

        /**
         * Encodes the specified UnassignWorker message. Does not implicitly {@link game.UnassignWorker.verify|verify} messages.
         * @param message UnassignWorker message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.UnassignWorker.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UnassignWorker message, length delimited. Does not implicitly {@link game.UnassignWorker.verify|verify} messages.
         * @param message UnassignWorker message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.UnassignWorker.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UnassignWorker message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.UnassignWorker & game.UnassignWorker.$Shape} UnassignWorker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.UnassignWorker & game.UnassignWorker.$Shape;

        /**
         * Decodes an UnassignWorker message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.UnassignWorker & game.UnassignWorker.$Shape} UnassignWorker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.UnassignWorker & game.UnassignWorker.$Shape;

        /**
         * Verifies an UnassignWorker message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UnassignWorker message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UnassignWorker
         */
        static fromObject(object: { [k: string]: any }): game.UnassignWorker;

        /**
         * Creates a plain object from an UnassignWorker message. Also converts values to other types if specified.
         * @param message UnassignWorker
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.UnassignWorker, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UnassignWorker to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for UnassignWorker
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace UnassignWorker {

        /** Properties of an UnassignWorker. */
        interface $Properties {

            /** UnassignWorker placeId */
            placeId?: (string|null);

            /** UnassignWorker socketIndex */
            socketIndex?: (number|null);

            /** UnassignWorker workerId */
            workerId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an UnassignWorker. */
        type $Shape = game.UnassignWorker.$Properties;
    }

    /**
     * Properties of a FireWorker.
     * @deprecated Use game.FireWorker.$Properties instead.
     */
    interface IFireWorker extends game.FireWorker.$Properties {
    }

    /** Represents a FireWorker. */
    class FireWorker {

        /**
         * Constructs a new FireWorker.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.FireWorker.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** FireWorker workerId. */
        workerId: string;

        /**
         * Creates a new FireWorker instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FireWorker instance
         */
        static create(properties: game.FireWorker.$Shape): game.FireWorker & game.FireWorker.$Shape;
        static create(properties?: game.FireWorker.$Properties): game.FireWorker;

        /**
         * Encodes the specified FireWorker message. Does not implicitly {@link game.FireWorker.verify|verify} messages.
         * @param message FireWorker message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.FireWorker.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FireWorker message, length delimited. Does not implicitly {@link game.FireWorker.verify|verify} messages.
         * @param message FireWorker message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.FireWorker.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FireWorker message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.FireWorker & game.FireWorker.$Shape} FireWorker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.FireWorker & game.FireWorker.$Shape;

        /**
         * Decodes a FireWorker message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.FireWorker & game.FireWorker.$Shape} FireWorker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.FireWorker & game.FireWorker.$Shape;

        /**
         * Verifies a FireWorker message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FireWorker message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FireWorker
         */
        static fromObject(object: { [k: string]: any }): game.FireWorker;

        /**
         * Creates a plain object from a FireWorker message. Also converts values to other types if specified.
         * @param message FireWorker
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.FireWorker, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FireWorker to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for FireWorker
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace FireWorker {

        /** Properties of a FireWorker. */
        interface $Properties {

            /** FireWorker workerId */
            workerId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a FireWorker. */
        type $Shape = game.FireWorker.$Properties;
    }

    /**
     * Properties of a CraftRequest.
     * @deprecated Use game.CraftRequest.$Properties instead.
     */
    interface ICraftRequest extends game.CraftRequest.$Properties {
    }

    /** Represents a CraftRequest. */
    class CraftRequest {

        /**
         * Constructs a new CraftRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.CraftRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CraftRequest recipeId. */
        recipeId: string;

        /**
         * Creates a new CraftRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CraftRequest instance
         */
        static create(properties: game.CraftRequest.$Shape): game.CraftRequest & game.CraftRequest.$Shape;
        static create(properties?: game.CraftRequest.$Properties): game.CraftRequest;

        /**
         * Encodes the specified CraftRequest message. Does not implicitly {@link game.CraftRequest.verify|verify} messages.
         * @param message CraftRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.CraftRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CraftRequest message, length delimited. Does not implicitly {@link game.CraftRequest.verify|verify} messages.
         * @param message CraftRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.CraftRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CraftRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.CraftRequest & game.CraftRequest.$Shape} CraftRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.CraftRequest & game.CraftRequest.$Shape;

        /**
         * Decodes a CraftRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.CraftRequest & game.CraftRequest.$Shape} CraftRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.CraftRequest & game.CraftRequest.$Shape;

        /**
         * Verifies a CraftRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CraftRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CraftRequest
         */
        static fromObject(object: { [k: string]: any }): game.CraftRequest;

        /**
         * Creates a plain object from a CraftRequest message. Also converts values to other types if specified.
         * @param message CraftRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.CraftRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CraftRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CraftRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CraftRequest {

        /** Properties of a CraftRequest. */
        interface $Properties {

            /** CraftRequest recipeId */
            recipeId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CraftRequest. */
        type $Shape = game.CraftRequest.$Properties;
    }

    /**
     * Properties of a HireWorker.
     * @deprecated Use game.HireWorker.$Properties instead.
     */
    interface IHireWorker extends game.HireWorker.$Properties {
    }

    /** Represents a HireWorker. */
    class HireWorker {

        /**
         * Constructs a new HireWorker.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.HireWorker.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** HireWorker workerId. */
        workerId: string;

        /**
         * Creates a new HireWorker instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HireWorker instance
         */
        static create(properties: game.HireWorker.$Shape): game.HireWorker & game.HireWorker.$Shape;
        static create(properties?: game.HireWorker.$Properties): game.HireWorker;

        /**
         * Encodes the specified HireWorker message. Does not implicitly {@link game.HireWorker.verify|verify} messages.
         * @param message HireWorker message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.HireWorker.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HireWorker message, length delimited. Does not implicitly {@link game.HireWorker.verify|verify} messages.
         * @param message HireWorker message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.HireWorker.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HireWorker message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.HireWorker & game.HireWorker.$Shape} HireWorker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.HireWorker & game.HireWorker.$Shape;

        /**
         * Decodes a HireWorker message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.HireWorker & game.HireWorker.$Shape} HireWorker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.HireWorker & game.HireWorker.$Shape;

        /**
         * Verifies a HireWorker message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HireWorker message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HireWorker
         */
        static fromObject(object: { [k: string]: any }): game.HireWorker;

        /**
         * Creates a plain object from a HireWorker message. Also converts values to other types if specified.
         * @param message HireWorker
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.HireWorker, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HireWorker to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for HireWorker
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace HireWorker {

        /** Properties of a HireWorker. */
        interface $Properties {

            /** HireWorker workerId */
            workerId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a HireWorker. */
        type $Shape = game.HireWorker.$Properties;
    }

    /**
     * Properties of a RerollWorkers.
     * @deprecated Use game.RerollWorkers.$Properties instead.
     */
    interface IRerollWorkers extends game.RerollWorkers.$Properties {
    }

    /** Represents a RerollWorkers. */
    class RerollWorkers {

        /**
         * Constructs a new RerollWorkers.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.RerollWorkers.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /**
         * Creates a new RerollWorkers instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RerollWorkers instance
         */
        static create(properties: game.RerollWorkers.$Shape): game.RerollWorkers & game.RerollWorkers.$Shape;
        static create(properties?: game.RerollWorkers.$Properties): game.RerollWorkers;

        /**
         * Encodes the specified RerollWorkers message. Does not implicitly {@link game.RerollWorkers.verify|verify} messages.
         * @param message RerollWorkers message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.RerollWorkers.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RerollWorkers message, length delimited. Does not implicitly {@link game.RerollWorkers.verify|verify} messages.
         * @param message RerollWorkers message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.RerollWorkers.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RerollWorkers message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.RerollWorkers & game.RerollWorkers.$Shape} RerollWorkers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.RerollWorkers & game.RerollWorkers.$Shape;

        /**
         * Decodes a RerollWorkers message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.RerollWorkers & game.RerollWorkers.$Shape} RerollWorkers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.RerollWorkers & game.RerollWorkers.$Shape;

        /**
         * Verifies a RerollWorkers message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RerollWorkers message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RerollWorkers
         */
        static fromObject(object: { [k: string]: any }): game.RerollWorkers;

        /**
         * Creates a plain object from a RerollWorkers message. Also converts values to other types if specified.
         * @param message RerollWorkers
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.RerollWorkers, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RerollWorkers to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RerollWorkers
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RerollWorkers {

        /** Properties of a RerollWorkers. */
        interface $Properties {

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RerollWorkers. */
        type $Shape = game.RerollWorkers.$Properties;
    }

    /**
     * Properties of a BuyWorkerSlot.
     * @deprecated Use game.BuyWorkerSlot.$Properties instead.
     */
    interface IBuyWorkerSlot extends game.BuyWorkerSlot.$Properties {
    }

    /** Represents a BuyWorkerSlot. */
    class BuyWorkerSlot {

        /**
         * Constructs a new BuyWorkerSlot.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.BuyWorkerSlot.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /**
         * Creates a new BuyWorkerSlot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BuyWorkerSlot instance
         */
        static create(properties: game.BuyWorkerSlot.$Shape): game.BuyWorkerSlot & game.BuyWorkerSlot.$Shape;
        static create(properties?: game.BuyWorkerSlot.$Properties): game.BuyWorkerSlot;

        /**
         * Encodes the specified BuyWorkerSlot message. Does not implicitly {@link game.BuyWorkerSlot.verify|verify} messages.
         * @param message BuyWorkerSlot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.BuyWorkerSlot.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BuyWorkerSlot message, length delimited. Does not implicitly {@link game.BuyWorkerSlot.verify|verify} messages.
         * @param message BuyWorkerSlot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.BuyWorkerSlot.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BuyWorkerSlot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.BuyWorkerSlot & game.BuyWorkerSlot.$Shape} BuyWorkerSlot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.BuyWorkerSlot & game.BuyWorkerSlot.$Shape;

        /**
         * Decodes a BuyWorkerSlot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.BuyWorkerSlot & game.BuyWorkerSlot.$Shape} BuyWorkerSlot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.BuyWorkerSlot & game.BuyWorkerSlot.$Shape;

        /**
         * Verifies a BuyWorkerSlot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BuyWorkerSlot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BuyWorkerSlot
         */
        static fromObject(object: { [k: string]: any }): game.BuyWorkerSlot;

        /**
         * Creates a plain object from a BuyWorkerSlot message. Also converts values to other types if specified.
         * @param message BuyWorkerSlot
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.BuyWorkerSlot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BuyWorkerSlot to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for BuyWorkerSlot
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace BuyWorkerSlot {

        /** Properties of a BuyWorkerSlot. */
        interface $Properties {

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a BuyWorkerSlot. */
        type $Shape = game.BuyWorkerSlot.$Properties;
    }

    /**
     * Properties of a BuyItem.
     * @deprecated Use game.BuyItem.$Properties instead.
     */
    interface IBuyItem extends game.BuyItem.$Properties {
    }

    /** Represents a BuyItem. */
    class BuyItem {

        /**
         * Constructs a new BuyItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.BuyItem.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** BuyItem itemId. */
        itemId: string;

        /** BuyItem quantity. */
        quantity: number;

        /** BuyItem npcId. */
        npcId: string;

        /**
         * Creates a new BuyItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BuyItem instance
         */
        static create(properties: game.BuyItem.$Shape): game.BuyItem & game.BuyItem.$Shape;
        static create(properties?: game.BuyItem.$Properties): game.BuyItem;

        /**
         * Encodes the specified BuyItem message. Does not implicitly {@link game.BuyItem.verify|verify} messages.
         * @param message BuyItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.BuyItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BuyItem message, length delimited. Does not implicitly {@link game.BuyItem.verify|verify} messages.
         * @param message BuyItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.BuyItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BuyItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.BuyItem & game.BuyItem.$Shape} BuyItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.BuyItem & game.BuyItem.$Shape;

        /**
         * Decodes a BuyItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.BuyItem & game.BuyItem.$Shape} BuyItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.BuyItem & game.BuyItem.$Shape;

        /**
         * Verifies a BuyItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BuyItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BuyItem
         */
        static fromObject(object: { [k: string]: any }): game.BuyItem;

        /**
         * Creates a plain object from a BuyItem message. Also converts values to other types if specified.
         * @param message BuyItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.BuyItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BuyItem to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for BuyItem
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace BuyItem {

        /** Properties of a BuyItem. */
        interface $Properties {

            /** BuyItem itemId */
            itemId?: (string|null);

            /** BuyItem quantity */
            quantity?: (number|null);

            /** BuyItem npcId */
            npcId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a BuyItem. */
        type $Shape = game.BuyItem.$Properties;
    }

    /**
     * Properties of a SellItem.
     * @deprecated Use game.SellItem.$Properties instead.
     */
    interface ISellItem extends game.SellItem.$Properties {
    }

    /** Represents a SellItem. */
    class SellItem {

        /**
         * Constructs a new SellItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.SellItem.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** SellItem itemId. */
        itemId: string;

        /** SellItem quantity. */
        quantity: number;

        /**
         * Creates a new SellItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SellItem instance
         */
        static create(properties: game.SellItem.$Shape): game.SellItem & game.SellItem.$Shape;
        static create(properties?: game.SellItem.$Properties): game.SellItem;

        /**
         * Encodes the specified SellItem message. Does not implicitly {@link game.SellItem.verify|verify} messages.
         * @param message SellItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.SellItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SellItem message, length delimited. Does not implicitly {@link game.SellItem.verify|verify} messages.
         * @param message SellItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.SellItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SellItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.SellItem & game.SellItem.$Shape} SellItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.SellItem & game.SellItem.$Shape;

        /**
         * Decodes a SellItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.SellItem & game.SellItem.$Shape} SellItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.SellItem & game.SellItem.$Shape;

        /**
         * Verifies a SellItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SellItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SellItem
         */
        static fromObject(object: { [k: string]: any }): game.SellItem;

        /**
         * Creates a plain object from a SellItem message. Also converts values to other types if specified.
         * @param message SellItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.SellItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SellItem to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for SellItem
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace SellItem {

        /** Properties of a SellItem. */
        interface $Properties {

            /** SellItem itemId */
            itemId?: (string|null);

            /** SellItem quantity */
            quantity?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a SellItem. */
        type $Shape = game.SellItem.$Properties;
    }

    /**
     * Properties of an AcceptQuest.
     * @deprecated Use game.AcceptQuest.$Properties instead.
     */
    interface IAcceptQuest extends game.AcceptQuest.$Properties {
    }

    /** Represents an AcceptQuest. */
    class AcceptQuest {

        /**
         * Constructs a new AcceptQuest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.AcceptQuest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** AcceptQuest questId. */
        questId: string;

        /**
         * Creates a new AcceptQuest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AcceptQuest instance
         */
        static create(properties: game.AcceptQuest.$Shape): game.AcceptQuest & game.AcceptQuest.$Shape;
        static create(properties?: game.AcceptQuest.$Properties): game.AcceptQuest;

        /**
         * Encodes the specified AcceptQuest message. Does not implicitly {@link game.AcceptQuest.verify|verify} messages.
         * @param message AcceptQuest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.AcceptQuest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AcceptQuest message, length delimited. Does not implicitly {@link game.AcceptQuest.verify|verify} messages.
         * @param message AcceptQuest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.AcceptQuest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AcceptQuest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.AcceptQuest & game.AcceptQuest.$Shape} AcceptQuest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.AcceptQuest & game.AcceptQuest.$Shape;

        /**
         * Decodes an AcceptQuest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.AcceptQuest & game.AcceptQuest.$Shape} AcceptQuest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.AcceptQuest & game.AcceptQuest.$Shape;

        /**
         * Verifies an AcceptQuest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AcceptQuest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AcceptQuest
         */
        static fromObject(object: { [k: string]: any }): game.AcceptQuest;

        /**
         * Creates a plain object from an AcceptQuest message. Also converts values to other types if specified.
         * @param message AcceptQuest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.AcceptQuest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AcceptQuest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AcceptQuest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AcceptQuest {

        /** Properties of an AcceptQuest. */
        interface $Properties {

            /** AcceptQuest questId */
            questId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AcceptQuest. */
        type $Shape = game.AcceptQuest.$Properties;
    }

    /**
     * Properties of a CompleteQuest.
     * @deprecated Use game.CompleteQuest.$Properties instead.
     */
    interface ICompleteQuest extends game.CompleteQuest.$Properties {
    }

    /** Represents a CompleteQuest. */
    class CompleteQuest {

        /**
         * Constructs a new CompleteQuest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.CompleteQuest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CompleteQuest questId. */
        questId: string;

        /**
         * Creates a new CompleteQuest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CompleteQuest instance
         */
        static create(properties: game.CompleteQuest.$Shape): game.CompleteQuest & game.CompleteQuest.$Shape;
        static create(properties?: game.CompleteQuest.$Properties): game.CompleteQuest;

        /**
         * Encodes the specified CompleteQuest message. Does not implicitly {@link game.CompleteQuest.verify|verify} messages.
         * @param message CompleteQuest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.CompleteQuest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CompleteQuest message, length delimited. Does not implicitly {@link game.CompleteQuest.verify|verify} messages.
         * @param message CompleteQuest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.CompleteQuest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CompleteQuest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.CompleteQuest & game.CompleteQuest.$Shape} CompleteQuest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.CompleteQuest & game.CompleteQuest.$Shape;

        /**
         * Decodes a CompleteQuest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.CompleteQuest & game.CompleteQuest.$Shape} CompleteQuest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.CompleteQuest & game.CompleteQuest.$Shape;

        /**
         * Verifies a CompleteQuest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CompleteQuest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CompleteQuest
         */
        static fromObject(object: { [k: string]: any }): game.CompleteQuest;

        /**
         * Creates a plain object from a CompleteQuest message. Also converts values to other types if specified.
         * @param message CompleteQuest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.CompleteQuest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CompleteQuest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CompleteQuest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CompleteQuest {

        /** Properties of a CompleteQuest. */
        interface $Properties {

            /** CompleteQuest questId */
            questId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CompleteQuest. */
        type $Shape = game.CompleteQuest.$Properties;
    }

    /**
     * Properties of a MoveItem.
     * @deprecated Use game.MoveItem.$Properties instead.
     */
    interface IMoveItem extends game.MoveItem.$Properties {
    }

    /** Represents a MoveItem. */
    class MoveItem {

        /**
         * Constructs a new MoveItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.MoveItem.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** MoveItem fromInventoryId. */
        fromInventoryId: string;

        /** MoveItem toInventoryId. */
        toInventoryId: string;

        /** MoveItem itemId. */
        itemId: string;

        /** MoveItem quantity. */
        quantity: number;

        /**
         * Creates a new MoveItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MoveItem instance
         */
        static create(properties: game.MoveItem.$Shape): game.MoveItem & game.MoveItem.$Shape;
        static create(properties?: game.MoveItem.$Properties): game.MoveItem;

        /**
         * Encodes the specified MoveItem message. Does not implicitly {@link game.MoveItem.verify|verify} messages.
         * @param message MoveItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.MoveItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MoveItem message, length delimited. Does not implicitly {@link game.MoveItem.verify|verify} messages.
         * @param message MoveItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.MoveItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MoveItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.MoveItem & game.MoveItem.$Shape} MoveItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.MoveItem & game.MoveItem.$Shape;

        /**
         * Decodes a MoveItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.MoveItem & game.MoveItem.$Shape} MoveItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.MoveItem & game.MoveItem.$Shape;

        /**
         * Verifies a MoveItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MoveItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MoveItem
         */
        static fromObject(object: { [k: string]: any }): game.MoveItem;

        /**
         * Creates a plain object from a MoveItem message. Also converts values to other types if specified.
         * @param message MoveItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.MoveItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MoveItem to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for MoveItem
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace MoveItem {

        /** Properties of a MoveItem. */
        interface $Properties {

            /** MoveItem fromInventoryId */
            fromInventoryId?: (string|null);

            /** MoveItem toInventoryId */
            toInventoryId?: (string|null);

            /** MoveItem itemId */
            itemId?: (string|null);

            /** MoveItem quantity */
            quantity?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a MoveItem. */
        type $Shape = game.MoveItem.$Properties;
    }

    /**
     * Properties of an EquipItem.
     * @deprecated Use game.EquipItem.$Properties instead.
     */
    interface IEquipItem extends game.EquipItem.$Properties {
    }

    /** Represents an EquipItem. */
    class EquipItem {

        /**
         * Constructs a new EquipItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.EquipItem.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** EquipItem inventoryId. */
        inventoryId: string;

        /** EquipItem itemId. */
        itemId: string;

        /**
         * Creates a new EquipItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EquipItem instance
         */
        static create(properties: game.EquipItem.$Shape): game.EquipItem & game.EquipItem.$Shape;
        static create(properties?: game.EquipItem.$Properties): game.EquipItem;

        /**
         * Encodes the specified EquipItem message. Does not implicitly {@link game.EquipItem.verify|verify} messages.
         * @param message EquipItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.EquipItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EquipItem message, length delimited. Does not implicitly {@link game.EquipItem.verify|verify} messages.
         * @param message EquipItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.EquipItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EquipItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.EquipItem & game.EquipItem.$Shape} EquipItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.EquipItem & game.EquipItem.$Shape;

        /**
         * Decodes an EquipItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.EquipItem & game.EquipItem.$Shape} EquipItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.EquipItem & game.EquipItem.$Shape;

        /**
         * Verifies an EquipItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EquipItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EquipItem
         */
        static fromObject(object: { [k: string]: any }): game.EquipItem;

        /**
         * Creates a plain object from an EquipItem message. Also converts values to other types if specified.
         * @param message EquipItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.EquipItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EquipItem to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for EquipItem
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace EquipItem {

        /** Properties of an EquipItem. */
        interface $Properties {

            /** EquipItem inventoryId */
            inventoryId?: (string|null);

            /** EquipItem itemId */
            itemId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an EquipItem. */
        type $Shape = game.EquipItem.$Properties;
    }

    /**
     * Properties of an UnequipItem.
     * @deprecated Use game.UnequipItem.$Properties instead.
     */
    interface IUnequipItem extends game.UnequipItem.$Properties {
    }

    /** Represents an UnequipItem. */
    class UnequipItem {

        /**
         * Constructs a new UnequipItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.UnequipItem.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** UnequipItem inventoryId. */
        inventoryId: string;

        /** UnequipItem slot. */
        slot: string;

        /**
         * Creates a new UnequipItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UnequipItem instance
         */
        static create(properties: game.UnequipItem.$Shape): game.UnequipItem & game.UnequipItem.$Shape;
        static create(properties?: game.UnequipItem.$Properties): game.UnequipItem;

        /**
         * Encodes the specified UnequipItem message. Does not implicitly {@link game.UnequipItem.verify|verify} messages.
         * @param message UnequipItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.UnequipItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UnequipItem message, length delimited. Does not implicitly {@link game.UnequipItem.verify|verify} messages.
         * @param message UnequipItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.UnequipItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UnequipItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.UnequipItem & game.UnequipItem.$Shape} UnequipItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.UnequipItem & game.UnequipItem.$Shape;

        /**
         * Decodes an UnequipItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.UnequipItem & game.UnequipItem.$Shape} UnequipItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.UnequipItem & game.UnequipItem.$Shape;

        /**
         * Verifies an UnequipItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UnequipItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UnequipItem
         */
        static fromObject(object: { [k: string]: any }): game.UnequipItem;

        /**
         * Creates a plain object from an UnequipItem message. Also converts values to other types if specified.
         * @param message UnequipItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.UnequipItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UnequipItem to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for UnequipItem
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace UnequipItem {

        /** Properties of an UnequipItem. */
        interface $Properties {

            /** UnequipItem inventoryId */
            inventoryId?: (string|null);

            /** UnequipItem slot */
            slot?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an UnequipItem. */
        type $Shape = game.UnequipItem.$Properties;
    }

    /**
     * Properties of a UseItemRequest.
     * @deprecated Use game.UseItemRequest.$Properties instead.
     */
    interface IUseItemRequest extends game.UseItemRequest.$Properties {
    }

    /** Represents a UseItemRequest. */
    class UseItemRequest {

        /**
         * Constructs a new UseItemRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.UseItemRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** UseItemRequest itemId. */
        itemId: string;

        /**
         * Creates a new UseItemRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UseItemRequest instance
         */
        static create(properties: game.UseItemRequest.$Shape): game.UseItemRequest & game.UseItemRequest.$Shape;
        static create(properties?: game.UseItemRequest.$Properties): game.UseItemRequest;

        /**
         * Encodes the specified UseItemRequest message. Does not implicitly {@link game.UseItemRequest.verify|verify} messages.
         * @param message UseItemRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.UseItemRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UseItemRequest message, length delimited. Does not implicitly {@link game.UseItemRequest.verify|verify} messages.
         * @param message UseItemRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.UseItemRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UseItemRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.UseItemRequest & game.UseItemRequest.$Shape} UseItemRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.UseItemRequest & game.UseItemRequest.$Shape;

        /**
         * Decodes a UseItemRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.UseItemRequest & game.UseItemRequest.$Shape} UseItemRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.UseItemRequest & game.UseItemRequest.$Shape;

        /**
         * Verifies a UseItemRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UseItemRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UseItemRequest
         */
        static fromObject(object: { [k: string]: any }): game.UseItemRequest;

        /**
         * Creates a plain object from a UseItemRequest message. Also converts values to other types if specified.
         * @param message UseItemRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.UseItemRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UseItemRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for UseItemRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace UseItemRequest {

        /** Properties of a UseItemRequest. */
        interface $Properties {

            /** UseItemRequest itemId */
            itemId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a UseItemRequest. */
        type $Shape = game.UseItemRequest.$Properties;
    }

    /**
     * Properties of a SetTargetRequest.
     * @deprecated Use game.SetTargetRequest.$Properties instead.
     */
    interface ISetTargetRequest extends game.SetTargetRequest.$Properties {
    }

    /** Represents a SetTargetRequest. */
    class SetTargetRequest {

        /**
         * Constructs a new SetTargetRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.SetTargetRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** SetTargetRequest enemyId. */
        enemyId: string;

        /**
         * Creates a new SetTargetRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SetTargetRequest instance
         */
        static create(properties: game.SetTargetRequest.$Shape): game.SetTargetRequest & game.SetTargetRequest.$Shape;
        static create(properties?: game.SetTargetRequest.$Properties): game.SetTargetRequest;

        /**
         * Encodes the specified SetTargetRequest message. Does not implicitly {@link game.SetTargetRequest.verify|verify} messages.
         * @param message SetTargetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.SetTargetRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SetTargetRequest message, length delimited. Does not implicitly {@link game.SetTargetRequest.verify|verify} messages.
         * @param message SetTargetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.SetTargetRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SetTargetRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.SetTargetRequest & game.SetTargetRequest.$Shape} SetTargetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.SetTargetRequest & game.SetTargetRequest.$Shape;

        /**
         * Decodes a SetTargetRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.SetTargetRequest & game.SetTargetRequest.$Shape} SetTargetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.SetTargetRequest & game.SetTargetRequest.$Shape;

        /**
         * Verifies a SetTargetRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SetTargetRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SetTargetRequest
         */
        static fromObject(object: { [k: string]: any }): game.SetTargetRequest;

        /**
         * Creates a plain object from a SetTargetRequest message. Also converts values to other types if specified.
         * @param message SetTargetRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.SetTargetRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SetTargetRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for SetTargetRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace SetTargetRequest {

        /** Properties of a SetTargetRequest. */
        interface $Properties {

            /** SetTargetRequest enemyId */
            enemyId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a SetTargetRequest. */
        type $Shape = game.SetTargetRequest.$Properties;
    }

    /**
     * Properties of a PokeRequest.
     * @deprecated Use game.PokeRequest.$Properties instead.
     */
    interface IPokeRequest extends game.PokeRequest.$Properties {
    }

    /** Represents a PokeRequest. */
    class PokeRequest {

        /**
         * Constructs a new PokeRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.PokeRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PokeRequest targetNickname. */
        targetNickname: string;

        /**
         * Creates a new PokeRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PokeRequest instance
         */
        static create(properties: game.PokeRequest.$Shape): game.PokeRequest & game.PokeRequest.$Shape;
        static create(properties?: game.PokeRequest.$Properties): game.PokeRequest;

        /**
         * Encodes the specified PokeRequest message. Does not implicitly {@link game.PokeRequest.verify|verify} messages.
         * @param message PokeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.PokeRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PokeRequest message, length delimited. Does not implicitly {@link game.PokeRequest.verify|verify} messages.
         * @param message PokeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.PokeRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PokeRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.PokeRequest & game.PokeRequest.$Shape} PokeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PokeRequest & game.PokeRequest.$Shape;

        /**
         * Decodes a PokeRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.PokeRequest & game.PokeRequest.$Shape} PokeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PokeRequest & game.PokeRequest.$Shape;

        /**
         * Verifies a PokeRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PokeRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PokeRequest
         */
        static fromObject(object: { [k: string]: any }): game.PokeRequest;

        /**
         * Creates a plain object from a PokeRequest message. Also converts values to other types if specified.
         * @param message PokeRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.PokeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PokeRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PokeRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PokeRequest {

        /** Properties of a PokeRequest. */
        interface $Properties {

            /** PokeRequest targetNickname */
            targetNickname?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PokeRequest. */
        type $Shape = game.PokeRequest.$Properties;
    }

    /**
     * Properties of a CreatePartyRequest.
     * @deprecated Use game.CreatePartyRequest.$Properties instead.
     */
    interface ICreatePartyRequest extends game.CreatePartyRequest.$Properties {
    }

    /** Represents a CreatePartyRequest. */
    class CreatePartyRequest {

        /**
         * Constructs a new CreatePartyRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.CreatePartyRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CreatePartyRequest name. */
        name: string;

        /** CreatePartyRequest location. */
        location: string;

        /**
         * Creates a new CreatePartyRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreatePartyRequest instance
         */
        static create(properties: game.CreatePartyRequest.$Shape): game.CreatePartyRequest & game.CreatePartyRequest.$Shape;
        static create(properties?: game.CreatePartyRequest.$Properties): game.CreatePartyRequest;

        /**
         * Encodes the specified CreatePartyRequest message. Does not implicitly {@link game.CreatePartyRequest.verify|verify} messages.
         * @param message CreatePartyRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.CreatePartyRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreatePartyRequest message, length delimited. Does not implicitly {@link game.CreatePartyRequest.verify|verify} messages.
         * @param message CreatePartyRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.CreatePartyRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreatePartyRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.CreatePartyRequest & game.CreatePartyRequest.$Shape} CreatePartyRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.CreatePartyRequest & game.CreatePartyRequest.$Shape;

        /**
         * Decodes a CreatePartyRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.CreatePartyRequest & game.CreatePartyRequest.$Shape} CreatePartyRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.CreatePartyRequest & game.CreatePartyRequest.$Shape;

        /**
         * Verifies a CreatePartyRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreatePartyRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreatePartyRequest
         */
        static fromObject(object: { [k: string]: any }): game.CreatePartyRequest;

        /**
         * Creates a plain object from a CreatePartyRequest message. Also converts values to other types if specified.
         * @param message CreatePartyRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.CreatePartyRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreatePartyRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CreatePartyRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CreatePartyRequest {

        /** Properties of a CreatePartyRequest. */
        interface $Properties {

            /** CreatePartyRequest name */
            name?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CreatePartyRequest. */
        type $Shape = game.CreatePartyRequest.$Properties;
    }

    /**
     * Properties of a JoinPartyRequest.
     * @deprecated Use game.JoinPartyRequest.$Properties instead.
     */
    interface IJoinPartyRequest extends game.JoinPartyRequest.$Properties {
    }

    /** Represents a JoinPartyRequest. */
    class JoinPartyRequest {

        /**
         * Constructs a new JoinPartyRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.JoinPartyRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** JoinPartyRequest partyId. */
        partyId: string;

        /**
         * Creates a new JoinPartyRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinPartyRequest instance
         */
        static create(properties: game.JoinPartyRequest.$Shape): game.JoinPartyRequest & game.JoinPartyRequest.$Shape;
        static create(properties?: game.JoinPartyRequest.$Properties): game.JoinPartyRequest;

        /**
         * Encodes the specified JoinPartyRequest message. Does not implicitly {@link game.JoinPartyRequest.verify|verify} messages.
         * @param message JoinPartyRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.JoinPartyRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinPartyRequest message, length delimited. Does not implicitly {@link game.JoinPartyRequest.verify|verify} messages.
         * @param message JoinPartyRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.JoinPartyRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinPartyRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.JoinPartyRequest & game.JoinPartyRequest.$Shape} JoinPartyRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.JoinPartyRequest & game.JoinPartyRequest.$Shape;

        /**
         * Decodes a JoinPartyRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.JoinPartyRequest & game.JoinPartyRequest.$Shape} JoinPartyRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.JoinPartyRequest & game.JoinPartyRequest.$Shape;

        /**
         * Verifies a JoinPartyRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinPartyRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinPartyRequest
         */
        static fromObject(object: { [k: string]: any }): game.JoinPartyRequest;

        /**
         * Creates a plain object from a JoinPartyRequest message. Also converts values to other types if specified.
         * @param message JoinPartyRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.JoinPartyRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinPartyRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for JoinPartyRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace JoinPartyRequest {

        /** Properties of a JoinPartyRequest. */
        interface $Properties {

            /** JoinPartyRequest partyId */
            partyId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a JoinPartyRequest. */
        type $Shape = game.JoinPartyRequest.$Properties;
    }

    /**
     * Properties of a LeavePartyRequest.
     * @deprecated Use game.LeavePartyRequest.$Properties instead.
     */
    interface ILeavePartyRequest extends game.LeavePartyRequest.$Properties {
    }

    /** Represents a LeavePartyRequest. */
    class LeavePartyRequest {

        /**
         * Constructs a new LeavePartyRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.LeavePartyRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /**
         * Creates a new LeavePartyRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LeavePartyRequest instance
         */
        static create(properties: game.LeavePartyRequest.$Shape): game.LeavePartyRequest & game.LeavePartyRequest.$Shape;
        static create(properties?: game.LeavePartyRequest.$Properties): game.LeavePartyRequest;

        /**
         * Encodes the specified LeavePartyRequest message. Does not implicitly {@link game.LeavePartyRequest.verify|verify} messages.
         * @param message LeavePartyRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.LeavePartyRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LeavePartyRequest message, length delimited. Does not implicitly {@link game.LeavePartyRequest.verify|verify} messages.
         * @param message LeavePartyRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.LeavePartyRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LeavePartyRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.LeavePartyRequest & game.LeavePartyRequest.$Shape} LeavePartyRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.LeavePartyRequest & game.LeavePartyRequest.$Shape;

        /**
         * Decodes a LeavePartyRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.LeavePartyRequest & game.LeavePartyRequest.$Shape} LeavePartyRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.LeavePartyRequest & game.LeavePartyRequest.$Shape;

        /**
         * Verifies a LeavePartyRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LeavePartyRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LeavePartyRequest
         */
        static fromObject(object: { [k: string]: any }): game.LeavePartyRequest;

        /**
         * Creates a plain object from a LeavePartyRequest message. Also converts values to other types if specified.
         * @param message LeavePartyRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.LeavePartyRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LeavePartyRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for LeavePartyRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace LeavePartyRequest {

        /** Properties of a LeavePartyRequest. */
        interface $Properties {

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a LeavePartyRequest. */
        type $Shape = game.LeavePartyRequest.$Properties;
    }

    /**
     * Properties of a StateSync.
     * @deprecated Use game.StateSync.$Properties instead.
     */
    interface IStateSync extends game.StateSync.$Properties {
    }

    /** Represents a StateSync. */
    class StateSync {

        /**
         * Constructs a new StateSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.StateSync.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** StateSync sessionId. */
        sessionId: string;

        /** StateSync player. */
        player?: (game.Player.$Properties|null);

        /** StateSync inventory. */
        inventory: { [k: string]: game.Inventory.$Properties };

        /** StateSync buildings. */
        buildings: { [k: string]: game.Building.$Properties };

        /** StateSync sockets. */
        sockets: { [k: string]: game.Socket.$Properties };

        /** StateSync workers. */
        workers?: (game.Workers.$Properties|null);

        /** StateSync quests. */
        quests?: (game.Quests.$Properties|null);

        /** StateSync skills. */
        skills: { [k: string]: number };

        /** StateSync recipes. */
        recipes: string[];

        /** StateSync enemies. */
        enemies: { [k: string]: game.Enemy.$Properties };

        /**
         * Creates a new StateSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StateSync instance
         */
        static create(properties: game.StateSync.$Shape): game.StateSync & game.StateSync.$Shape;
        static create(properties?: game.StateSync.$Properties): game.StateSync;

        /**
         * Encodes the specified StateSync message. Does not implicitly {@link game.StateSync.verify|verify} messages.
         * @param message StateSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.StateSync.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StateSync message, length delimited. Does not implicitly {@link game.StateSync.verify|verify} messages.
         * @param message StateSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.StateSync.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StateSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.StateSync & game.StateSync.$Shape} StateSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.StateSync & game.StateSync.$Shape;

        /**
         * Decodes a StateSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.StateSync & game.StateSync.$Shape} StateSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.StateSync & game.StateSync.$Shape;

        /**
         * Verifies a StateSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StateSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StateSync
         */
        static fromObject(object: { [k: string]: any }): game.StateSync;

        /**
         * Creates a plain object from a StateSync message. Also converts values to other types if specified.
         * @param message StateSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.StateSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StateSync to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for StateSync
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace StateSync {

        /** Properties of a StateSync. */
        interface $Properties {

            /** StateSync sessionId */
            sessionId?: (string|null);

            /** StateSync player */
            player?: (game.Player.$Properties|null);

            /** StateSync inventory */
            inventory?: ({ [k: string]: game.Inventory.$Properties }|null);

            /** StateSync buildings */
            buildings?: ({ [k: string]: game.Building.$Properties }|null);

            /** StateSync sockets */
            sockets?: ({ [k: string]: game.Socket.$Properties }|null);

            /** StateSync workers */
            workers?: (game.Workers.$Properties|null);

            /** StateSync quests */
            quests?: (game.Quests.$Properties|null);

            /** StateSync skills */
            skills?: ({ [k: string]: number }|null);

            /** StateSync recipes */
            recipes?: (string[]|null);

            /** StateSync enemies */
            enemies?: ({ [k: string]: game.Enemy.$Properties }|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a StateSync. */
        type $Shape = game.StateSync.$Properties;
    }

    /**
     * Properties of a Diff.
     * @deprecated Use game.Diff.$Properties instead.
     */
    interface IDiff extends game.Diff.$Properties {
    }

    /** Represents a Diff. */
    class Diff {

        /**
         * Constructs a new Diff.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Diff.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Diff path. */
        path: string;

        /** Diff intValue. */
        intValue?: (number|Long|null);

        /** Diff doubleValue. */
        doubleValue?: (number|null);

        /** Diff boolValue. */
        boolValue?: (boolean|null);

        /** Diff stringValue. */
        stringValue?: (string|null);

        /** Diff stats. */
        stats?: (game.Stats.$Properties|null);

        /** Diff derivedStats. */
        derivedStats?: (game.DerivedStats.$Properties|null);

        /** Diff skills. */
        skills?: (game.SkillsRanks.$Properties|null);

        /** Diff activeBuffs. */
        activeBuffs?: (game.Buffs.$Properties|null);

        /** Diff activeCooldowns. */
        activeCooldowns?: (game.Cooldowns.$Properties|null);

        /** Diff pausedCooldowns. */
        pausedCooldowns?: (game.Cooldowns.$Properties|null);

        /** Diff inventory. */
        inventory?: (game.Inventory.$Properties|null);

        /** Diff workers. */
        workers?: (game.Workers.$Properties|null);

        /** Diff socket. */
        socket?: (game.Socket.$Properties|null);

        /** Diff questEntry. */
        questEntry?: (game.QuestEntry.$Properties|null);

        /** Diff value. */
        value?: ("intValue"|"doubleValue"|"boolValue"|"stringValue"|"stats"|"derivedStats"|"skills"|"activeBuffs"|"activeCooldowns"|"pausedCooldowns"|"inventory"|"workers"|"socket"|"questEntry");

        /**
         * Creates a new Diff instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Diff instance
         */
        static create(properties: game.Diff.$Shape): game.Diff & game.Diff.$Shape;
        static create(properties?: game.Diff.$Properties): game.Diff;

        /**
         * Encodes the specified Diff message. Does not implicitly {@link game.Diff.verify|verify} messages.
         * @param message Diff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Diff.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Diff message, length delimited. Does not implicitly {@link game.Diff.verify|verify} messages.
         * @param message Diff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Diff.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Diff message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Diff & game.Diff.$Shape} Diff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Diff & game.Diff.$Shape;

        /**
         * Decodes a Diff message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Diff & game.Diff.$Shape} Diff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Diff & game.Diff.$Shape;

        /**
         * Verifies a Diff message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Diff message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Diff
         */
        static fromObject(object: { [k: string]: any }): game.Diff;

        /**
         * Creates a plain object from a Diff message. Also converts values to other types if specified.
         * @param message Diff
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Diff, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Diff to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Diff
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Diff {

        /** Properties of a Diff. */
        interface $Properties {

            /** Diff path */
            path?: (string|null);

            /** Diff intValue */
            intValue?: (number|Long|null);

            /** Diff doubleValue */
            doubleValue?: (number|null);

            /** Diff boolValue */
            boolValue?: (boolean|null);

            /** Diff stringValue */
            stringValue?: (string|null);

            /** Diff stats */
            stats?: (game.Stats.$Properties|null);

            /** Diff derivedStats */
            derivedStats?: (game.DerivedStats.$Properties|null);

            /** Diff skills */
            skills?: (game.SkillsRanks.$Properties|null);

            /** Diff activeBuffs */
            activeBuffs?: (game.Buffs.$Properties|null);

            /** Diff activeCooldowns */
            activeCooldowns?: (game.Cooldowns.$Properties|null);

            /** Diff pausedCooldowns */
            pausedCooldowns?: (game.Cooldowns.$Properties|null);

            /** Diff inventory */
            inventory?: (game.Inventory.$Properties|null);

            /** Diff workers */
            workers?: (game.Workers.$Properties|null);

            /** Diff socket */
            socket?: (game.Socket.$Properties|null);

            /** Diff questEntry */
            questEntry?: (game.QuestEntry.$Properties|null);

            /** Diff value */
            value?: ("intValue"|"doubleValue"|"boolValue"|"stringValue"|"stats"|"derivedStats"|"skills"|"activeBuffs"|"activeCooldowns"|"pausedCooldowns"|"inventory"|"workers"|"socket"|"questEntry");

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Narrowed shape of a Diff. */
        type $Shape = {
          path?: string|null;
          intValue?: number|Long|null;
          doubleValue?: number|null;
          boolValue?: boolean|null;
          stringValue?: string|null;
          stats?: game.Stats.$Shape|null;
          derivedStats?: game.DerivedStats.$Shape|null;
          skills?: game.SkillsRanks.$Shape|null;
          activeBuffs?: game.Buffs.$Shape|null;
          activeCooldowns?: game.Cooldowns.$Shape|null;
          pausedCooldowns?: game.Cooldowns.$Shape|null;
          inventory?: game.Inventory.$Shape|null;
          workers?: game.Workers.$Shape|null;
          socket?: game.Socket.$Shape|null;
          questEntry?: game.QuestEntry.$Shape|null;
          $unknowns?: Uint8Array[];
        } & (
          ({ value?: undefined; intValue?: null; doubleValue?: null; boolValue?: null; stringValue?: null; stats?: null; derivedStats?: null; skills?: null; activeBuffs?: null; activeCooldowns?: null; pausedCooldowns?: null; inventory?: null; workers?: null; socket?: null; questEntry?: null }|{ value?: "intValue"; intValue: number|Long; doubleValue?: null; boolValue?: null; stringValue?: null; stats?: null; derivedStats?: null; skills?: null; activeBuffs?: null; activeCooldowns?: null; pausedCooldowns?: null; inventory?: null; workers?: null; socket?: null; questEntry?: null }|{ value?: "doubleValue"; intValue?: null; doubleValue: number; boolValue?: null; stringValue?: null; stats?: null; derivedStats?: null; skills?: null; activeBuffs?: null; activeCooldowns?: null; pausedCooldowns?: null; inventory?: null; workers?: null; socket?: null; questEntry?: null }|{ value?: "boolValue"; intValue?: null; doubleValue?: null; boolValue: boolean; stringValue?: null; stats?: null; derivedStats?: null; skills?: null; activeBuffs?: null; activeCooldowns?: null; pausedCooldowns?: null; inventory?: null; workers?: null; socket?: null; questEntry?: null }|{ value?: "stringValue"; intValue?: null; doubleValue?: null; boolValue?: null; stringValue: string; stats?: null; derivedStats?: null; skills?: null; activeBuffs?: null; activeCooldowns?: null; pausedCooldowns?: null; inventory?: null; workers?: null; socket?: null; questEntry?: null }|{ value?: "stats"; intValue?: null; doubleValue?: null; boolValue?: null; stringValue?: null; stats: game.Stats.$Shape; derivedStats?: null; skills?: null; activeBuffs?: null; activeCooldowns?: null; pausedCooldowns?: null; inventory?: null; workers?: null; socket?: null; questEntry?: null }|{ value?: "derivedStats"; intValue?: null; doubleValue?: null; boolValue?: null; stringValue?: null; stats?: null; derivedStats: game.DerivedStats.$Shape; skills?: null; activeBuffs?: null; activeCooldowns?: null; pausedCooldowns?: null; inventory?: null; workers?: null; socket?: null; questEntry?: null }|{ value?: "skills"; intValue?: null; doubleValue?: null; boolValue?: null; stringValue?: null; stats?: null; derivedStats?: null; skills: game.SkillsRanks.$Shape; activeBuffs?: null; activeCooldowns?: null; pausedCooldowns?: null; inventory?: null; workers?: null; socket?: null; questEntry?: null }|{ value?: "activeBuffs"; intValue?: null; doubleValue?: null; boolValue?: null; stringValue?: null; stats?: null; derivedStats?: null; skills?: null; activeBuffs: game.Buffs.$Shape; activeCooldowns?: null; pausedCooldowns?: null; inventory?: null; workers?: null; socket?: null; questEntry?: null }|{ value?: "activeCooldowns"; intValue?: null; doubleValue?: null; boolValue?: null; stringValue?: null; stats?: null; derivedStats?: null; skills?: null; activeBuffs?: null; activeCooldowns: game.Cooldowns.$Shape; pausedCooldowns?: null; inventory?: null; workers?: null; socket?: null; questEntry?: null }|{ value?: "pausedCooldowns"; intValue?: null; doubleValue?: null; boolValue?: null; stringValue?: null; stats?: null; derivedStats?: null; skills?: null; activeBuffs?: null; activeCooldowns?: null; pausedCooldowns: game.Cooldowns.$Shape; inventory?: null; workers?: null; socket?: null; questEntry?: null }|{ value?: "inventory"; intValue?: null; doubleValue?: null; boolValue?: null; stringValue?: null; stats?: null; derivedStats?: null; skills?: null; activeBuffs?: null; activeCooldowns?: null; pausedCooldowns?: null; inventory: game.Inventory.$Shape; workers?: null; socket?: null; questEntry?: null }|{ value?: "workers"; intValue?: null; doubleValue?: null; boolValue?: null; stringValue?: null; stats?: null; derivedStats?: null; skills?: null; activeBuffs?: null; activeCooldowns?: null; pausedCooldowns?: null; inventory?: null; workers: game.Workers.$Shape; socket?: null; questEntry?: null }|{ value?: "socket"; intValue?: null; doubleValue?: null; boolValue?: null; stringValue?: null; stats?: null; derivedStats?: null; skills?: null; activeBuffs?: null; activeCooldowns?: null; pausedCooldowns?: null; inventory?: null; workers?: null; socket: game.Socket.$Shape; questEntry?: null }|{ value?: "questEntry"; intValue?: null; doubleValue?: null; boolValue?: null; stringValue?: null; stats?: null; derivedStats?: null; skills?: null; activeBuffs?: null; activeCooldowns?: null; pausedCooldowns?: null; inventory?: null; workers?: null; socket?: null; questEntry: game.QuestEntry.$Shape })
        );
    }

    /**
     * Properties of a PlayerStats.
     * @deprecated Use game.PlayerStats.$Properties instead.
     */
    interface IPlayerStats extends game.PlayerStats.$Properties {
    }

    /** Represents a PlayerStats. */
    class PlayerStats {

        /**
         * Constructs a new PlayerStats.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.PlayerStats.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PlayerStats exp. */
        exp: (number|Long);

        /** PlayerStats gold. */
        gold: (number|Long);

        /**
         * Creates a new PlayerStats instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerStats instance
         */
        static create(properties: game.PlayerStats.$Shape): game.PlayerStats & game.PlayerStats.$Shape;
        static create(properties?: game.PlayerStats.$Properties): game.PlayerStats;

        /**
         * Encodes the specified PlayerStats message. Does not implicitly {@link game.PlayerStats.verify|verify} messages.
         * @param message PlayerStats message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.PlayerStats.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerStats message, length delimited. Does not implicitly {@link game.PlayerStats.verify|verify} messages.
         * @param message PlayerStats message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.PlayerStats.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerStats message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.PlayerStats & game.PlayerStats.$Shape} PlayerStats
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PlayerStats & game.PlayerStats.$Shape;

        /**
         * Decodes a PlayerStats message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.PlayerStats & game.PlayerStats.$Shape} PlayerStats
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PlayerStats & game.PlayerStats.$Shape;

        /**
         * Verifies a PlayerStats message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerStats message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerStats
         */
        static fromObject(object: { [k: string]: any }): game.PlayerStats;

        /**
         * Creates a plain object from a PlayerStats message. Also converts values to other types if specified.
         * @param message PlayerStats
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.PlayerStats, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerStats to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PlayerStats
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PlayerStats {

        /** Properties of a PlayerStats. */
        interface $Properties {

            /** PlayerStats exp */
            exp?: (number|Long|null);

            /** PlayerStats gold */
            gold?: (number|Long|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PlayerStats. */
        type $Shape = game.PlayerStats.$Properties;
    }

    /**
     * Properties of a CombatDiff.
     * @deprecated Use game.CombatDiff.$Properties instead.
     */
    interface ICombatDiff extends game.CombatDiff.$Properties {
    }

    /** Represents a CombatDiff. */
    class CombatDiff {

        /**
         * Constructs a new CombatDiff.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.CombatDiff.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** CombatDiff enemyId. */
        enemyId: string;

        /** CombatDiff hit. */
        hit: boolean;

        /** CombatDiff damageDealt. */
        damageDealt: number;

        /** CombatDiff crit. */
        crit: boolean;

        /** CombatDiff damageType. */
        damageType: string;

        /** CombatDiff skillId. */
        skillId: string;

        /** CombatDiff skillType. */
        skillType: string;

        /** CombatDiff enemyHp. */
        enemyHp: (number|Long);

        /** CombatDiff enemyDead. */
        enemyDead: boolean;

        /** CombatDiff expGained. */
        expGained: (number|Long);

        /** CombatDiff goldGained. */
        goldGained: (number|Long);

        /** CombatDiff playerStats. */
        playerStats?: (game.PlayerStats.$Properties|null);

        /** CombatDiff buff. */
        buff?: (game.Buff.$Properties|null);

        /**
         * Creates a new CombatDiff instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CombatDiff instance
         */
        static create(properties: game.CombatDiff.$Shape): game.CombatDiff & game.CombatDiff.$Shape;
        static create(properties?: game.CombatDiff.$Properties): game.CombatDiff;

        /**
         * Encodes the specified CombatDiff message. Does not implicitly {@link game.CombatDiff.verify|verify} messages.
         * @param message CombatDiff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.CombatDiff.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CombatDiff message, length delimited. Does not implicitly {@link game.CombatDiff.verify|verify} messages.
         * @param message CombatDiff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.CombatDiff.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CombatDiff message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.CombatDiff & game.CombatDiff.$Shape} CombatDiff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.CombatDiff & game.CombatDiff.$Shape;

        /**
         * Decodes a CombatDiff message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.CombatDiff & game.CombatDiff.$Shape} CombatDiff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.CombatDiff & game.CombatDiff.$Shape;

        /**
         * Verifies a CombatDiff message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CombatDiff message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CombatDiff
         */
        static fromObject(object: { [k: string]: any }): game.CombatDiff;

        /**
         * Creates a plain object from a CombatDiff message. Also converts values to other types if specified.
         * @param message CombatDiff
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.CombatDiff, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CombatDiff to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for CombatDiff
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace CombatDiff {

        /** Properties of a CombatDiff. */
        interface $Properties {

            /** CombatDiff enemyId */
            enemyId?: (string|null);

            /** CombatDiff hit */
            hit?: (boolean|null);

            /** CombatDiff damageDealt */
            damageDealt?: (number|null);

            /** CombatDiff crit */
            crit?: (boolean|null);

            /** CombatDiff damageType */
            damageType?: (string|null);

            /** CombatDiff skillId */
            skillId?: (string|null);

            /** CombatDiff skillType */
            skillType?: (string|null);

            /** CombatDiff enemyHp */
            enemyHp?: (number|Long|null);

            /** CombatDiff enemyDead */
            enemyDead?: (boolean|null);

            /** CombatDiff expGained */
            expGained?: (number|Long|null);

            /** CombatDiff goldGained */
            goldGained?: (number|Long|null);

            /** CombatDiff playerStats */
            playerStats?: (game.PlayerStats.$Properties|null);

            /** CombatDiff buff */
            buff?: (game.Buff.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a CombatDiff. */
        type $Shape = game.CombatDiff.$Properties;
    }

    /**
     * Properties of an EnemyAttack.
     * @deprecated Use game.EnemyAttack.$Properties instead.
     */
    interface IEnemyAttack extends game.EnemyAttack.$Properties {
    }

    /** Represents an EnemyAttack. */
    class EnemyAttack {

        /**
         * Constructs a new EnemyAttack.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.EnemyAttack.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** EnemyAttack enemyId. */
        enemyId: string;

        /** EnemyAttack damageDealt. */
        damageDealt: number;

        /** EnemyAttack hit. */
        hit: boolean;

        /** EnemyAttack crit. */
        crit: boolean;

        /** EnemyAttack damageType. */
        damageType: string;

        /** EnemyAttack playerHp. */
        playerHp: (number|Long);

        /** EnemyAttack playerDead. */
        playerDead: boolean;

        /** EnemyAttack nextAttackAt. */
        nextAttackAt: (number|Long);

        /** EnemyAttack nextAttackDelay. */
        nextAttackDelay: (number|Long);

        /**
         * Creates a new EnemyAttack instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnemyAttack instance
         */
        static create(properties: game.EnemyAttack.$Shape): game.EnemyAttack & game.EnemyAttack.$Shape;
        static create(properties?: game.EnemyAttack.$Properties): game.EnemyAttack;

        /**
         * Encodes the specified EnemyAttack message. Does not implicitly {@link game.EnemyAttack.verify|verify} messages.
         * @param message EnemyAttack message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.EnemyAttack.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnemyAttack message, length delimited. Does not implicitly {@link game.EnemyAttack.verify|verify} messages.
         * @param message EnemyAttack message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.EnemyAttack.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnemyAttack message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.EnemyAttack & game.EnemyAttack.$Shape} EnemyAttack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.EnemyAttack & game.EnemyAttack.$Shape;

        /**
         * Decodes an EnemyAttack message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.EnemyAttack & game.EnemyAttack.$Shape} EnemyAttack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.EnemyAttack & game.EnemyAttack.$Shape;

        /**
         * Verifies an EnemyAttack message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnemyAttack message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnemyAttack
         */
        static fromObject(object: { [k: string]: any }): game.EnemyAttack;

        /**
         * Creates a plain object from an EnemyAttack message. Also converts values to other types if specified.
         * @param message EnemyAttack
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.EnemyAttack, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnemyAttack to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for EnemyAttack
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace EnemyAttack {

        /** Properties of an EnemyAttack. */
        interface $Properties {

            /** EnemyAttack enemyId */
            enemyId?: (string|null);

            /** EnemyAttack damageDealt */
            damageDealt?: (number|null);

            /** EnemyAttack hit */
            hit?: (boolean|null);

            /** EnemyAttack crit */
            crit?: (boolean|null);

            /** EnemyAttack damageType */
            damageType?: (string|null);

            /** EnemyAttack playerHp */
            playerHp?: (number|Long|null);

            /** EnemyAttack playerDead */
            playerDead?: (boolean|null);

            /** EnemyAttack nextAttackAt */
            nextAttackAt?: (number|Long|null);

            /** EnemyAttack nextAttackDelay */
            nextAttackDelay?: (number|Long|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an EnemyAttack. */
        type $Shape = game.EnemyAttack.$Properties;
    }

    /**
     * Properties of an EnemySpawn.
     * @deprecated Use game.EnemySpawn.$Properties instead.
     */
    interface IEnemySpawn extends game.EnemySpawn.$Properties {
    }

    /** Represents an EnemySpawn. */
    class EnemySpawn {

        /**
         * Constructs a new EnemySpawn.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.EnemySpawn.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** EnemySpawn enemies. */
        enemies: game.Enemy.$Properties[];

        /** EnemySpawn placeId. */
        placeId: string;

        /**
         * Creates a new EnemySpawn instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnemySpawn instance
         */
        static create(properties: game.EnemySpawn.$Shape): game.EnemySpawn & game.EnemySpawn.$Shape;
        static create(properties?: game.EnemySpawn.$Properties): game.EnemySpawn;

        /**
         * Encodes the specified EnemySpawn message. Does not implicitly {@link game.EnemySpawn.verify|verify} messages.
         * @param message EnemySpawn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.EnemySpawn.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnemySpawn message, length delimited. Does not implicitly {@link game.EnemySpawn.verify|verify} messages.
         * @param message EnemySpawn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.EnemySpawn.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnemySpawn message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.EnemySpawn & game.EnemySpawn.$Shape} EnemySpawn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.EnemySpawn & game.EnemySpawn.$Shape;

        /**
         * Decodes an EnemySpawn message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.EnemySpawn & game.EnemySpawn.$Shape} EnemySpawn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.EnemySpawn & game.EnemySpawn.$Shape;

        /**
         * Verifies an EnemySpawn message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnemySpawn message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnemySpawn
         */
        static fromObject(object: { [k: string]: any }): game.EnemySpawn;

        /**
         * Creates a plain object from an EnemySpawn message. Also converts values to other types if specified.
         * @param message EnemySpawn
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.EnemySpawn, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnemySpawn to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for EnemySpawn
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace EnemySpawn {

        /** Properties of an EnemySpawn. */
        interface $Properties {

            /** EnemySpawn enemies */
            enemies?: (game.Enemy.$Properties[]|null);

            /** EnemySpawn placeId */
            placeId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an EnemySpawn. */
        type $Shape = game.EnemySpawn.$Properties;
    }

    /**
     * Properties of a ProductionTick.
     * @deprecated Use game.ProductionTick.$Properties instead.
     */
    interface IProductionTick extends game.ProductionTick.$Properties {
    }

    /** Represents a ProductionTick. */
    class ProductionTick {

        /**
         * Constructs a new ProductionTick.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.ProductionTick.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** ProductionTick item. */
        item?: (game.Item.$Properties|null);

        /** ProductionTick placeId. */
        placeId: string;

        /** ProductionTick socketIndex. */
        socketIndex: number;

        /** ProductionTick targetPlaceId. */
        targetPlaceId: string;

        /** ProductionTick workerId. */
        workerId: string;

        /** ProductionTick workerName. */
        workerName: string;

        /**
         * Creates a new ProductionTick instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ProductionTick instance
         */
        static create(properties: game.ProductionTick.$Shape): game.ProductionTick & game.ProductionTick.$Shape;
        static create(properties?: game.ProductionTick.$Properties): game.ProductionTick;

        /**
         * Encodes the specified ProductionTick message. Does not implicitly {@link game.ProductionTick.verify|verify} messages.
         * @param message ProductionTick message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.ProductionTick.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ProductionTick message, length delimited. Does not implicitly {@link game.ProductionTick.verify|verify} messages.
         * @param message ProductionTick message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.ProductionTick.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ProductionTick message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.ProductionTick & game.ProductionTick.$Shape} ProductionTick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.ProductionTick & game.ProductionTick.$Shape;

        /**
         * Decodes a ProductionTick message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.ProductionTick & game.ProductionTick.$Shape} ProductionTick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.ProductionTick & game.ProductionTick.$Shape;

        /**
         * Verifies a ProductionTick message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ProductionTick message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ProductionTick
         */
        static fromObject(object: { [k: string]: any }): game.ProductionTick;

        /**
         * Creates a plain object from a ProductionTick message. Also converts values to other types if specified.
         * @param message ProductionTick
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.ProductionTick, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ProductionTick to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for ProductionTick
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace ProductionTick {

        /** Properties of a ProductionTick. */
        interface $Properties {

            /** ProductionTick item */
            item?: (game.Item.$Properties|null);

            /** ProductionTick placeId */
            placeId?: (string|null);

            /** ProductionTick socketIndex */
            socketIndex?: (number|null);

            /** ProductionTick targetPlaceId */
            targetPlaceId?: (string|null);

            /** ProductionTick workerId */
            workerId?: (string|null);

            /** ProductionTick workerName */
            workerName?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a ProductionTick. */
        type $Shape = game.ProductionTick.$Properties;
    }

    /**
     * Properties of a QuestUpdate.
     * @deprecated Use game.QuestUpdate.$Properties instead.
     */
    interface IQuestUpdate extends game.QuestUpdate.$Properties {
    }

    /** Represents a QuestUpdate. */
    class QuestUpdate {

        /**
         * Constructs a new QuestUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.QuestUpdate.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** QuestUpdate questId. */
        questId: string;

        /** QuestUpdate accepted. */
        accepted: boolean;

        /** QuestUpdate completed. */
        completed: boolean;

        /** QuestUpdate progress. */
        progress?: (game.QuestEntry.$Properties|null);

        /** QuestUpdate success. */
        success: boolean;

        /** QuestUpdate rewards. */
        rewards?: (game.Rewards.$Properties|null);

        /**
         * Creates a new QuestUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QuestUpdate instance
         */
        static create(properties: game.QuestUpdate.$Shape): game.QuestUpdate & game.QuestUpdate.$Shape;
        static create(properties?: game.QuestUpdate.$Properties): game.QuestUpdate;

        /**
         * Encodes the specified QuestUpdate message. Does not implicitly {@link game.QuestUpdate.verify|verify} messages.
         * @param message QuestUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.QuestUpdate.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified QuestUpdate message, length delimited. Does not implicitly {@link game.QuestUpdate.verify|verify} messages.
         * @param message QuestUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.QuestUpdate.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a QuestUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.QuestUpdate & game.QuestUpdate.$Shape} QuestUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.QuestUpdate & game.QuestUpdate.$Shape;

        /**
         * Decodes a QuestUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.QuestUpdate & game.QuestUpdate.$Shape} QuestUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.QuestUpdate & game.QuestUpdate.$Shape;

        /**
         * Verifies a QuestUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a QuestUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns QuestUpdate
         */
        static fromObject(object: { [k: string]: any }): game.QuestUpdate;

        /**
         * Creates a plain object from a QuestUpdate message. Also converts values to other types if specified.
         * @param message QuestUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.QuestUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this QuestUpdate to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for QuestUpdate
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace QuestUpdate {

        /** Properties of a QuestUpdate. */
        interface $Properties {

            /** QuestUpdate questId */
            questId?: (string|null);

            /** QuestUpdate accepted */
            accepted?: (boolean|null);

            /** QuestUpdate completed */
            completed?: (boolean|null);

            /** QuestUpdate progress */
            progress?: (game.QuestEntry.$Properties|null);

            /** QuestUpdate success */
            success?: (boolean|null);

            /** QuestUpdate rewards */
            rewards?: (game.Rewards.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a QuestUpdate. */
        type $Shape = game.QuestUpdate.$Properties;
    }

    /**
     * Properties of an InventoryUpdate.
     * @deprecated Use game.InventoryUpdate.$Properties instead.
     */
    interface IInventoryUpdate extends game.InventoryUpdate.$Properties {
    }

    /** Represents an InventoryUpdate. */
    class InventoryUpdate {

        /**
         * Constructs a new InventoryUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.InventoryUpdate.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** InventoryUpdate inventories. */
        inventories: { [k: string]: game.Inventory.$Properties };

        /**
         * Creates a new InventoryUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InventoryUpdate instance
         */
        static create(properties: game.InventoryUpdate.$Shape): game.InventoryUpdate & game.InventoryUpdate.$Shape;
        static create(properties?: game.InventoryUpdate.$Properties): game.InventoryUpdate;

        /**
         * Encodes the specified InventoryUpdate message. Does not implicitly {@link game.InventoryUpdate.verify|verify} messages.
         * @param message InventoryUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.InventoryUpdate.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InventoryUpdate message, length delimited. Does not implicitly {@link game.InventoryUpdate.verify|verify} messages.
         * @param message InventoryUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.InventoryUpdate.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InventoryUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.InventoryUpdate & game.InventoryUpdate.$Shape} InventoryUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.InventoryUpdate & game.InventoryUpdate.$Shape;

        /**
         * Decodes an InventoryUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.InventoryUpdate & game.InventoryUpdate.$Shape} InventoryUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.InventoryUpdate & game.InventoryUpdate.$Shape;

        /**
         * Verifies an InventoryUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InventoryUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InventoryUpdate
         */
        static fromObject(object: { [k: string]: any }): game.InventoryUpdate;

        /**
         * Creates a plain object from an InventoryUpdate message. Also converts values to other types if specified.
         * @param message InventoryUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.InventoryUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InventoryUpdate to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for InventoryUpdate
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace InventoryUpdate {

        /** Properties of an InventoryUpdate. */
        interface $Properties {

            /** InventoryUpdate inventories */
            inventories?: ({ [k: string]: game.Inventory.$Properties }|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an InventoryUpdate. */
        type $Shape = game.InventoryUpdate.$Properties;
    }

    /**
     * Properties of a Notification.
     * @deprecated Use game.Notification.$Properties instead.
     */
    interface INotification extends game.Notification.$Properties {
    }

    /** Represents a Notification. */
    class Notification {

        /**
         * Constructs a new Notification.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Notification.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Notification message. */
        message: string;

        /** Notification type. */
        type: string;

        /**
         * Creates a new Notification instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Notification instance
         */
        static create(properties: game.Notification.$Shape): game.Notification & game.Notification.$Shape;
        static create(properties?: game.Notification.$Properties): game.Notification;

        /**
         * Encodes the specified Notification message. Does not implicitly {@link game.Notification.verify|verify} messages.
         * @param message Notification message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Notification.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Notification message, length delimited. Does not implicitly {@link game.Notification.verify|verify} messages.
         * @param message Notification message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Notification.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Notification message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Notification & game.Notification.$Shape} Notification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Notification & game.Notification.$Shape;

        /**
         * Decodes a Notification message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Notification & game.Notification.$Shape} Notification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Notification & game.Notification.$Shape;

        /**
         * Verifies a Notification message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Notification message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Notification
         */
        static fromObject(object: { [k: string]: any }): game.Notification;

        /**
         * Creates a plain object from a Notification message. Also converts values to other types if specified.
         * @param message Notification
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Notification, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Notification to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Notification
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Notification {

        /** Properties of a Notification. */
        interface $Properties {

            /** Notification message */
            message?: (string|null);

            /** Notification type */
            type?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Notification. */
        type $Shape = game.Notification.$Properties;
    }

    /**
     * Properties of a TradeResult.
     * @deprecated Use game.TradeResult.$Properties instead.
     */
    interface ITradeResult extends game.TradeResult.$Properties {
    }

    /** Represents a TradeResult. */
    class TradeResult {

        /**
         * Constructs a new TradeResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.TradeResult.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** TradeResult success. */
        success: boolean;

        /** TradeResult message. */
        message: string;

        /**
         * Creates a new TradeResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TradeResult instance
         */
        static create(properties: game.TradeResult.$Shape): game.TradeResult & game.TradeResult.$Shape;
        static create(properties?: game.TradeResult.$Properties): game.TradeResult;

        /**
         * Encodes the specified TradeResult message. Does not implicitly {@link game.TradeResult.verify|verify} messages.
         * @param message TradeResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.TradeResult.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TradeResult message, length delimited. Does not implicitly {@link game.TradeResult.verify|verify} messages.
         * @param message TradeResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.TradeResult.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TradeResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.TradeResult & game.TradeResult.$Shape} TradeResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.TradeResult & game.TradeResult.$Shape;

        /**
         * Decodes a TradeResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.TradeResult & game.TradeResult.$Shape} TradeResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.TradeResult & game.TradeResult.$Shape;

        /**
         * Verifies a TradeResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TradeResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TradeResult
         */
        static fromObject(object: { [k: string]: any }): game.TradeResult;

        /**
         * Creates a plain object from a TradeResult message. Also converts values to other types if specified.
         * @param message TradeResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.TradeResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TradeResult to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for TradeResult
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace TradeResult {

        /** Properties of a TradeResult. */
        interface $Properties {

            /** TradeResult success */
            success?: (boolean|null);

            /** TradeResult message */
            message?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a TradeResult. */
        type $Shape = game.TradeResult.$Properties;
    }

    /**
     * Properties of a UseResult.
     * @deprecated Use game.UseResult.$Properties instead.
     */
    interface IUseResult extends game.UseResult.$Properties {
    }

    /** Represents a UseResult. */
    class UseResult {

        /**
         * Constructs a new UseResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.UseResult.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** UseResult success. */
        success: boolean;

        /** UseResult message. */
        message: string;

        /**
         * Creates a new UseResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UseResult instance
         */
        static create(properties: game.UseResult.$Shape): game.UseResult & game.UseResult.$Shape;
        static create(properties?: game.UseResult.$Properties): game.UseResult;

        /**
         * Encodes the specified UseResult message. Does not implicitly {@link game.UseResult.verify|verify} messages.
         * @param message UseResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.UseResult.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UseResult message, length delimited. Does not implicitly {@link game.UseResult.verify|verify} messages.
         * @param message UseResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.UseResult.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UseResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.UseResult & game.UseResult.$Shape} UseResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.UseResult & game.UseResult.$Shape;

        /**
         * Decodes a UseResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.UseResult & game.UseResult.$Shape} UseResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.UseResult & game.UseResult.$Shape;

        /**
         * Verifies a UseResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UseResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UseResult
         */
        static fromObject(object: { [k: string]: any }): game.UseResult;

        /**
         * Creates a plain object from a UseResult message. Also converts values to other types if specified.
         * @param message UseResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.UseResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UseResult to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for UseResult
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace UseResult {

        /** Properties of a UseResult. */
        interface $Properties {

            /** UseResult success */
            success?: (boolean|null);

            /** UseResult message */
            message?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a UseResult. */
        type $Shape = game.UseResult.$Properties;
    }

    /**
     * Properties of a PresencePlayer.
     * @deprecated Use game.PresencePlayer.$Properties instead.
     */
    interface IPresencePlayer extends game.PresencePlayer.$Properties {
    }

    /** Represents a PresencePlayer. */
    class PresencePlayer {

        /**
         * Constructs a new PresencePlayer.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.PresencePlayer.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PresencePlayer nickname. */
        nickname: string;

        /** PresencePlayer level. */
        level: number;

        /** PresencePlayer avatar. */
        avatar: string;

        /** PresencePlayer enteredAt. */
        enteredAt: (number|Long);

        /**
         * Creates a new PresencePlayer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PresencePlayer instance
         */
        static create(properties: game.PresencePlayer.$Shape): game.PresencePlayer & game.PresencePlayer.$Shape;
        static create(properties?: game.PresencePlayer.$Properties): game.PresencePlayer;

        /**
         * Encodes the specified PresencePlayer message. Does not implicitly {@link game.PresencePlayer.verify|verify} messages.
         * @param message PresencePlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.PresencePlayer.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PresencePlayer message, length delimited. Does not implicitly {@link game.PresencePlayer.verify|verify} messages.
         * @param message PresencePlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.PresencePlayer.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PresencePlayer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.PresencePlayer & game.PresencePlayer.$Shape} PresencePlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PresencePlayer & game.PresencePlayer.$Shape;

        /**
         * Decodes a PresencePlayer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.PresencePlayer & game.PresencePlayer.$Shape} PresencePlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PresencePlayer & game.PresencePlayer.$Shape;

        /**
         * Verifies a PresencePlayer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PresencePlayer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PresencePlayer
         */
        static fromObject(object: { [k: string]: any }): game.PresencePlayer;

        /**
         * Creates a plain object from a PresencePlayer message. Also converts values to other types if specified.
         * @param message PresencePlayer
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.PresencePlayer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PresencePlayer to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PresencePlayer
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PresencePlayer {

        /** Properties of a PresencePlayer. */
        interface $Properties {

            /** PresencePlayer nickname */
            nickname?: (string|null);

            /** PresencePlayer level */
            level?: (number|null);

            /** PresencePlayer avatar */
            avatar?: (string|null);

            /** PresencePlayer enteredAt */
            enteredAt?: (number|Long|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PresencePlayer. */
        type $Shape = game.PresencePlayer.$Properties;
    }

    /**
     * Properties of a PresenceUpdate.
     * @deprecated Use game.PresenceUpdate.$Properties instead.
     */
    interface IPresenceUpdate extends game.PresenceUpdate.$Properties {
    }

    /** Represents a PresenceUpdate. */
    class PresenceUpdate {

        /**
         * Constructs a new PresenceUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.PresenceUpdate.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PresenceUpdate placeId. */
        placeId: string;

        /** PresenceUpdate players. */
        players: game.PresencePlayer.$Properties[];

        /**
         * Creates a new PresenceUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PresenceUpdate instance
         */
        static create(properties: game.PresenceUpdate.$Shape): game.PresenceUpdate & game.PresenceUpdate.$Shape;
        static create(properties?: game.PresenceUpdate.$Properties): game.PresenceUpdate;

        /**
         * Encodes the specified PresenceUpdate message. Does not implicitly {@link game.PresenceUpdate.verify|verify} messages.
         * @param message PresenceUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.PresenceUpdate.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PresenceUpdate message, length delimited. Does not implicitly {@link game.PresenceUpdate.verify|verify} messages.
         * @param message PresenceUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.PresenceUpdate.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PresenceUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.PresenceUpdate & game.PresenceUpdate.$Shape} PresenceUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PresenceUpdate & game.PresenceUpdate.$Shape;

        /**
         * Decodes a PresenceUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.PresenceUpdate & game.PresenceUpdate.$Shape} PresenceUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PresenceUpdate & game.PresenceUpdate.$Shape;

        /**
         * Verifies a PresenceUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PresenceUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PresenceUpdate
         */
        static fromObject(object: { [k: string]: any }): game.PresenceUpdate;

        /**
         * Creates a plain object from a PresenceUpdate message. Also converts values to other types if specified.
         * @param message PresenceUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.PresenceUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PresenceUpdate to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PresenceUpdate
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PresenceUpdate {

        /** Properties of a PresenceUpdate. */
        interface $Properties {

            /** PresenceUpdate placeId */
            placeId?: (string|null);

            /** PresenceUpdate players */
            players?: (game.PresencePlayer.$Properties[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PresenceUpdate. */
        type $Shape = game.PresenceUpdate.$Properties;
    }

    /**
     * Properties of a Poked.
     * @deprecated Use game.Poked.$Properties instead.
     */
    interface IPoked extends game.Poked.$Properties {
    }

    /** Represents a Poked. */
    class Poked {

        /**
         * Constructs a new Poked.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.Poked.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Poked fromNickname. */
        fromNickname: string;

        /** Poked fromAvatar. */
        fromAvatar: string;

        /**
         * Creates a new Poked instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Poked instance
         */
        static create(properties: game.Poked.$Shape): game.Poked & game.Poked.$Shape;
        static create(properties?: game.Poked.$Properties): game.Poked;

        /**
         * Encodes the specified Poked message. Does not implicitly {@link game.Poked.verify|verify} messages.
         * @param message Poked message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.Poked.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Poked message, length delimited. Does not implicitly {@link game.Poked.verify|verify} messages.
         * @param message Poked message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.Poked.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Poked message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.Poked & game.Poked.$Shape} Poked
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Poked & game.Poked.$Shape;

        /**
         * Decodes a Poked message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.Poked & game.Poked.$Shape} Poked
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Poked & game.Poked.$Shape;

        /**
         * Verifies a Poked message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Poked message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Poked
         */
        static fromObject(object: { [k: string]: any }): game.Poked;

        /**
         * Creates a plain object from a Poked message. Also converts values to other types if specified.
         * @param message Poked
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.Poked, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Poked to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Poked
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Poked {

        /** Properties of a Poked. */
        interface $Properties {

            /** Poked fromNickname */
            fromNickname?: (string|null);

            /** Poked fromAvatar */
            fromAvatar?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Poked. */
        type $Shape = game.Poked.$Properties;
    }

    /**
     * Properties of a PokeAck.
     * @deprecated Use game.PokeAck.$Properties instead.
     */
    interface IPokeAck extends game.PokeAck.$Properties {
    }

    /** Represents a PokeAck. */
    class PokeAck {

        /**
         * Constructs a new PokeAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.PokeAck.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PokeAck ok. */
        ok: boolean;

        /** PokeAck targetNickname. */
        targetNickname: string;

        /** PokeAck reason. */
        reason: string;

        /**
         * Creates a new PokeAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PokeAck instance
         */
        static create(properties: game.PokeAck.$Shape): game.PokeAck & game.PokeAck.$Shape;
        static create(properties?: game.PokeAck.$Properties): game.PokeAck;

        /**
         * Encodes the specified PokeAck message. Does not implicitly {@link game.PokeAck.verify|verify} messages.
         * @param message PokeAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.PokeAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PokeAck message, length delimited. Does not implicitly {@link game.PokeAck.verify|verify} messages.
         * @param message PokeAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.PokeAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PokeAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.PokeAck & game.PokeAck.$Shape} PokeAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PokeAck & game.PokeAck.$Shape;

        /**
         * Decodes a PokeAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.PokeAck & game.PokeAck.$Shape} PokeAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PokeAck & game.PokeAck.$Shape;

        /**
         * Verifies a PokeAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PokeAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PokeAck
         */
        static fromObject(object: { [k: string]: any }): game.PokeAck;

        /**
         * Creates a plain object from a PokeAck message. Also converts values to other types if specified.
         * @param message PokeAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.PokeAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PokeAck to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PokeAck
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PokeAck {

        /** Properties of a PokeAck. */
        interface $Properties {

            /** PokeAck ok */
            ok?: (boolean|null);

            /** PokeAck targetNickname */
            targetNickname?: (string|null);

            /** PokeAck reason */
            reason?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PokeAck. */
        type $Shape = game.PokeAck.$Properties;
    }

    /**
     * Properties of a PartyMember.
     * @deprecated Use game.PartyMember.$Properties instead.
     */
    interface IPartyMember extends game.PartyMember.$Properties {
    }

    /** Represents a PartyMember. */
    class PartyMember {

        /**
         * Constructs a new PartyMember.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.PartyMember.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PartyMember sessionId. */
        sessionId: string;

        /** PartyMember nickname. */
        nickname: string;

        /** PartyMember isLeader. */
        isLeader: boolean;

        /** PartyMember location. */
        location: string;

        /**
         * Creates a new PartyMember instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PartyMember instance
         */
        static create(properties: game.PartyMember.$Shape): game.PartyMember & game.PartyMember.$Shape;
        static create(properties?: game.PartyMember.$Properties): game.PartyMember;

        /**
         * Encodes the specified PartyMember message. Does not implicitly {@link game.PartyMember.verify|verify} messages.
         * @param message PartyMember message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.PartyMember.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PartyMember message, length delimited. Does not implicitly {@link game.PartyMember.verify|verify} messages.
         * @param message PartyMember message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.PartyMember.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PartyMember message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.PartyMember & game.PartyMember.$Shape} PartyMember
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PartyMember & game.PartyMember.$Shape;

        /**
         * Decodes a PartyMember message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.PartyMember & game.PartyMember.$Shape} PartyMember
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PartyMember & game.PartyMember.$Shape;

        /**
         * Verifies a PartyMember message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PartyMember message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PartyMember
         */
        static fromObject(object: { [k: string]: any }): game.PartyMember;

        /**
         * Creates a plain object from a PartyMember message. Also converts values to other types if specified.
         * @param message PartyMember
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.PartyMember, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PartyMember to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PartyMember
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PartyMember {

        /** Properties of a PartyMember. */
        interface $Properties {

            /** PartyMember sessionId */
            sessionId?: (string|null);

            /** PartyMember nickname */
            nickname?: (string|null);

            /** PartyMember isLeader */
            isLeader?: (boolean|null);

            /** PartyMember location */
            location?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PartyMember. */
        type $Shape = game.PartyMember.$Properties;
    }

    /**
     * Properties of a PartyInfo.
     * @deprecated Use game.PartyInfo.$Properties instead.
     */
    interface IPartyInfo extends game.PartyInfo.$Properties {
    }

    /** Represents a PartyInfo. */
    class PartyInfo {

        /**
         * Constructs a new PartyInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.PartyInfo.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PartyInfo id. */
        id: string;

        /** PartyInfo name. */
        name: string;

        /** PartyInfo leaderName. */
        leaderName: string;

        /** PartyInfo memberCount. */
        memberCount: number;

        /** PartyInfo maxPlayers. */
        maxPlayers: number;

        /** PartyInfo location. */
        location: string;

        /**
         * Creates a new PartyInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PartyInfo instance
         */
        static create(properties: game.PartyInfo.$Shape): game.PartyInfo & game.PartyInfo.$Shape;
        static create(properties?: game.PartyInfo.$Properties): game.PartyInfo;

        /**
         * Encodes the specified PartyInfo message. Does not implicitly {@link game.PartyInfo.verify|verify} messages.
         * @param message PartyInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.PartyInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PartyInfo message, length delimited. Does not implicitly {@link game.PartyInfo.verify|verify} messages.
         * @param message PartyInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.PartyInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PartyInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.PartyInfo & game.PartyInfo.$Shape} PartyInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PartyInfo & game.PartyInfo.$Shape;

        /**
         * Decodes a PartyInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.PartyInfo & game.PartyInfo.$Shape} PartyInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PartyInfo & game.PartyInfo.$Shape;

        /**
         * Verifies a PartyInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PartyInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PartyInfo
         */
        static fromObject(object: { [k: string]: any }): game.PartyInfo;

        /**
         * Creates a plain object from a PartyInfo message. Also converts values to other types if specified.
         * @param message PartyInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.PartyInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PartyInfo to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PartyInfo
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PartyInfo {

        /** Properties of a PartyInfo. */
        interface $Properties {

            /** PartyInfo id */
            id?: (string|null);

            /** PartyInfo name */
            name?: (string|null);

            /** PartyInfo leaderId */
            leaderId?: (string|null);

            /** PartyInfo memberCount */
            memberCount?: (number|null);

            /** PartyInfo maxPlayers */
            maxPlayers?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PartyInfo. */
        type $Shape = game.PartyInfo.$Properties;
    }

    /**
     * Properties of a PartyStateMsg.
     * @deprecated Use game.PartyStateMsg.$Properties instead.
     */
    interface IPartyStateMsg extends game.PartyStateMsg.$Properties {
    }

    /** Represents a PartyStateMsg. */
    class PartyStateMsg {

        /**
         * Constructs a new PartyStateMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.PartyStateMsg.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PartyStateMsg id. */
        id: string;

        /** PartyStateMsg name. */
        name: string;

        /** PartyStateMsg leaderName. */
        leaderName: string;

        /** PartyStateMsg members. */
        members: game.PartyMember.$Properties[];

        /** PartyStateMsg memberCount. */
        memberCount: number;

        /** PartyStateMsg maxPlayers. */
        maxPlayers: number;

        /** PartyStateMsg location. */
        location: string;

        /**
         * Creates a new PartyStateMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PartyStateMsg instance
         */
        static create(properties: game.PartyStateMsg.$Shape): game.PartyStateMsg & game.PartyStateMsg.$Shape;
        static create(properties?: game.PartyStateMsg.$Properties): game.PartyStateMsg;

        /**
         * Encodes the specified PartyStateMsg message. Does not implicitly {@link game.PartyStateMsg.verify|verify} messages.
         * @param message PartyStateMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.PartyStateMsg.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PartyStateMsg message, length delimited. Does not implicitly {@link game.PartyStateMsg.verify|verify} messages.
         * @param message PartyStateMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.PartyStateMsg.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PartyStateMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.PartyStateMsg & game.PartyStateMsg.$Shape} PartyStateMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PartyStateMsg & game.PartyStateMsg.$Shape;

        /**
         * Decodes a PartyStateMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.PartyStateMsg & game.PartyStateMsg.$Shape} PartyStateMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PartyStateMsg & game.PartyStateMsg.$Shape;

        /**
         * Verifies a PartyStateMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PartyStateMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PartyStateMsg
         */
        static fromObject(object: { [k: string]: any }): game.PartyStateMsg;

        /**
         * Creates a plain object from a PartyStateMsg message. Also converts values to other types if specified.
         * @param message PartyStateMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.PartyStateMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PartyStateMsg to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PartyStateMsg
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PartyStateMsg {

        /** Properties of a PartyStateMsg. */
        interface $Properties {

            /** PartyStateMsg id */
            id?: (string|null);

            /** PartyStateMsg name */
            name?: (string|null);

            /** PartyStateMsg leaderId */
            leaderId?: (string|null);

            /** PartyStateMsg members */
            members?: (game.PartyMember.$Properties[]|null);

            /** PartyStateMsg memberCount */
            memberCount?: (number|null);

            /** PartyStateMsg maxPlayers */
            maxPlayers?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PartyStateMsg. */
        type $Shape = game.PartyStateMsg.$Properties;
    }

    /**
     * Properties of a PartyListUpdate.
     * @deprecated Use game.PartyListUpdate.$Properties instead.
     */
    interface IPartyListUpdate extends game.PartyListUpdate.$Properties {
    }

    /** Represents a PartyListUpdate. */
    class PartyListUpdate {

        /**
         * Constructs a new PartyListUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.PartyListUpdate.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PartyListUpdate parties. */
        parties: game.PartyInfo.$Properties[];

        /**
         * Creates a new PartyListUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PartyListUpdate instance
         */
        static create(properties: game.PartyListUpdate.$Shape): game.PartyListUpdate & game.PartyListUpdate.$Shape;
        static create(properties?: game.PartyListUpdate.$Properties): game.PartyListUpdate;

        /**
         * Encodes the specified PartyListUpdate message. Does not implicitly {@link game.PartyListUpdate.verify|verify} messages.
         * @param message PartyListUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.PartyListUpdate.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PartyListUpdate message, length delimited. Does not implicitly {@link game.PartyListUpdate.verify|verify} messages.
         * @param message PartyListUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.PartyListUpdate.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PartyListUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.PartyListUpdate & game.PartyListUpdate.$Shape} PartyListUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PartyListUpdate & game.PartyListUpdate.$Shape;

        /**
         * Decodes a PartyListUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.PartyListUpdate & game.PartyListUpdate.$Shape} PartyListUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PartyListUpdate & game.PartyListUpdate.$Shape;

        /**
         * Verifies a PartyListUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PartyListUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PartyListUpdate
         */
        static fromObject(object: { [k: string]: any }): game.PartyListUpdate;

        /**
         * Creates a plain object from a PartyListUpdate message. Also converts values to other types if specified.
         * @param message PartyListUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.PartyListUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PartyListUpdate to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PartyListUpdate
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PartyListUpdate {

        /** Properties of a PartyListUpdate. */
        interface $Properties {

            /** PartyListUpdate parties */
            parties?: (game.PartyInfo.$Properties[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PartyListUpdate. */
        type $Shape = game.PartyListUpdate.$Properties;
    }

    /**
     * Properties of a PartyDissolved.
     * @deprecated Use game.PartyDissolved.$Properties instead.
     */
    interface IPartyDissolved extends game.PartyDissolved.$Properties {
    }

    /** Represents a PartyDissolved. */
    class PartyDissolved {

        /**
         * Constructs a new PartyDissolved.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.PartyDissolved.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PartyDissolved partyId. */
        partyId: string;

        /** PartyDissolved reason. */
        reason: string;

        /**
         * Creates a new PartyDissolved instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PartyDissolved instance
         */
        static create(properties: game.PartyDissolved.$Shape): game.PartyDissolved & game.PartyDissolved.$Shape;
        static create(properties?: game.PartyDissolved.$Properties): game.PartyDissolved;

        /**
         * Encodes the specified PartyDissolved message. Does not implicitly {@link game.PartyDissolved.verify|verify} messages.
         * @param message PartyDissolved message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.PartyDissolved.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PartyDissolved message, length delimited. Does not implicitly {@link game.PartyDissolved.verify|verify} messages.
         * @param message PartyDissolved message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.PartyDissolved.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PartyDissolved message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.PartyDissolved & game.PartyDissolved.$Shape} PartyDissolved
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PartyDissolved & game.PartyDissolved.$Shape;

        /**
         * Decodes a PartyDissolved message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.PartyDissolved & game.PartyDissolved.$Shape} PartyDissolved
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PartyDissolved & game.PartyDissolved.$Shape;

        /**
         * Verifies a PartyDissolved message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PartyDissolved message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PartyDissolved
         */
        static fromObject(object: { [k: string]: any }): game.PartyDissolved;

        /**
         * Creates a plain object from a PartyDissolved message. Also converts values to other types if specified.
         * @param message PartyDissolved
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.PartyDissolved, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PartyDissolved to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PartyDissolved
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PartyDissolved {

        /** Properties of a PartyDissolved. */
        interface $Properties {

            /** PartyDissolved partyId */
            partyId?: (string|null);

            /** PartyDissolved reason */
            reason?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PartyDissolved. */
        type $Shape = game.PartyDissolved.$Properties;
    }

    /**
     * Properties of a PartyErrorResponse.
     * @deprecated Use game.PartyErrorResponse.$Properties instead.
     */
    interface IPartyErrorResponse extends game.PartyErrorResponse.$Properties {
    }

    /** Represents a PartyErrorResponse. */
    class PartyErrorResponse {

        /**
         * Constructs a new PartyErrorResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.PartyErrorResponse.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PartyErrorResponse code. */
        code: string;

        /** PartyErrorResponse message. */
        message: string;

        /**
         * Creates a new PartyErrorResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PartyErrorResponse instance
         */
        static create(properties: game.PartyErrorResponse.$Shape): game.PartyErrorResponse & game.PartyErrorResponse.$Shape;
        static create(properties?: game.PartyErrorResponse.$Properties): game.PartyErrorResponse;

        /**
         * Encodes the specified PartyErrorResponse message. Does not implicitly {@link game.PartyErrorResponse.verify|verify} messages.
         * @param message PartyErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.PartyErrorResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PartyErrorResponse message, length delimited. Does not implicitly {@link game.PartyErrorResponse.verify|verify} messages.
         * @param message PartyErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.PartyErrorResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PartyErrorResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.PartyErrorResponse & game.PartyErrorResponse.$Shape} PartyErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PartyErrorResponse & game.PartyErrorResponse.$Shape;

        /**
         * Decodes a PartyErrorResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.PartyErrorResponse & game.PartyErrorResponse.$Shape} PartyErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PartyErrorResponse & game.PartyErrorResponse.$Shape;

        /**
         * Verifies a PartyErrorResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PartyErrorResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PartyErrorResponse
         */
        static fromObject(object: { [k: string]: any }): game.PartyErrorResponse;

        /**
         * Creates a plain object from a PartyErrorResponse message. Also converts values to other types if specified.
         * @param message PartyErrorResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.PartyErrorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PartyErrorResponse to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PartyErrorResponse
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PartyErrorResponse {

        /** Properties of a PartyErrorResponse. */
        interface $Properties {

            /** PartyErrorResponse code */
            code?: (string|null);

            /** PartyErrorResponse message */
            message?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PartyErrorResponse. */
        type $Shape = game.PartyErrorResponse.$Properties;
    }
}
