import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Template from "keycloakify/login/Template";

interface Props {
    kcContext: Extract<KcContext, { pageId: "login.ftl" }>;
    i18n: I18n;
    classes?: Record<string, string>;
}

export default function LoginPage({ kcContext, i18n }: Props) {
    const { url } = kcContext;
    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false} // disabilita i CSS default di Keycloak
            headerNode={<h1 className="login-header">Ciao bello come stai</h1>}
        >
            <div className="login-container">
                <form className="login-form" action={url.loginAction} method="post">
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            autoFocus
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="form-group form-actions">
                        <button type="submit" className="btn-login">
                            {msg("doLogIn")}
                        </button>
                    </div>
                </form>

                <div className="login-links">
                    <a href={url.loginResetCredentialsUrl}>
                        {msg("doForgotPassword")}
                    </a>
                    <a href={url.registrationUrl}>{msg("doRegister")}</a>
                </div>
            </div>
        </Template>
    );
}
