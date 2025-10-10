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
    kcLoginClass: "onit-panel",
    kcFormCardClass: "onit-form",
    kcFormHeaderClass: "onit-form-header",
    kcFormGroupClass: "onit-form-group",
    kcFormSettingClass: "onit-form-settings",
    kcSignUpClass: "onit-sign-up",
    kcInfoAreaWrapperClass: "onit-info-area-wrapper",
    kcLabelClass: "form-label",
    kcInputClass: "form-control",
    kcInputGroup: "input-group",
    kcInputErrorMessageClass: "error-message",
    kcFormPasswordVisibilityButtonClass: "btn btn-visibility-toggle py-0",
    kcButtonClass: "btn",
    kcButtonPrimaryClass: "btn-primary",
    kcButtonBlockClass: "w-100",
    kcButtonLargeClass: "btn-lg",
    kcFormSocialAccountListButtonClass: "btn btn-outline-secondary w-100", //hover -> main.css
    // kcInputErrorMessageClass: "text-danger", //should be "invalid-feedback" + the input should have "is-invalid" and aria-invalid=true
} satisfies { [key in ClassKey]?: string };
