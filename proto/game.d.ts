import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace game. */
export namespace game {

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

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a JoinRequest. */
        type $Shape = game.JoinRequest.$Properties;
    }

    /**
     * Properties of a JoinResponse.
     * @deprecated Use game.JoinResponse.$Properties instead.
     */
    interface IJoinResponse extends game.JoinResponse.$Properties {
    }

    /** Represents a JoinResponse. */
    class JoinResponse {

        /**
         * Constructs a new JoinResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.JoinResponse.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** JoinResponse sessionId. */
        sessionId: string;

        /** JoinResponse accepted. */
        accepted: boolean;

        /** JoinResponse error. */
        error: string;

        /**
         * Creates a new JoinResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinResponse instance
         */
        static create(properties: game.JoinResponse.$Shape): game.JoinResponse & game.JoinResponse.$Shape;
        static create(properties?: game.JoinResponse.$Properties): game.JoinResponse;

        /**
         * Encodes the specified JoinResponse message. Does not implicitly {@link game.JoinResponse.verify|verify} messages.
         * @param message JoinResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.JoinResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinResponse message, length delimited. Does not implicitly {@link game.JoinResponse.verify|verify} messages.
         * @param message JoinResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.JoinResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.JoinResponse & game.JoinResponse.$Shape} JoinResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.JoinResponse & game.JoinResponse.$Shape;

        /**
         * Decodes a JoinResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.JoinResponse & game.JoinResponse.$Shape} JoinResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.JoinResponse & game.JoinResponse.$Shape;

        /**
         * Verifies a JoinResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinResponse
         */
        static fromObject(object: { [k: string]: any }): game.JoinResponse;

        /**
         * Creates a plain object from a JoinResponse message. Also converts values to other types if specified.
         * @param message JoinResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.JoinResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinResponse to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for JoinResponse
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace JoinResponse {

        /** Properties of a JoinResponse. */
        interface $Properties {

            /** JoinResponse sessionId */
            sessionId?: (string|null);

            /** JoinResponse accepted */
            accepted?: (boolean|null);

            /** JoinResponse error */
            error?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a JoinResponse. */
        type $Shape = game.JoinResponse.$Properties;
    }

    /**
     * Properties of a LeaveNotification.
     * @deprecated Use game.LeaveNotification.$Properties instead.
     */
    interface ILeaveNotification extends game.LeaveNotification.$Properties {
    }

    /** Represents a LeaveNotification. */
    class LeaveNotification {

        /**
         * Constructs a new LeaveNotification.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.LeaveNotification.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** LeaveNotification reason. */
        reason: string;

        /**
         * Creates a new LeaveNotification instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LeaveNotification instance
         */
        static create(properties: game.LeaveNotification.$Shape): game.LeaveNotification & game.LeaveNotification.$Shape;
        static create(properties?: game.LeaveNotification.$Properties): game.LeaveNotification;

        /**
         * Encodes the specified LeaveNotification message. Does not implicitly {@link game.LeaveNotification.verify|verify} messages.
         * @param message LeaveNotification message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.LeaveNotification.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LeaveNotification message, length delimited. Does not implicitly {@link game.LeaveNotification.verify|verify} messages.
         * @param message LeaveNotification message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.LeaveNotification.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LeaveNotification message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.LeaveNotification & game.LeaveNotification.$Shape} LeaveNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.LeaveNotification & game.LeaveNotification.$Shape;

        /**
         * Decodes a LeaveNotification message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.LeaveNotification & game.LeaveNotification.$Shape} LeaveNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.LeaveNotification & game.LeaveNotification.$Shape;

        /**
         * Verifies a LeaveNotification message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LeaveNotification message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LeaveNotification
         */
        static fromObject(object: { [k: string]: any }): game.LeaveNotification;

        /**
         * Creates a plain object from a LeaveNotification message. Also converts values to other types if specified.
         * @param message LeaveNotification
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.LeaveNotification, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LeaveNotification to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for LeaveNotification
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace LeaveNotification {

        /** Properties of a LeaveNotification. */
        interface $Properties {

            /** LeaveNotification reason */
            reason?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a LeaveNotification. */
        type $Shape = game.LeaveNotification.$Properties;
    }

    /**
     * Properties of an InventoryAction.
     * @deprecated Use game.InventoryAction.$Properties instead.
     */
    interface IInventoryAction extends game.InventoryAction.$Properties {
    }

    /** Represents an InventoryAction. */
    class InventoryAction {

        /**
         * Constructs a new InventoryAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.InventoryAction.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** InventoryAction actionType. */
        actionType: string;

        /** InventoryAction itemId. */
        itemId: string;

        /** InventoryAction templateId. */
        templateId: string;

        /** InventoryAction quantity. */
        quantity: number;

        /** InventoryAction fromInventory. */
        fromInventory: string;

        /** InventoryAction toInventory. */
        toInventory: string;

        /** InventoryAction slot. */
        slot: string;

        /**
         * Creates a new InventoryAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InventoryAction instance
         */
        static create(properties: game.InventoryAction.$Shape): game.InventoryAction & game.InventoryAction.$Shape;
        static create(properties?: game.InventoryAction.$Properties): game.InventoryAction;

        /**
         * Encodes the specified InventoryAction message. Does not implicitly {@link game.InventoryAction.verify|verify} messages.
         * @param message InventoryAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.InventoryAction.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InventoryAction message, length delimited. Does not implicitly {@link game.InventoryAction.verify|verify} messages.
         * @param message InventoryAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.InventoryAction.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InventoryAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.InventoryAction & game.InventoryAction.$Shape} InventoryAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.InventoryAction & game.InventoryAction.$Shape;

        /**
         * Decodes an InventoryAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.InventoryAction & game.InventoryAction.$Shape} InventoryAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.InventoryAction & game.InventoryAction.$Shape;

        /**
         * Verifies an InventoryAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InventoryAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InventoryAction
         */
        static fromObject(object: { [k: string]: any }): game.InventoryAction;

        /**
         * Creates a plain object from an InventoryAction message. Also converts values to other types if specified.
         * @param message InventoryAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.InventoryAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InventoryAction to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for InventoryAction
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace InventoryAction {

        /** Properties of an InventoryAction. */
        interface $Properties {

            /** InventoryAction actionType */
            actionType?: (string|null);

            /** InventoryAction itemId */
            itemId?: (string|null);

            /** InventoryAction templateId */
            templateId?: (string|null);

            /** InventoryAction quantity */
            quantity?: (number|null);

            /** InventoryAction fromInventory */
            fromInventory?: (string|null);

            /** InventoryAction toInventory */
            toInventory?: (string|null);

            /** InventoryAction slot */
            slot?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an InventoryAction. */
        type $Shape = game.InventoryAction.$Properties;
    }

    /**
     * Properties of an InventorySnapshot.
     * @deprecated Use game.InventorySnapshot.$Properties instead.
     */
    interface IInventorySnapshot extends game.InventorySnapshot.$Properties {
    }

    /** Represents an InventorySnapshot. */
    class InventorySnapshot {

        /**
         * Constructs a new InventorySnapshot.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.InventorySnapshot.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** InventorySnapshot inventoryId. */
        inventoryId: string;

        /** InventorySnapshot items. */
        items: game.Item.$Properties[];

        /** InventorySnapshot maxSlots. */
        maxSlots: number;

        /** InventorySnapshot maxWeight. */
        maxWeight: number;

        /** InventorySnapshot currentWeight. */
        currentWeight: number;

        /** InventorySnapshot equipment. */
        equipment: { [k: string]: game.Item.$Properties };

        /**
         * Creates a new InventorySnapshot instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InventorySnapshot instance
         */
        static create(properties: game.InventorySnapshot.$Shape): game.InventorySnapshot & game.InventorySnapshot.$Shape;
        static create(properties?: game.InventorySnapshot.$Properties): game.InventorySnapshot;

        /**
         * Encodes the specified InventorySnapshot message. Does not implicitly {@link game.InventorySnapshot.verify|verify} messages.
         * @param message InventorySnapshot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.InventorySnapshot.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InventorySnapshot message, length delimited. Does not implicitly {@link game.InventorySnapshot.verify|verify} messages.
         * @param message InventorySnapshot message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.InventorySnapshot.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InventorySnapshot message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.InventorySnapshot & game.InventorySnapshot.$Shape} InventorySnapshot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.InventorySnapshot & game.InventorySnapshot.$Shape;

        /**
         * Decodes an InventorySnapshot message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.InventorySnapshot & game.InventorySnapshot.$Shape} InventorySnapshot
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.InventorySnapshot & game.InventorySnapshot.$Shape;

        /**
         * Verifies an InventorySnapshot message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InventorySnapshot message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InventorySnapshot
         */
        static fromObject(object: { [k: string]: any }): game.InventorySnapshot;

        /**
         * Creates a plain object from an InventorySnapshot message. Also converts values to other types if specified.
         * @param message InventorySnapshot
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.InventorySnapshot, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InventorySnapshot to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for InventorySnapshot
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace InventorySnapshot {

        /** Properties of an InventorySnapshot. */
        interface $Properties {

            /** InventorySnapshot inventoryId */
            inventoryId?: (string|null);

            /** InventorySnapshot items */
            items?: (game.Item.$Properties[]|null);

            /** InventorySnapshot maxSlots */
            maxSlots?: (number|null);

            /** InventorySnapshot maxWeight */
            maxWeight?: (number|null);

            /** InventorySnapshot currentWeight */
            currentWeight?: (number|null);

            /** InventorySnapshot equipment */
            equipment?: ({ [k: string]: game.Item.$Properties }|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an InventorySnapshot. */
        type $Shape = game.InventorySnapshot.$Properties;
    }

    /**
     * Properties of an InventoryDiff.
     * @deprecated Use game.InventoryDiff.$Properties instead.
     */
    interface IInventoryDiff extends game.InventoryDiff.$Properties {
    }

    /** Represents an InventoryDiff. */
    class InventoryDiff {

        /**
         * Constructs a new InventoryDiff.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.InventoryDiff.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** InventoryDiff inventoryId. */
        inventoryId: string;

        /** InventoryDiff action. */
        action: string;

        /** InventoryDiff item. */
        item?: (game.Item.$Properties|null);

        /**
         * Creates a new InventoryDiff instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InventoryDiff instance
         */
        static create(properties: game.InventoryDiff.$Shape): game.InventoryDiff & game.InventoryDiff.$Shape;
        static create(properties?: game.InventoryDiff.$Properties): game.InventoryDiff;

        /**
         * Encodes the specified InventoryDiff message. Does not implicitly {@link game.InventoryDiff.verify|verify} messages.
         * @param message InventoryDiff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: game.InventoryDiff.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InventoryDiff message, length delimited. Does not implicitly {@link game.InventoryDiff.verify|verify} messages.
         * @param message InventoryDiff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: game.InventoryDiff.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InventoryDiff message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {game.InventoryDiff & game.InventoryDiff.$Shape} InventoryDiff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.InventoryDiff & game.InventoryDiff.$Shape;

        /**
         * Decodes an InventoryDiff message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {game.InventoryDiff & game.InventoryDiff.$Shape} InventoryDiff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.InventoryDiff & game.InventoryDiff.$Shape;

        /**
         * Verifies an InventoryDiff message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InventoryDiff message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InventoryDiff
         */
        static fromObject(object: { [k: string]: any }): game.InventoryDiff;

        /**
         * Creates a plain object from an InventoryDiff message. Also converts values to other types if specified.
         * @param message InventoryDiff
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: game.InventoryDiff, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InventoryDiff to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for InventoryDiff
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace InventoryDiff {

        /** Properties of an InventoryDiff. */
        interface $Properties {

            /** InventoryDiff inventoryId */
            inventoryId?: (string|null);

            /** InventoryDiff action */
            action?: (string|null);

            /** InventoryDiff item */
            item?: (game.Item.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an InventoryDiff. */
        type $Shape = game.InventoryDiff.$Properties;
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
        id: string;

        /** Item templateId. */
        templateId: string;

        /** Item name. */
        name: string;

        /** Item type. */
        type: string;

        /** Item icon. */
        icon: string;

        /** Item description. */
        description: string;

        /** Item quantity. */
        quantity: number;

        /** Item weight. */
        weight: number;

        /** Item stats. */
        stats: { [k: string]: number };

        /** Item consumable. */
        consumable: { [k: string]: number };

        /** Item damageType. */
        damageType: string;

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
            id?: (string|null);

            /** Item templateId */
            templateId?: (string|null);

            /** Item name */
            name?: (string|null);

            /** Item type */
            type?: (string|null);

            /** Item icon */
            icon?: (string|null);

            /** Item description */
            description?: (string|null);

            /** Item quantity */
            quantity?: (number|null);

            /** Item weight */
            weight?: (number|null);

            /** Item stats */
            stats?: ({ [k: string]: number }|null);

            /** Item consumable */
            consumable?: ({ [k: string]: number }|null);

            /** Item damageType */
            damageType?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an Item. */
        type $Shape = game.Item.$Properties;
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

        /** ErrorResponse originalAction. */
        originalAction: string;

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

            /** ErrorResponse originalAction */
            originalAction?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an ErrorResponse. */
        type $Shape = game.ErrorResponse.$Properties;
    }

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

        /** GameMessage data. */
        data: Uint8Array;

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

            /** GameMessage data */
            data?: (Uint8Array|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a GameMessage. */
        type $Shape = game.GameMessage.$Properties;
    }
}
