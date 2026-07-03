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

export const templateName = "Event Remove TOTP";

const { exp } = createVariablesHelper("event-remove_totp.ftl");

export const Template = ({ locale, themeName } : TemplateProps) => {
  const messages = getMessages({ locale, themeName });
  return (
    <EmailLayout locale={locale} emailSubject={messages["eventRemoveTotpSubject"]} themeName={themeName}>
      <Container>
        <Raw content={formatMessage(
            messages["eventRemoveTotpBodyHtml"],
            exp("event.date"),
            exp("event.ipAddress")
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
  return messages["eventRemoveTotpSubject"];
};