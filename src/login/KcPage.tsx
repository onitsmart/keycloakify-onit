import "bootstrap/dist/css/bootstrap.min.css";
import "./css/onit-theme.css";
import "./css/onit-support-theme.css";
import "./css/main.css";
import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    var realmDependentBodyClass: string;

    switch (kcContext.themeName) {
        case "onit-support":
            realmDependentBodyClass = "onit-support-theme";
            break;
        
        case "onit-operations":
        case "onit":    
        default:
            realmDependentBodyClass = "onit-theme";
            break;
    }

    const classes = {
        kcAlertClass: "alert",
        kcBodyClass: "onit-body" + " "  + realmDependentBodyClass,
        kcButtonBlockClass: "btn-block",
        kcButtonClass: "btn",
        kcButtonLargeClass: "btn-lg",
        kcButtonPrimaryClass: "btn-primary",
        kcCommonLogoIdP: "",
        kcContentWrapperClass: "onit-content-wrapper",
        kcFormButtonsClass: "onit-form-buttons",
        kcFormCardClass: "onit-form-card",
        kcFormClass: "onit-form",
        kcFormGroupClass: "onit-form-group",
        kcFormHeaderClass: "onit-form-header",
        kcFormOptionsClass: "onit-form-options",
        kcFormOptionsWrapperClass: "onit-form-options-wrapper",
        kcFormPasswordVisibilityButtonClass: "btn btn-visibility-toggle py-0",
        kcFormSettingClass: "onit-form-settings",
        kcFormSocialAccountListButtonClass: "btn btn-outline-primary btn-social-account w-100", //hover -> main.css
        kcFormSocialAccountListClass: "d-flex flex-column gap-1 gap-lg-2 ps-0",
        kcFormSocialAccountNameClass: "",
        kcFormSocialAccountSectionClass: "onit-social-account-section text-lg-start",
        kcHeaderClass: "onit-header-class w-100",
        kcHeaderWrapperClass: "p-0",
        kcInfoAreaWrapperClass: "onit-info-area-wrapper",
        kcInputClass: "form-control",
        kcInputErrorMessageClass: "error-message",
        kcInputWrapperClass: "onit-input-wrapper",
        kcInputGroup: "input-group",
        kcLabelClass: "form-label",
        kcLabelWrapperClass: "onit-label-wrapper",
        kcLocaleDropDownClass: "onit-locale-dropdown dropdown",
        kcLocaleItemClass: "dropdown-item",
        kcLocaleListClass: "dropdown-menu dropdown-menu-end",
        kcLocaleListItemClass: "",
        kcLocaleMainClass: "onit-locale",
        kcLocaleWrapperClass: "",
        kcLoginClass: "onit-panel",
        kcSignUpClass: "onit-sign-up",
    } satisfies { [key in ClassKey]?: string };

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}


