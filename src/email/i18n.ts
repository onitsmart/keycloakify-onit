import { GetMessages } from "keycloakify-emails";
import { _logos, _messagesShared } from "./translations/shared";
import { _messagesOnit } from "./translations/onit";
import { _messagesOnitSupport } from "./translations/onit-support";
import { _messagesOnitOperations } from "./translations/onit-operations";

export const formatMessage = (
    template: string,
    ...args: Array<string | number | undefined>
) => {
    return template.replace(/\{(\d+)\}/g, (_match, indexAsString: string) => {
        const value = args[Number(indexAsString)];
        return value === undefined ? `{${indexAsString}}` : String(value);
    });
};

export const getMessages: GetMessages = (props) => {
    var messages: Record<string, string> = {};

    messages["logo"] = _logos[props.themeName] || _logos["onit"];
    
    if (props.locale === "it") {
        Object.entries(_messagesShared["it"]).forEach(([key, value]) => {
            messages[key] = value;
        });

        switch (props.themeName) {
            case "onit":
                Object.entries(_messagesOnit["it"]).forEach(([key, value]) => {
                    messages[key] = value;
                });
                break;
            case "onit-support":
                Object.entries(_messagesOnitSupport["it"]).forEach(([key, value]) => {
                    messages[key] = value;
                });
                break;
            case "onit-operations":
                Object.entries(_messagesOnitOperations["it"]).forEach(([key, value]) => {
                    messages[key] = value;
                });
                break;      
        }
    } 
    else {
        // default to english
        Object.entries(_messagesShared["en"]).forEach(([key, value]) => {
            messages[key] = value;
        });

        switch (props.themeName) {
            case "onit":
                Object.entries(_messagesOnit["en"]).forEach(([key, value]) => {
                    messages[key] = value;
                });
                break;
            case "onit-support":
                Object.entries(_messagesOnitSupport["en"]).forEach(([key, value]) => {
                    messages[key] = value;
                });
                break;
            case "onit-operations":
                Object.entries(_messagesOnitOperations["en"]).forEach(([key, value]) => {
                    messages[key] = value;
                });
                break;      
        }
    }

    return messages;
}