import { GetSubject, GetTemplate, GetTemplateProps  } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import * as Fm from "keycloakify-emails/jsx-email";
import { render, Raw, Container } from "jsx-email";
import { EmailLayout } from "../layout";
import { formatMessage, getMessages } from "../i18n";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "it",
  themeName: "onit",
};

export const templateName = "Email Verification";

const { exp, v } = createVariablesHelper("email-verification.ftl");

export const Template = ({ locale, themeName } : TemplateProps) => {
  const messages = getMessages({ locale, themeName });
  return (
    <EmailLayout locale={locale} emailSubject={messages["emailVerificationSubject"]} themeName={themeName}>
      <Container>
        <Fm.If condition={`${v("user.firstName")}??`}>
          <Raw content={formatMessage(
            messages["emailVerificationWithNameBodyHtml"],
            exp("user.firstName"),
            exp("user.email"),
            exp("link"),
            exp("linkExpirationFormatter(linkExpiration)")
          )} />
        </Fm.If>
        <Fm.Else>
          <Raw content={formatMessage(
            messages["emailVerificationBodyHtml"],
            exp("user.email"),
            exp("link"),
            exp("linkExpirationFormatter(linkExpiration)")
          )} />
        </Fm.Else>
      </Container>
    </EmailLayout>
  );
};

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (props) => {
  const messages = getMessages({ locale: props.locale, themeName: props.themeName });
  return messages["emailVerificationSubject"];
};