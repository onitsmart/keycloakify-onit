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

export const templateName = "Org Invite";

const { exp, v } = createVariablesHelper("org-invite.ftl");

export const Template = ({ locale, themeName } : TemplateProps) => {
  const messages = getMessages({ locale, themeName });
  return (
    <EmailLayout locale={locale} emailSubject={messages["orgInviteSubject"]} themeName={themeName}>
      <Container>
        <Fm.If condition={`${v("firstName")}?? && ${v("lastName")}??`}>
            <Raw content={formatMessage(
                messages["orgInviteBodyPersonalizedHtml"],
                exp("firstName"),
                exp("lastName"),
                exp("organization.name"),
                exp("link"),
                exp("linkExpirationFormatter(linkExpiration)")
            )} />
        </Fm.If>
        <Fm.Else>
            <Raw content={formatMessage(
                messages["orgInviteBodyHtml"],
                exp("organization.name"),
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
  return formatMessage(
    messages["orgInviteSubject"], 
    exp("organization.name")
  );
};
