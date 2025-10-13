import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";
import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

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

const classes = {
    kcAlertClass: "alert",
    kcButtonBlockClass: "w-100",
    kcButtonClass: "btn",
    kcButtonLargeClass: "btn-lg",
    kcButtonPrimaryClass: "btn-primary",
    kcFormCardClass: "onit-form",
    kcFormGroupClass: "onit-form-group",
    kcFormHeaderClass: "onit-form-header",
    kcFormPasswordVisibilityButtonClass: "btn btn-visibility-toggle py-0",
    kcFormSettingClass: "onit-form-settings",
    kcFormSocialAccountListButtonClass: "btn btn-outline-secondary w-100", //hover -> main.css
    kcInfoAreaWrapperClass: "onit-info-area-wrapper",
    kcInputClass: "form-control",
    kcInputErrorMessageClass: "error-message",
    kcInputGroup: "input-group",
    kcLabelClass: "form-label",
    kcLoginClass: "onit-panel",
    kcSignUpClass: "onit-sign-up",
} satisfies { [key in ClassKey]?: string };
