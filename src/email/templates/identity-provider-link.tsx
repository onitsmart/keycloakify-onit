import { GetSubject, GetTemplate, GetTemplateProps  } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { render, Raw, Container } from "jsx-email";
import { EmailLayout } from "../layout";
import { formatMessage, getMessages } from "../i18n";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "it",
  themeName: "onit",
};

export const templateName = "Identity Provider Link";

const { exp } = createVariablesHelper("identity-provider-link.ftl");

export const Template = ({ locale, themeName } : TemplateProps) => {
  const messages = getMessages({ locale, themeName });
  return (
    <EmailLayout locale={locale} emailSubject={messages["identityProviderLinkSubject"]} themeName={themeName}>
      <Container>
        <Raw content={formatMessage(
            messages["identityProviderLinkBodyHtml"],
            exp("identityProviderDisplayName"),
            exp("realmName"),
            exp("identityProviderContext.username"),
            exp("link"),
            exp("identityProviderDisplayName"),
            exp("linkExpirationFormatter(linkExpiration)")
        )} />
      </Container>
    </EmailLayout>
  );
};

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (props) => {
  const messages = getMessages({ locale: props.locale, themeName: props.themeName });
  return messages["identityProviderLinkSubject"];
};